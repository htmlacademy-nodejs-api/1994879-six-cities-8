import { inject, injectable } from 'inversify';
import { DocumentType } from '@typegoose/typegoose';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BaseController, HttpError, HttpMethod } from '#libs/rest/index.js';
import { Logger } from '#libs/logger/index.js';
import { Component } from '#types/index.js';
import { CreateUserRequest, LoginUserRequest } from './user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, RestSchema } from '#libs/config/index.js';
import { fillDto } from '#shared/helpers/common.js';
import { UserRdo } from './rdo/user.rdo.js';
import { UserEntity } from './user.entity.js';
import { UnauthorizedError, UserAlreadyExistsError } from './errors.js';
import { UserRoute } from './const.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.addRoute({ path: UserRoute.Register, method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: UserRoute.Login, method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: UserRoute.Login, method: HttpMethod.Get, handler: this.checkAuthorization });
    this.addRoute({ path: UserRoute.Logout, method: HttpMethod.Get, handler: this.logout });
    this.addRoute({ path: UserRoute.Avatar, method: HttpMethod.Post, handler: this.uploadAvatar });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new UserAlreadyExistsError(`User with email <${body.email}> exists.`);
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDto(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new UnauthorizedError(`User with email ${body.email} not found.`);
    }

    this.ok(res, Buffer.from(`${body.email}:${body.password}`).toString('base64'));
  }

  private async getAuthorizedUser(authorization: string = ''): Promise<DocumentType<UserEntity>> {
    if (!authorization) {
      throw new UnauthorizedError();
    }

    const credentials = authorization.split(' ')[1];
    const email = Buffer.from(credentials, 'base64').toString('utf8').split(':')[0];
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError();
    }

    return user;
  }

  public async checkAuthorization(req: Request, res: Response): Promise<void> {
    const user = await this.getAuthorizedUser(req.headers.authorization);
    this.ok(res, fillDto(UserRdo, user));
  }

  public async logout(req: Request, res: Response) {
    await this.getAuthorizedUser(req.headers.authorization);
    this.noContent(res, undefined);
  }

  public async uploadAvatar() {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'not implemented', 'UserController');
  }
}
