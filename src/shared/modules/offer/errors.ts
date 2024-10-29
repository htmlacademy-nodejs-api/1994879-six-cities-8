import { HttpError } from '#shared/libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

export class OfferOwnerError extends HttpError {
  constructor(offerId: string) {
    super(StatusCodes.CONFLICT, `Offer ${offerId} is not created by you`);
  }
}
