import { buildRequests } from './requests';

export type HerokuClientParams = {
  /** shouldn't be needed */
  metricsURL?: string;
  /** shouldn't be needed */
  baseURL?: string;
  token: string;
};

export type HerokuClient = ReturnType<typeof buildRequests>;
