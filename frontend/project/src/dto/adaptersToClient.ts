import { CommentDto } from './comment/comment.dto';
import { Comment, User } from './../types/types';
import { UserDto } from './user/user.dto';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  avatarUrl: user.avatarUrl,
  type: user.type,
  email: user.email,
});

export const adaptCommentToClient = (comment: CommentDto): Comment => ({
  id: comment.id,
  comment: comment.comment,
  date: comment.postDate,
  rating: comment.rating,
  user: adaptUserToClient(comment.user),
});
