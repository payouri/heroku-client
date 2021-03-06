import { ResponseCacheResult } from './cache';
import { buildRequests } from './requests';
import { RateLimit } from './requests/miscellaneous/getRateLimit/types';
import { CustomResponse, RequestConfig } from './requests/types';

export type HerokuClientParams = Partial<
  Omit<RequestConfig, 'onRequest' | 'onResponse'>
> & {
  token: RequestConfig['token'];
  cache?: ResponseCacheResult;
  debug?: boolean;
};

export type HerokuClient = {
  lastRateLimit: number;
  getRateLimit: () => Promise<CustomResponse<RateLimit['remaining']>>;
  requests: ReturnType<typeof buildRequests>;
};

export * from './requests/apps/types';
export * from './requests/appFeatures/types';
export * from './requests/appWebhooks/types';
export * from './requests/appWebhooksDelivery/types';
export * from './requests/appBuilds/types';
export * from './requests/appDyno/types';
export * from './requests/formation/types';
export * from './requests/logDrain/types';
export * from './requests/metrics/types';
export * from './requests/miscellaneous/types';
