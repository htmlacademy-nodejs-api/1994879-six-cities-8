import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '#shared/modules/user/index.js';
import { CityName } from '#types/city-name.enum.js';
import { Goods } from '../../types/goods.type.enum.js';
import { OfferType } from '../../types/offer.type.enum.js';
import { Location } from '../../types/location.type.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public date: Date;

  @prop({ type: () => String, enum: CityName })
  public cityName: CityName;

  @prop()

  public previewImage: string;

  @prop()
  public images: string[];

  @prop()
  public isPremium: boolean;

  @prop()
  public isFavorite: boolean;

  @prop()
  public rating: number;

  @prop({ required: true })
  public type: OfferType;

  @prop()
  public bedrooms: number;

  @prop()
  public maxAdults: number;

  @prop()
  public price: number;

  @prop({ required: true, default: [] })
  public goods: Goods[];

  @prop()
  public location: Location;

  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
