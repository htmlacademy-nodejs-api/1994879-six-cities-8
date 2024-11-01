import { UserType } from '../../const';

export class UserDto {
  public id!: string;
  public email!: string;
  public avatarUrl!: string;
  public name!: string;
  public type!: UserType;
}
