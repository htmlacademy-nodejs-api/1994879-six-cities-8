import { UserType } from '#types/index.js';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { PasswordLimit, UserNameLimit } from '../const.js';

export class CreateUserDto {
  @IsString()
  @Length(UserNameLimit.Min, UserNameLimit.Max)
  public name: string;

  @IsEnum(UserType)
  public type: UserType;

  @IsEmail()
  public email: string;

  @IsString()
  @Length(PasswordLimit.Min, PasswordLimit.Max)
  public password: string;
}
