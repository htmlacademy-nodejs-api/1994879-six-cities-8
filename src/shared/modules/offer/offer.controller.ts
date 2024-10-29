import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRoute } from './const.js';
import { CommentService } from '../comment/index.js';
import { fillDto } from '#shared/helpers/common.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { OfferFullRdo } from './rdo/offer-full.rdo.js';
import { NotFoundOfferError } from './offer.error.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferRequest } from './types/offer-request.type.js';
import { CreateOfferRequest } from './types/create-offer-request.type.js';
import { UpdateOfferRequest } from './types/update-offer-request.type.js';
import { OfferOwnerError } from './errors.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    const middlewares = [
      new ValidateObjectIdMiddleware('offerId'),
      new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
    ];
    const privateMiddlewares = [new PrivateRouteMiddleware(), ...middlewares];

    this.addRoute({ path: OfferRoute.Root, method: HttpMethod.Get, handler: this.getAll });
    this.addRoute({
      path: OfferRoute.Root,
      method: HttpMethod.Post,
      handler: this.createOffer,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({ path: OfferRoute.OfferId, method: HttpMethod.Get, handler: this.getOffer, middlewares });
    this.addRoute({
      path: OfferRoute.OfferId,
      method: HttpMethod.Patch,
      handler: this.updateOffer,
      middlewares: privateMiddlewares,
    });
    this.addRoute({
      path: OfferRoute.OfferId,
      method: HttpMethod.Delete,
      handler: this.deleteOffer,
      middlewares: privateMiddlewares,
    });
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find(Number(req.query.count), Number(req.query.offset));
    this.ok(res, fillDto(OfferFullRdo, offers));
  }

  public async getOffer(req: OfferRequest, res: Response): Promise<void> {
    const { offerId } = req.params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new NotFoundOfferError();
    }
    this.ok(res, fillDto(OfferFullRdo, offer));
  }

  public async createOffer({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const newOffer = await this.offerService.create(body);
    const offer = await this.offerService.findById(newOffer.id);
    this.created(res, fillDto(OfferFullRdo, offer));
  }

  private async checkOfferOwner(offerId: string, userId: string): Promise<void> {
    const offer = await this.offerService.findById(offerId);

    if (offer?.userId.id !== userId) {
      throw new OfferOwnerError(offerId);
    }
  }

  public async updateOffer(
    { params: { offerId }, body, tokenPayload }: UpdateOfferRequest,
    res: Response
  ): Promise<void> {
    await this.checkOfferOwner(offerId, tokenPayload.id);

    const updatedOffer = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDto(OfferFullRdo, updatedOffer));
  }

  public async deleteOffer({ params: { offerId }, tokenPayload }: OfferRequest, res: Response): Promise<void> {
    await this.checkOfferOwner(offerId, tokenPayload.id);

    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, fillDto(OfferRdo, offer));
  }
}
