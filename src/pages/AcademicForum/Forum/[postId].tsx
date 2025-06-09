import { useParams } from 'umi';
import { useState } from 'react';
import { addComment } from '@/services/AcademicForum/commentService';
import VoteButton from '../components/VoteButton';
import CommentSection from '../components/CommentTree';
import TinyEditor from '@/components/TinyEditor';
import { v4 as uuidv4 } from 'uuid';
import { Post, Comment } from '@/services/AcademicForum/typings';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post] = useState<Post | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const userId = 'user1';

  const handleVote = (val: 1 | -1) => {
  if (!post) return; // kiểm tra trước
};

  const handleComment = (html: string, parentId?: string) => {
    const newComment = {
      id: uuidv4(),
      postId,
      parentCommentId: parentId,
      authorId: userId,
      content: html,
      createdAt: new Date().toISOString(),
      votes: {}
    };
    addComment(newComment);
    setComments([...comments, newComment]);
  };

  if (!post) return null;

  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <VoteButton item={post} userId={userId} onVote={handleVote} />
      <h3>Bình luận</h3>
      <CommentSection comments={comments} userId={userId} onVote={(id, v) => {
        const comment = comments.find(c => c.id === id);
        if (comment && !comment.votes[userId]) {
          comment.votes[userId] = v;
          setComments([...comments]);
        }
      }}
      postId={postId} />
      <TinyEditor onSave={html => handleComment(html)} />
    </div>
  );
}
