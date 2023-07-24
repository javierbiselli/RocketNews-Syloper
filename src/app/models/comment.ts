import { User } from "./user";

export interface Comment {
  id: string;
  content: string;
  date: string;
  author: User;
}
