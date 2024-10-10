import { Exclude } from 'class-transformer';
import { CreateOfferDto } from './create-offer.dto.js';
import { IsEmpty } from 'class-validator';

export class UpdateOfferDto extends CreateOfferDto {
  @Exclude()
  @IsEmpty()
  public declare userId: string;
}
