import React, { useState } from 'react';
import { Input, Button, Comment as AntComment, List } from 'antd';
import { getCurrentUserId, getUserById } from '@/services/AcademicForum/userService';
import VoteButton from './VoteButton';
import { Comment, CommentSectionProps } from '@/services/AcademicForum/typings';
import { v4 as uuidv4 } from 'uuid';

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>(() => {
    return JSON.parse(localStorage.getItem('comments') || '[]');
  });

  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');

  const currentUserId = getCurrentUserId();

  const handleAddComment = () => {
    const newComment: Comment = {
      id: uuidv4(),
      postId, 
      content: newContent,
      authorId: currentUserId,
      parentCommentId: replyTo || undefined,
      createdAt: new Date().toISOString(),
      votes: {},
    };
    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem('comments', JSON.stringify(updated));
    setNewContent('');
    setReplyTo(null);
  };

  const handleVote = (id: string, value: 1 | -1) => {
    const updated = comments.map(c => {
      if (c.id !== id) return c;
      const existingVote = Object.entries(c.votes || {}).find(
        ([userId]) => userId === currentUserId
      );

      let newVotes: { [userId: string]: 1 | -1 };

      if (existingVote) {
        newVotes = {
          ...c.votes,
          [currentUserId]: value, // cập nhật giá trị vote
        };
      } else {
        newVotes = {
          ...c.votes,
          [currentUserId]: value, // thêm vote mới
        };
      }
      return { ...c, votes: newVotes };
    });
    setComments(updated);
    localStorage.setItem('comments', JSON.stringify(updated));
  };

  const renderComment = (comment: Comment) => {
    const replies = comments.filter(c => c.parentCommentId === comment.id);
    const author = getUserById(comment.authorId)?.name || 'Unknown';

    return (
      <AntComment
        key={comment.id}
        author={<strong>{author}</strong>}
        content={<div dangerouslySetInnerHTML={{ __html: comment.content }} />}
        actions={[
          <VoteButton key="vote" item={comment} userId={currentUserId} onVote={v => handleVote(comment.id, v)} />,
          <span key="reply" onClick={() => setReplyTo(comment.id)} style={{ cursor: 'pointer', color: '#1890ff' }}>
            Reply
          </span>
        ]}
      >
        {replies.map(r => renderComment(r))}
      </AntComment>
    );
  };

  const rootComments = comments.filter(c => !c.parentCommentId);

  return (
    <div>
      <h3>Bình luận</h3>

      <List
        dataSource={rootComments}
        renderItem={item => renderComment(item)}
      />

      <div style={{ marginTop: 16 }}>
        <Input.TextArea
          rows={4}
          value={newContent}
          onChange={e => setNewContent(e.target.value)}
          placeholder={replyTo ? 'Trả lời bình luận...' : 'Viết bình luận mới...'}
        />
        <Button type="primary" onClick={handleAddComment} style={{ marginTop: 8 }}>
          {replyTo ? 'Gửi phản hồi' : 'Thêm bình luận'}
        </Button>
        {replyTo && (
          <Button onClick={() => setReplyTo(null)} style={{ marginLeft: 8 }}>
            Hủy
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
