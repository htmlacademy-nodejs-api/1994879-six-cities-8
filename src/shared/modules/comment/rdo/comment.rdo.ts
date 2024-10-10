import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo.js';
import { IsNumber, Matches } from 'class-validator';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  @IsNumber()
  @Matches(/^\d+(\.0)?$/)
  public rating: number;

  @Expose({ name: 'createdAt'})
  public postDate: string;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public user: UserRdo;
}
