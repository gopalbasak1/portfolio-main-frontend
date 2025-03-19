export interface Project {
  _id: string;
  title: string;
  description: string; // Ensure it's always a string (remove `| undefined`)
  liveLink: string;
  github: string;
  category: string;
  stack: { name: string }[];
  image: string;
  user?: { name?: string; image?: string };
  createdAt: string;
}
