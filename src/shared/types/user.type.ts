import { Image } from './image.type.js';
import { UserType } from './user.type.enum.js';

export type User = {
  name: string;
  avatarUrl: Image;
  type: UserType;
  email: string;
}
