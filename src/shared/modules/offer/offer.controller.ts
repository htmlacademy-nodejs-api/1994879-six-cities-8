import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRoute } from './const.js';
import { CommentService } from '../comment/index.js';
import { fillDto } from '#shared/helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { NotFoundOfferError } from './offer.error.js';
import { CreateOfferRequest, ParamOfferId } from './offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Get, handler: this.getAll });
    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Post, handler: this.createOffer });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Get, handler: this.getOffer });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Patch, handler: this.updateOffer });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Delete, handler: this.deleteOffer });
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(Number(req.query.count), Number(req.query.offset));
    this.ok(res, fillDto(OfferFullRdo, offers));
  }

  public async getOffer(req: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new NotFoundOfferError();
    }
    this.ok(res, fillDto(OfferFullRdo, offer));
  }

  public async createOffer(req: CreateOfferRequest, res: Response): Promise<void> {
    const { body: dto } = req;
    const newOffer = await this.offerService.create(dto);
    const offer = await this.offerService.findById(newOffer.id);
    this.created(res, fillDto(OfferFullRdo, offer));
  }

  public async updateOffer(req: Request<ParamOfferId>, res: Response): Promise<void> {
    const { body: dto, params: { offerId } } = req;
    const offer = await this.offerService.updateById(offerId, dto);
    this.ok(res, fillDto(OfferFullRdo, offer));
  }

  public async deleteOffer(req: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, fillDto(OfferRdo, offer));
  }
}
