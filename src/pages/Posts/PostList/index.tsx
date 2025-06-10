import { useState, useEffect } from 'react';
import { getTags } from '@/services/Tags/index';
import type { Tags } from '@/services/Tags/typings.d';
import type { Post} from '@/services/Posts/typings.d';
import { getPosts, votePost } from '@/services/Posts';
import PostItem from '../components/PostItem';
import { getCurrentUserId } from '@/services/Users';

export default function ForumList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  useEffect(() => {
    setPosts(getPosts());
    setTags(getTags());
  }, []);

  return (
    <div>
      <h2>Danh sách bài viết</h2>
      {posts.map(post => (
        <PostItem 
          key={post.id} 
          post={post} 
          userId={getCurrentUserId()}
          onVote={(vote: 1 | -1) => {
            const updatedPost = votePost(post.id, getCurrentUserId(), vote);
            if (updatedPost) {
              setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p));
            }
          }}
        />
      ))}
    </div>
  );
}

