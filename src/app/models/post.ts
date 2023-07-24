import { User } from "./user";
import { Comment } from "./comment";

export interface Post {
  id: string;
  title: string;
  author: User;
  date: string;
  content: string;
  comments: Array<Comment>;
  priority: boolean;
}
