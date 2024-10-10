
import { UserRdo } from '#shared/modules/user/rdo/user.rdo.js';
import { OfferRdo } from './offer.rdo.js';
import { Expose, Type } from 'class-transformer';
import { Location, Goods } from '#types/index.js';

export class OfferFullRdo extends OfferRdo {
  @Expose()
  public description: string;

  @Expose()
  public images: string[];

  @Expose()
  public bedrooms: number;

  @Expose()
  public maxAdults: number;

  @Expose()
  public goods: Goods[];

  @Expose()
  public Location: Location;

  @Expose({ name: 'userId'})
  @Type(() => UserRdo)
  public host: UserRdo;
}

