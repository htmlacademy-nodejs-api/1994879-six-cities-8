import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRoute } from './const.js';
import { fillDto } from '#shared/helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';

@injectable()
export class FavoriteOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Get, handler: this.getFavorites });
  }

  public async getFavorites(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.findById(req.query.city as string);
    this.ok(res, fillDto(OfferRdo, offers));
  }
}
