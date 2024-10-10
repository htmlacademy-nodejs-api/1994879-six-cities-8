import { IsNumber, Max, Min } from 'class-validator';
import { RatingLimit } from '../const.js';

export class UpdateRatingOfferDto {
  @IsNumber()
  @Min(RatingLimit.Min)
  @Max(RatingLimit.Max)
  public rating: number;

  @IsNumber()
  public commentsCount: number;
}
