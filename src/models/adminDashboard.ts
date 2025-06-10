// models/adminDashboard.ts
import { useState, useEffect } from 'react';
import {  getVoteCount } from '@/services/Admin/index';
import {getPosts} from '@/services/Posts/index';
import { getUsers } from '@/services/Users';
import { getCommentCount, getComments } from '@/services/Comments';
import {getTags} from '@/services/Tags/index';
import type { Post } from '@/services/Posts/typings.d';
import type {User} from '@/services/Users/typings.d';
import type { Comment } from '@/services/Comments/typings.d';
import type {Tags} from '@/services/Tags/typings.d'

export interface TagStat {
  tagId: string;
  postCount: number;
  commentCount: number;
}

export interface MonthlyPostStat {
  month: string;
  count: number;
}

export default () => {
  const [userCounts, setUserCounts] = useState({ students: 0, teachers: 0 });
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [postByMonth, setPostByMonth] = useState<MonthlyPostStat[]>([]);
  const [tagStats, setTagStats] = useState<TagStat[]>([]);
  const [topPosts, setTopPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const loadData = () => {
  // 1. Users
  const users = getUsers();
  const students = users.filter(u => u.role === 'student').length;
  const teachers = users.filter(u => u.role === 'teacher').length;
  setUserCounts({ students, teachers });

  // 2. Posts & Comments
  const posts = getPosts();
  const comments = getComments();
  setTotalPosts(posts.length);
  setTotalComments(comments.length);

  // 3. Monthly post stats
  const monthlyStats: Record<string, number> = {};
  posts.forEach(post => {
    const month = new Date(post.createdAt).toISOString().slice(0, 7); // "YYYY-MM"
    monthlyStats[month] = (monthlyStats[month] || 0) + 1;
  });

  const monthlyData: MonthlyPostStat[] = Object.entries(monthlyStats)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month));

  setPostByMonth(monthlyData);

  // 4. Tags & tag stats
  const allTags = getTags();
  setTags(allTags);

  const tagStatsMap: Record<string, TagStat> = {};
  allTags.forEach(tag => {
    tagStatsMap[tag.id] = {
      tagId: tag.id,
      postCount: 0,
      commentCount: 0
    };
  });

  posts.forEach(post => {
    post.tagIds.forEach(tagId => {
      if (tagStatsMap[tagId]) {
        tagStatsMap[tagId].postCount += 1;
      }
    });
  });

  comments.forEach(comment => {
    const post = posts.find(p => p.id === comment.postId);
    if (post) {
      post.tagIds.forEach(tagId => {
        if (tagStatsMap[tagId]) {
          tagStatsMap[tagId].commentCount += 1;
        }
      });
    }
  });

  setTagStats(Object.values(tagStatsMap));

  // 5. Top posts (by voteCount, include comments)
  const postWithMeta = posts.map(post => ({
    ...post,
    voteCount: getVoteCount(post.id),
    comments: comments.filter(c => c.postId === post.id)
  }));

  const top5 = postWithMeta
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, 5);

  setTopPosts(top5);
};


  useEffect(() => {
    loadData();
  }, []);

  return {
    userCounts,
    totalPosts,
    totalComments,
    postByMonth,
    tagStats,
    topPosts,
    tags,
    loadData
  };
};