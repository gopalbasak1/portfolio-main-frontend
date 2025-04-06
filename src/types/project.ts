export interface Project {
  _id: string;
  title?: string;
  description: string; // Ensure it's always a string (remove `| undefined`)
  liveLink: string;
  github: string;
  category: string;
  stack: { name: string }[];
  imageUrls: string;
  user?: { name?: string; imageUrls: string[] };
  createdAt: string;
}

export interface TProject {
  _id: string;
  title: string;
  description: string; // Ensure it's always a string (remove `| undefined`)
  liveLink: string;
  github: string;
  category: string;
  stack: { name: string }[];
  imageUrls: string[];
  user?: { name?: string; imageUrls: string[] };
  createdAt: string;
}
