import { IsNumber, Max, Min } from 'class-validator';
import { RatingLimit } from '../const.js';
import { OfferValidation } from './messages.js';

export class UpdateRatingOfferDto {
  @IsNumber({ maxDecimalPlaces: 1 }, { message: OfferValidation.rating.invalidFormat })
  @Min(RatingLimit.Min, { message: OfferValidation.rating.invalidValue })
  @Max(RatingLimit.Max, { message: OfferValidation.rating.invalidValue })
  public rating: number;

  @IsNumber({ maxDecimalPlaces: 0 }, { message: OfferValidation.commentsCount.invalidFormat })
  public commentsCount: number;
}
