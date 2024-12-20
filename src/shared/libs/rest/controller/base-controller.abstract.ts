import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import express, { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Controller } from './controller.interface.js';
import { Logger } from '#libs/logger/index.js';
import { Route } from '#libs/rest/types/route.interface.js';
import { Component } from '#types/component.enum.js';
import { PathTransformer } from '../transform/path-transformer.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: express.Router;

  @inject(Component.PathTransformer)
  private pathTransformer: PathTransformer;

  constructor(protected readonly logger: Logger) {
    this._router = express.Router();
    this.logger.info(`Create ${this.constructor.name}:`);
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const handler = asyncHandler(route.handler.bind(this));
    const middlewares = route.middlewares?.map((item) => asyncHandler(item.execute.bind(item))) ?? [];

    this._router[route.method](route.path, [...middlewares, handler]);
    this.logger.info(`\t${route.method.toUpperCase()} \t${route.path}`);
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const modifiedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
