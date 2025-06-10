import { useParams } from 'umi';
import { useState, useEffect } from 'react';
import { addComment, getCommentsByPostId, voteComment } from '@/services/Comments/index';
import VoteButton from '../components/VoteButton';
import CommentSection from '../components/Comments';
import { v4 as uuidv4 } from 'uuid';
import type { Post } from '@/services/Posts/typings.d';
import type { Comment } from '@/services/Comments/typings.d';
import { getPostById, votePost } from '@/services/Posts/index';
import { getCurrentUserId } from '@/services/Users';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const userId = getCurrentUserId();

  useEffect(() => {
    if (postId) {
      setPost(getPostById(postId));
      setComments(getCommentsByPostId(postId));
    }
  }, [postId]);

  const handleVote = (val: 1 | -1) => {
    if (post && userId) {
      const updatedPost = votePost(post.id, userId, val);
      if (updatedPost) {
        setPost(updatedPost);
      }
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleVoteComment = (commentId: string, vote: 1 | -1) => {
    const updatedComment = voteComment(commentId, userId, vote);
    if (updatedComment) {
      setComments(prev => 
        prev.map(c => c.id === commentId ? updatedComment : c)
      );
    }
  };

  const handleComment = (html: string) => {
    const newComment: Comment = {
      id: uuidv4(),
      postId: postId!,
      authorId: userId,
      content: html,
      createdAt: new Date().toISOString(),
      votes: {}
    };
    addComment(newComment);
    setComments(prev => [...prev, newComment]);
  };

  if (!post) return null;

  return (
    <div>
        <h2>{post.title}</h2>
        <div
        style={{
            backgroundColor: '#fefefe',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '24px',
            border: '1px solid #f0f0f0',
        }}
        >
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <VoteButton item={post} userId={userId} onVote={handleVote} />
                
        <CommentSection 
            postId={postId!}
            comments={comments}
            onCommentAdded={handleCommentAdded}
            onVote={handleVoteComment}
        />
    </div>
  );
};