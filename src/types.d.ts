import { buildRequests } from './requests';
import { RequestConfig } from './requests/types';

export type HerokuClientParams = Partial<Omit<RequestConfig, 'onRequest'>> & {
  token: RequestConfig['token'];
};

export type HerokuClient = ReturnType<{ requests: typeof buildRequests }>;
