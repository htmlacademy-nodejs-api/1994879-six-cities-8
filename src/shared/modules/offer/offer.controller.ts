import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRoute } from './const.js';
//import { CommentService } from '../comment/index.js';
import { fillDto } from '#shared/helpers/common.js';
// import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { NotFoundOfferError } from './offer.error.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    //@inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Get, handler: this.getOffers });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Get, handler: this.getOffersById });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Post, handler: this.getOffers });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Patch, handler: this.getOffers });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Delete, handler: this.getOffers });
  }

  public async getOffers(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(Number(req.query.count), Number(req.query.offset));
    this.ok(res, fillDto(OfferFullRdo, offers));
  }

  public async getOffersById(req: Request, res: Response): Promise<void> {
    const offer = await this.offerService.findById(req.params.offerId);
    if (!offer) {
      throw new NotFoundOfferError();
    }
    this.ok(res, fillDto(OfferFullRdo, offer));
  }
}
