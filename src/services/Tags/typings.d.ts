export interface TagCategory {
  id: string;
  name: string;
}

export interface Tags {
  id: string;
  name: string;
  categoryId: string;
}