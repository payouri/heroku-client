import { AxiosResponse } from 'axios';
import { RequestConfig } from '../requests/types';

export type ResponseCacheParams = {
  invalidateTimerSec?: number;
};

export type PastRequest = AxiosResponse & {
  executionDate: string;
  timer?: NodeJS.Timeout;
};

export type PastRequests = Record<string, PastRequest | null>;

export type OnResponseFunction = NonNullable<RequestConfig['onResponse']>;

export type OnRequestFunction = NonNullable<RequestConfig['onRequest']>;
