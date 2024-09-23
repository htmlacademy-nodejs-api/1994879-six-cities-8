import { OfferType } from './offer.type.enum.js';
import { Image } from './image.type.js';
import { User } from './user.type.js';
import { Goods } from './goods.type.enum.js';
import { Location } from './location.type.js';
import { City } from './city.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
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
  host: User;
  location: Location;
}
