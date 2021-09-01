import { defaultBaseURL, defaultMetricsURL } from './constants';
import { HerokuClientError } from './errors';
import { buildRequests } from './requests';
import { HerokuClient, HerokuClientParams } from './types';

export const createClient = ({
  baseURL = defaultBaseURL,
  metricsURL = defaultMetricsURL,
  token,
}: HerokuClientParams): HerokuClient => {
  if (!baseURL) {
    throw new HerokuClientError('Missing Heroku baseURL');
  }
  if (!metricsURL) {
    throw new HerokuClientError('Missing Heroku metricsURL');
  }
  if (!token) {
    throw new HerokuClientError('Missing Heroku token');
  }

  return buildRequests({
    baseURL,
    token,
    metricsURL,
  });
};
