import { UserType } from '#types/user.type.enum.js';
import { IsEnum, IsString, Length, Matches } from 'class-validator';
import { UserNameLimit } from '../const.js';
import { UserValidation } from './messages.js';

export class UpdateUserDto {
  @IsString({ message: UserValidation.name.invalidFormat })
  @Length(UserNameLimit.Min, UserNameLimit.Max, { message: UserValidation.name.invalidLength })
  public name: string;

  @IsEnum(UserType, { message: UserValidation.type.invalid })
  public type: UserType;

  @IsString({ message: UserValidation.avatarUrl.invalidFormat })
  @Matches(/(?:\.png|\.jpg)$/)
  public avatarUrl: string;
}
