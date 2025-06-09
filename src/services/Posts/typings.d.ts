export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  tagIds: string[];
  tagCategoryId: string;
  notifyOnNewComment: boolean;
  votes: {
    [userId: string]: 1 | -1;
  };
}

export interface TagCategory {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
  categoryId: string;
}