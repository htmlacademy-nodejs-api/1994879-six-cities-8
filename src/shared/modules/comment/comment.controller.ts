import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { BaseController, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { CommentService } from '../comment/index.js';
import { CommentRoute } from './const.js';
import { fillDto } from '#shared/helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info(`[${Component.CommentController.description}]:`);
    this.addRoute({ path: CommentRoute.OfferId, method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: CommentRoute.OfferId, method: HttpMethod.Post, handler: this.create });
  }

  public async index(req: Request, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(req.params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }

  public async create(req: Request, res: Response): Promise<void> {
    const comment = await this.commentService.create({...req.body, offerId: req.params.offerId});
    this.created(res, fillDto(CommentRdo, comment));
  }
}
