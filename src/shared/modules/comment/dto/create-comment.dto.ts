import { IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { CommentLimit } from '../const.js';
import { RatingLimit } from '#shared/modules/offer/const.js';
import { CommentValidation } from './messages.js';

export class CreateCommentDto {
  @IsString({message: CommentValidation.comment.invalidFormat})
  @Length(CommentLimit.Min, CommentLimit.Max, {message: CommentValidation.comment.invalidLength})
  public comment: string;

  @IsNumber({maxDecimalPlaces: 1}, {message: CommentValidation.rating.invalidFormat})
  @Min(RatingLimit.Min, {message: CommentValidation.rating.invalidValue})
  @Max(RatingLimit.Max, {message: CommentValidation.rating.invalidValue})
  public rating: number;

  @IsString({message: CommentValidation.offerId.invalid})
  public offerId: string;

  @IsString({message: CommentValidation.userId.invalid})
  public userId: string;
}
