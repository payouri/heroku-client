import { RequestConfig, RequestParams } from '../requests/types';

export type ResponseCacheParams = {
  invalidateTimerSec?: number;
};

export type PastRequest = Response & {
  executionDate: string;
  timer?: NodeJS.Timeout;
};

export type PastRequests = Record<string, PastRequest | null>;

export type FullRequestParams = RequestParams & {
  requestURL: string;
};

export type onResponseFunction = NonNullable<RequestConfig['onResponse']>;

export type onRequestFunction = NonNullable<RequestConfig['onRequest']>;
