import { HttpError } from '#shared/libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { Component } from '#types/component.enum.js';

export class NotFoundOfferError extends HttpError {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'Предложение не найдено', Component.UserController.description);
  }
}
