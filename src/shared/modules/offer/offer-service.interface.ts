import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { UpdateRatingOfferDto } from './dto/update-rating-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count: number, offset: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  updateRatingById(offerId: string, dto: UpdateRatingOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findByPremium(city: string): Promise<DocumentType<OfferEntity>[]>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[]>;
  addOrRemoveFavorite(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
}
