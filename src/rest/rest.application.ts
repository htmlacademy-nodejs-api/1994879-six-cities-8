import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Logger } from '#libs/logger/index.js';
import { Config, RestSchema } from '#libs/config/index.js';
import { Component } from '#types/index.js';
import { DatabaseClient } from '#libs/database-client/index.js';
import { Controller, ExceptionFilter } from '#libs/rest/index.js';
import { getMongoURI } from '#shared/helpers/database.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UserController) private readonly userController: Controller,
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

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.userController.router);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  public async init() {
    try {
      this.logger.info('Application initialization');
      this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

      await this.initDb();
      this.logger.info('Init database completed');

      await this._initMiddleware();
      this.logger.info('App-level middleware initialization completed');

      await this._initControllers();
      this.logger.info('Controller initialization completed');

      await this._initExceptionFilters();
      this.logger.info('Exception filters initialization compleated');

      await this._initServer();
      this.logger.info(`Server started on http://localhost:${this.config.get('PORT')}`);
    } catch (error) {
      this.logger.error('Error during application initialization', error as Error);
    }
  }
}
