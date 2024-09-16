import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer.type.enum.js';
import { Image } from '../../types/image.type.js';
import { Location } from '../../types/location.type.js';
import { Goods } from '../../types/goods.type.enum.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      date,
      cityName,
      preview,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      userName,
      location
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(date),
      city: { name: cityName, location: { latitude: 0 , longitude: 0 }},
      preview,
      images: this.parseImages(images),
      isPremium: this.parseBoolean(isPremium),
      isFavorite: this.parseBoolean(isFavorite),
      rating: Number(rating),
      type: OfferType[type as OfferType],
      bedrooms: Number(bedrooms),
      maxAdults: Number(maxAdults),
      price: this.parsePrice(price),
      goods: this.parseGoods(goods),
      host: { name: userName, avatarUrl: '', isPro: false, email: '', password: '' },
      location: this.parseLocation(location),
    };
  }

  private parseImages(images: string): Image[] {
    return images.split(',').map((image) => image.trim());
  }

  private parseBoolean(value: string): boolean {
    return value.toLowerCase() === 'true';
  }

  private parseLocation(location: string): Location {
    const [latitude, longitude] = location.split(',').map((coord) => Number(coord));
    return {latitude, longitude};
  }

  private parseGoods(goods: string): Goods[] {
    return goods.split(',').map((name) => {
      const goodsEnumValue = Goods[name.trim() as Goods];
      if (goodsEnumValue) {
        return goodsEnumValue;
      } else {
        throw new Error(`Invalid goods: ${name}`);
      }
    });
  }

  private parsePrice(price: string): number {
    return Number.parseInt(price, 10);
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
