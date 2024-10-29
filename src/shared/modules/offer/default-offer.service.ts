import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferService } from './offer-service.interface.js';
import { CityName, Component, SortType } from '#types/index.js';
import { Logger } from '#libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferConstant } from './const.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { UpdateRatingOfferDto } from './dto/update-rating-offer.dto.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate('userId').exec();
  }

  public async find(
    count: number = OfferConstant.DefaultCount,
    offset: number = 0
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find().skip(offset).limit(count).populate('userId').exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const update = { $set: dto };
    return this.offerModel.findByIdAndUpdate(offerId, update, { new: true }).populate('userId').exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, { $inc: { commentsCount: 1 } }, { new: true }).exec();
  }

  public async updateRatingById(offerId: string, dto: UpdateRatingOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const update = { $set: dto };
    return this.offerModel.findByIdAndUpdate(offerId, update, { new: true }).exec();
  }

  public async findByPremium(cityName: CityName): Promise<DocumentType<OfferEntity>[]> {
    const filter = {
      'city.name': cityName,
      isPremium: true,
    };
    return await this.offerModel
      .find(filter)
      .sort({ createdAt: SortType.Down })
      .limit(OfferConstant.PremiumCount)
      .populate('userId')
      .exec();
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .find({
        isFavorite: true,
      })
      .exec();
  }

  public async addOrRemoveFavorite(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).exec();
  }
}
