import { ResponseCacheResult } from './cache';
import { buildRequests } from './requests';
import { RequestConfig } from './requests/types';

export type HerokuClientParams = Partial<
  Omit<RequestConfig, 'onRequest' | 'onResponse'>
> & {
  token: RequestConfig['token'];
  cache?: ResponseCacheResult;
};

export type HerokuClient = ReturnType<{ requests: typeof buildRequests }>;
