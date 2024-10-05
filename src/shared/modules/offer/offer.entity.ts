import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '#shared/modules/user/index.js';
import { CityName, Goods, OfferType, Location } from '#types/index.js';
import { Schema } from 'mongoose';

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

  @prop({})
  public previewImage: string;

  @prop({ type: Array })
  public images: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ type: () => String, enum: OfferType, required: true })
  public type: OfferType;

  @prop({ required: true })
  public bedrooms: number;

  @prop({ required: true })
  public maxAdults: number;

  @prop({ required: true })
  public price: number;

  @prop({ type: Array, required: true, default: [] })
  public goods: Goods[];

  @prop({ type: Schema.Types.Mixed, required: true })
  public location: Location;

  @prop({ ref: UserEntity, required: true })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
