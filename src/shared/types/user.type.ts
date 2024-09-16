import { Image } from './image.type.js';

export type User = {
  name: string;
  avatarUrl: Image;
  isPro: boolean;
  email: string;
  password: string;
}
