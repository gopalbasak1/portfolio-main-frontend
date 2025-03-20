export interface Blog {
  _id: string;
  title: string;
  content: string;
  imageUrls: string[];
  category: string;
  createdAt: string;
  user?: { name?: string; imageUrls?: string[] | undefined };
}
