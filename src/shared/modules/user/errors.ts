import { HttpError } from '#shared/libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '../../types/component.enum.js';

export class UserAlreadyExistsError extends HttpError {
  constructor(message: string) {
    super(StatusCodes.CONFLICT, message, Component.UserController.description);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(StatusCodes.UNAUTHORIZED, message, Component.UserController.description);
  }
}
