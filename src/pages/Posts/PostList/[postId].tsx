import { useParams, history } from 'umi';
import { useState, useEffect } from 'react';
import { getCommentsByPostId, voteComment } from '@/services/Comments/index';
import VoteButton from '../components/VoteButton';
import CommentSection from '../components/Comments';
import type { Post } from '@/services/Posts/typings.d';
import type { Comment } from '@/services/Comments/typings.d';
import { getPostById, votePost, deletePost } from '@/services/Posts/index';
import { getCurrentUser, getUserById } from '@/services/Users'; // Sửa import
import { UserRole } from '@/services/Users/typings.d';
import { Button, message, Popconfirm } from 'antd';
import type { User } from '@/services/Users/typings.d';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Sửa thành state

  useEffect(() => {
    // Load current user
    setCurrentUser(getCurrentUser());
    
    // Load post data
    if (postId) {
      setPost(getPostById(postId));
      setComments(getCommentsByPostId(postId));
    }
  }, [postId]);

  const handleVote = (val: 1 | -1) => {
    if (post && currentUser) {
      const updatedPost = votePost(post.id, currentUser.id, val);
      if (updatedPost) {
        setPost(updatedPost);
      }
    }
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments(prev => [...prev, newComment]);
  };

  const handleVoteComment = (commentId: string, vote: 1 | -1) => {
    if (!currentUser) return;
    const updatedComment = voteComment(commentId, currentUser.id, vote);
    if (updatedComment) {
      setComments(prev => 
        prev.map(c => c.id === commentId ? updatedComment : c)
      );
    }
  };

  // Xử lý chuyển hướng đến trang chỉnh sửa
  const handleEditPost = () => {
    history.push(`/postposts?postId=${postId}`);
  };

  const canEdit = () => {
    if (!post || !currentUser) return false;
    return currentUser.role === UserRole.Admin || post.authorId === currentUser.id;
  };

  const canDelete = () => {
    if (!post || !currentUser) return false;

    if (currentUser.role === UserRole.Admin) return true;

    // Cho phép Teacher xóa bài của Student hoặc của chính mình
    if (currentUser.role === UserRole.Teacher) {
      const author = getUserById(post.authorId);
      return author && (author.id === currentUser.id || author.role === UserRole.Student);
    }

    // Student chỉ xóa được bài của mình
    return post.authorId === currentUser.id;
  };

    // Sửa hàm xóa bài viết để kiểm tra quyền
  const handleDeletePost = () => {
    if (!postId || !currentUser) return;
    
    // Kiểm tra quyền server-side
    if (!canDelete()) {
      message.error('Bạn không có quyền xóa bài viết này');
      return;
    }
    
    deletePost(postId);
    message.success('Bài viết đã được xóa');
    history.push('/');
  };


  if (!post) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{post.title}</h2>
        <div>
          {canEdit() && (
            <Button 
              type="primary" 
              onClick={handleEditPost}
              style={{ marginRight: 8 }}
            >
              Chỉnh sửa
            </Button>
          )}
          
          {canDelete() && (
            <Popconfirm
              title="Bạn có chắc chắn muốn xóa bài viết này?"
              onConfirm={handleDeletePost}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button type="primary" danger>
                Xóa bài viết
              </Button>
            </Popconfirm>
          )}
        </div>
      </div>

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
      {currentUser && (
        <VoteButton item={post} userId={currentUser.id} onVote={handleVote} />
      )}
              
      <CommentSection 
          postId={postId!}
          comments={comments}
          onCommentAdded={handleCommentAdded}
          onVote={handleVoteComment}
      />
    </div>
  );
};