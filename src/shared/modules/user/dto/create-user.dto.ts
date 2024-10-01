import { UserType } from '@shared/types/index.js';

export class CreateUserDto {
  name: string;
  avatarUrl: string;
  type: UserType;
  email: string;
  password: string;
}
