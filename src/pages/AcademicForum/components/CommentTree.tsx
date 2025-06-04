import { Comment as AntComment, List } from 'antd';
import VoteButton from './VoteButton';
import { getUserById } from '@/services/AcademicForum/userService';
import { Comment } from '@/models/forumModels';

export default function CommentTree({ comments, userId, onVote }: {
  comments: Comment[];
  userId: string;
  onVote: (id: string, value: 1 | -1) => void;
}) {
  const renderComment = (comment: Comment) => {
    const replies = comments.filter(c => c.parentCommentId === comment.id);
    return (
      <AntComment
        key={comment.id}
        author={getUserById(comment.authorId)?.name || 'Unknown'}
        content={<div dangerouslySetInnerHTML={{ __html: comment.content }} />}
        actions={[<VoteButton item={comment} userId={userId} onVote={v => onVote(comment.id, v)} />]}
      >
        {replies.map(r => renderComment(r))}
      </AntComment>
    );
  };

  return <List dataSource={comments.filter(c => !c.parentCommentId)} renderItem={renderComment} />;
}
