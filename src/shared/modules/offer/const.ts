import { CityName, Location } from '#types/index.js';
import { Range } from '#types/range.interface.js';

export const OfferConstant = {
  DefaultCount: 60,
  ImageCount: 6,
  GoodsMinimum: 1,
};

export const TitleLimit: Range = {
  Min: 10,
  Max: 100
};

export const DescriptionLimit: Range = {
  Min: 20,
  Max: 1024
};

export const PriceLimit: Range = {
  Min: 100,
  Max: 100000
};

export const RoomLimit: Range = {
  Min: 1,
  Max: 8
};

export const AdultLimit: Range = {
  Min: 1,
  Max: 10
};

export const RatingLimit: Range = {
  Min: 1,
  Max: 5
};

export enum OfferRoute {
  Root = '/',
  OfferId = '/:offerId'
}

export const Cities: Record<CityName, Location> = {
  Paris: { latitude: 48.85661, longitude: 2.351499 },
  Cologne: { latitude: 50.938361, longitude: 6.959974 },
  Brussels: { latitude: 50.846557, longitude: 4.351697 },
  Amsterdam: { latitude: 52.370216, longitude: 4.895168 },
  Hamburg: { latitude: 53.550341, longitude: 10.000654 },
  Dusseldorf: { latitude: 51.225402, longitude: 6.776314 }
} as const;
