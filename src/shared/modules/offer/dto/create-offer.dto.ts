import { CityName, Goods, Image, Location, OfferType } from '#types/index.js';

export class CreateOfferDto {
  title: string;
  description: string;
  postDate: Date;
  cityName: CityName;
  previewImage: Image;
  images: Image[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Goods[];
  location: Location;
  public userId: string;
}
