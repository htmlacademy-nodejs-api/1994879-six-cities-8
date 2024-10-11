import { IsEmail, IsString, Length } from 'class-validator';
import { PasswordLimit } from '../const.js';
import { UserValidation } from './messages.js';

export class LoginUserDto {
  @IsEmail({}, {message: UserValidation.email.invalidFormat})
  public email: string;

  @IsString({message: UserValidation.password.invalidFormat})
  @Length(PasswordLimit.Min, PasswordLimit.Max, {message: UserValidation.password.invalidLength})
  public password: string;
}
