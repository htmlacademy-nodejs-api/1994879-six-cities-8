import { City, Goods, Image, Location, OfferType } from '#types/index.js';
import { ArrayMinSize, IsArray, IsBooleanString, IsEnum, IsNumber, IsObject, IsString, Length, Max, Min } from 'class-validator';
import { AdultLimit, DescriptionLimit, PriceLimit, RatingLimit, RoomLimit, TitleLimit } from '../const.js';

export class CreateOfferDto {
  @IsString()
  @Length(TitleLimit.Min, TitleLimit.Max)
  public title: string;

  @IsString()
  @Length(DescriptionLimit.Min, DescriptionLimit.Max)
  public description: string;

  @IsObject()
  public city: City;

  @IsString()
  public previewImage: Image;

  @IsString()
  public images: Image[];

  @IsBooleanString()
  public isPremium: boolean;

  @IsBooleanString()
  public isFavorite: boolean;

  @IsNumber()
  @Min(RatingLimit.Min)
  @Max(RatingLimit.Max)
  public rating: number;

  @IsEnum(OfferType)
  public type: OfferType;

  @IsNumber()
  @Min(RoomLimit.Min)
  @Max(RoomLimit.Max)
  public bedrooms: number;

  @IsNumber()
  @Min(AdultLimit.Min)
  @Max(AdultLimit.Max)
  public maxAdults: number;

  @IsNumber()
  @Min(PriceLimit.Min)
  @Max(PriceLimit.Max)
  public price: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one good is required' })
  public goods: Goods[];

  @IsObject()
  public location: Location;

  @IsString()
  public userId: string;
}
