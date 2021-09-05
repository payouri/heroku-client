import { ResponseCacheResult } from './cache';
import { buildRequests } from './requests';
import { RateLimit } from './requests/miscellaneous/getRateLimit/types';
import { RequestConfig } from './requests/types';

export type HerokuClientParams = Partial<
  Omit<RequestConfig, 'onRequest' | 'onResponse'>
> & {
  token: RequestConfig['token'];
  cache?: ResponseCacheResult;
};

export type HerokuClient = {
  lastRateLimit: number;
  getRateLimit: () => Promise<RateLimit['remaining']>;
  requests: ReturnType<typeof buildRequests>;
};
