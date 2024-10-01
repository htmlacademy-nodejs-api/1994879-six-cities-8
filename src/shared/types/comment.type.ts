import { User } from './user.type.js';

export type Comment = {
  comment: string;
  date: Date;
  rating: boolean;
  user: User;
}
