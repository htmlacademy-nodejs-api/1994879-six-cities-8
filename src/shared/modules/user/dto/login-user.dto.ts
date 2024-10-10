import { IsEmail, IsString, Length } from 'class-validator';
import { PasswordLimit } from '../const.js';

export class LoginUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  @Length(PasswordLimit.Min, PasswordLimit.Max)
  public password: string;
}
