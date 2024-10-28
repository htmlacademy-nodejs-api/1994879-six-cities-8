import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '#libs/logger/index.js';
import { Config, RestSchema } from '#libs/config/index.js';
import { Component } from '#types/index.js';
import { DatabaseClient } from '#libs/database-client/index.js';
import { Controller, ExceptionFilter } from '#libs/rest/index.js';
import { getMongoURI } from '#shared/helpers/database.js';
import { AppRoute } from './rest.const.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.PremiumOfferController) private readonly premiumOfferController: Controller,
    @inject(Component.FavoriteOfferController) private readonly favoriteOfferController: Controller
  ) {
    this.server = express();
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use(AppRoute.Offer, this.commentController.router);
    this.server.use(AppRoute.Offer, this.offerController.router);
    this.server.use(AppRoute.User, this.userController.router);
    this.server.use(AppRoute.Premium, this.premiumOfferController.router);
    this.server.use(AppRoute.Favorite, this.favoriteOfferController.router);
  }

  private async initMiddleware() {
    this.server.use(express.json());
    this.server.use(AppRoute.Upload, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(AppRoute.Static, express.static(this.config.get('STATIC_DIRECTORY')));
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    try {
      this.logger.info('Application initialization');
      this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

      await Promise.all([this.initDb(), this.initMiddleware(), this.initControllers(), this.initExceptionFilters()]);

      await this.initServer();
      this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
    } catch (error) {
      this.logger.error('Error during application initialization', error as Error);
    }
  }
}
