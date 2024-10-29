import { HttpError } from '#shared/libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '#types/component.enum.js';

export class UserAlreadyExistsError extends HttpError {
  constructor(email: string) {
    super(StatusCodes.CONFLICT, `User already exists, <${email}>`, Component.UserController.description);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(StatusCodes.UNAUTHORIZED, message, Component.UserController.description);
  }
}
