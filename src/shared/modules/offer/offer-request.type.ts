import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { RequestBody, RequestParams } from '#shared/libs/rest/index.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';

export type ParamOfferId =
  | {
      offerId: string;
    }
  | ParamsDictionary;

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
