export interface Comment {
    id: string;
    postId: string;
    parentCommentId?: string | null;
    authorId: string;
    content: string;
    createdAt: string;
    votes: {
    [userId: string]: 1 | -1;
    };
}

export interface CommentSectionProps {
  postId: string;
  comments: Comment[];
  onCommentAdded: (newComment: Comment) => void;
  onVote: (commentId: string, vote: 1 | -1) => void;
}