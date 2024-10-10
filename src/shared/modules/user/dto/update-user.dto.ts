import { UserType } from '#types/user.type.enum.js';
import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { UserNameLimit } from '../const.js';

export class UpdateUserDto {
  @IsString()
  @Length(UserNameLimit.Min, UserNameLimit.Max)
  public name: string;

  @IsEnum(UserType)
  public type: UserType;

  @IsString()
  @Matches(/(?:\.png|\.jpg)$/)
  public avatarUrl: string;
}
