export interface IUser {
  _id: string;
  userId?: string;
  email: string;
  phoneNumber: string;
  role: "admin" | "user";
  imageUrls?: string;
  name: string;
  iat?: number;
  exp?: number;
  status: "active" | "blocked";
}
