import { AxiosResponse } from 'axios';
import { HTTPVerb, RequestConfig, RequestParams } from '../requests/types';

export type ResponseCacheParams = {
  invalidateTimerSec?: number;
};

export type PastRequest = AxiosResponse & {
  executionDate: string;
  timer?: NodeJS.Timeout;
};

export type PastRequests = Record<string, PastRequest | null>;

export type FullRequestParams = RequestParams & {
  requestURL: string;
  method: HTTPVerb;
};

export type onResponseFunction = NonNullable<RequestConfig['onResponse']>;

export type onRequestFunction = NonNullable<RequestConfig['onRequest']>;
