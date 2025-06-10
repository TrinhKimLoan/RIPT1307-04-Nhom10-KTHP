// import React, { useState } from 'react';
// import { Button, Comment as AntComment, List } from 'antd';
// import { getCurrentUserId, getUserById } from '@/services/Users/index';
// import VoteButton from './VoteButton';
// import type { Comment, CommentSectionProps } from '@/services/Comments/typings.d';
// import { v4 as uuidv4 } from 'uuid';
// import { addComment } from '@/services/Comments/index';
// import TinyEditor from '@/components/TinyEditor';

// const CommentSection: React.FC<CommentSectionProps> = ({
//   postId,
//   comments,
//   onCommentAdded,
//   onVote
// }) => {
//   const [replyTo, setReplyTo] = useState<string | null>(null);
//   const [newContent, setNewContent] = useState('');

//   const currentUserId = getCurrentUserId();

//   const handleAddComment = () => {
//     if (!newContent.trim()) return;

//     const newComment: Comment = {
//       id: uuidv4(),
//       postId,
//       content: newContent,
//       authorId: currentUserId,
//       parentCommentId: replyTo || undefined,
//       createdAt: new Date().toISOString(),
//       votes: {},
//     };

//     addComment(newComment);
//     onCommentAdded(newComment);
//     setNewContent('');
//     setReplyTo(null);
//   };

//   const renderComment = (
//     comment: Comment,
//     depth: number = 0,
//     renderedIds = new Set<string>()
//   ): React.ReactNode => {
//     if (depth > 5 || renderedIds.has(comment.id)) return null;
//     renderedIds.add(comment.id);

//     const replies = comments.filter(c => c.parentCommentId === comment.id);
//     const author = getUserById(comment.authorId)?.fullName || 'Unknown';

//     return (
//       <AntComment
//         key={comment.id}
//         author={<strong>{author}</strong>}
//         content={<div dangerouslySetInnerHTML={{ __html: comment.content }} />}
//         actions={[
//           <VoteButton
//             key="vote"
//             item={comment}
//             userId={currentUserId}
//             onVote={v => onVote(comment.id, v)}
//           />,
//           <span
//             key="reply"
//             onClick={() => setReplyTo(comment.id)}
//             style={{ cursor: 'pointer', color: '#1890ff' }}
//           >
//             Reply
//           </span>
//         ]}
//       >
//         {replies.map(r => renderComment(r, depth + 1, new Set(renderedIds)))}
//       </AntComment>
//     );
//   };

//   const rootComments = comments.filter(c => !c.parentCommentId);

//   return (
//     <div>
//       <h3>Bình luận</h3>

//       <List
//         dataSource={rootComments}
//         renderItem={item => renderComment(item)}
//       />

//       <div style={{ marginTop: 24 }}>
//         <TinyEditor onChange={setNewContent} />
//         <div style={{ marginTop: 8 }}>
//           <Button type="primary" onClick={handleAddComment}>
//             {replyTo ? 'Gửi phản hồi' : 'Gửi bình luận'}
//           </Button>
//           {replyTo && (
//             <Button onClick={() => setReplyTo(null)} style={{ marginLeft: 8 }}>
//               Hủy
//             </Button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

import React, { useState } from 'react';
import { Button, Comment as AntComment, List } from 'antd';
import { useModel } from 'umi';
import { getUserById } from '@/services/Users';
import VoteButton from './VoteButton';
import type { Comment, CommentSectionProps } from '@/services/Comments/typings.d';
import { v4 as uuidv4 } from 'uuid';
import { addComment } from '@/services/Comments/index';
import TinyEditor from '@/components/TinyEditor';

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  onCommentAdded,
  onVote
}) => {
  const { currentUser } = useModel('currentUser'); // Hoặc 'user' nếu model bạn export tên đó
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [newContent, setNewContent] = useState('');

  const currentUserId = currentUser?.id || '';

  const handleAddComment = () => {
    if (!newContent.trim() || !currentUserId) return;

    const newComment: Comment = {
      id: uuidv4(),
      postId,
      content: newContent,
      authorId: currentUserId,
      parentCommentId: replyTo || undefined,
      createdAt: new Date().toISOString(),
      votes: {},
    };

    addComment(newComment);
    onCommentAdded(newComment);
    setNewContent('');
    setReplyTo(null);
  };

  const renderComment = (
    comment: Comment,
    depth: number = 0,
    renderedIds = new Set<string>()
  ): React.ReactNode => {
    if (depth > 5 || renderedIds.has(comment.id)) return null;
    renderedIds.add(comment.id);

    const replies = comments.filter(c => c.parentCommentId === comment.id);
    const author = getUserById(comment.authorId)?.fullName || 'Unknown';

    return (
      <AntComment
        key={comment.id}
        author={<strong>{author}</strong>}
        content={<div dangerouslySetInnerHTML={{ __html: comment.content }} />}
        actions={[
          <VoteButton
            key="vote"
            item={comment}
            userId={currentUserId}
            onVote={v => onVote(comment.id, v)}
          />,
          <span
            key="reply"
            onClick={() => setReplyTo(comment.id)}
            style={{ cursor: 'pointer', color: '#1890ff' }}
          >
            Reply
          </span>
        ]}
      >
        {replies.map(r => renderComment(r, depth + 1, new Set(renderedIds)))}
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

      <div style={{ marginTop: 24 }}>
        <TinyEditor onChange={setNewContent} />
        <div style={{ marginTop: 8 }}>
          <Button type="primary" onClick={handleAddComment}>
            {replyTo ? 'Gửi phản hồi' : 'Gửi bình luận'}
          </Button>
          {replyTo && (
            <Button onClick={() => setReplyTo(null)} style={{ marginLeft: 8 }}>
              Hủy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
