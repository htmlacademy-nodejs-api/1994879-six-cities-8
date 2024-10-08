import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { OfferService } from './offer-service.interface.js';
//import { CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    //@inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('[OfferController]:');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.getOffers });
  }

  public async getOffers(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, offers);
  }
}
