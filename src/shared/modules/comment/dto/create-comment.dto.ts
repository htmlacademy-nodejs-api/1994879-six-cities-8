import { IsNumber, IsString, Length } from 'class-validator';
import { CommentLimit } from '../const.js';
import { RatingLimit } from '#shared/modules/offer/const.js';

export class CreateCommentDto {
  @IsString()
  @Length(CommentLimit.Min, CommentLimit.Max)
  public comment: string;

  @IsNumber()
  @Length(RatingLimit.Min, RatingLimit.Max)
  public rating: number;

  @IsString()
  public offerId: string;

  @IsString()
  public userId: string;
}
