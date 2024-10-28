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
export class PremiumOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Get, handler: this.getPremium });
  }

  public async getPremium(req: Request, res: Response): Promise<void> {
    const city = req.query.city as string;
    const offers = await this.offerService.findByPremium(city);
    this.ok(res, fillDto(OfferRdo, offers));
  }
}
