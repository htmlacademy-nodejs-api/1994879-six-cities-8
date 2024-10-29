import { Request } from 'express';
import { ParamOfferId } from './param-offer-id.type.js';

export type OfferRequest = Request<ParamOfferId>;
