import { defaultBaseURL, defaultMetricsURL } from './constants';
import { HerokuClientError } from './errors';
import { buildRequests } from './requests';
import { getRateLimit } from './requests/miscellaneous/getRateLimit';
import { RequestConfig } from './requests/types';
import { HerokuClient, HerokuClientParams } from './types';

type ClientInnerState = {
  rateLimit: number;
};

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

  const state: ClientInnerState = {
    rateLimit: 0,
  };

  const handleResponse: RequestConfig['onResponse'] = (request, response) => {
    const remaining = Number(response.headers.get('RateLimit-Remaining') ?? 0);

    if (!isNaN(remaining)) {
      state.rateLimit = remaining;
    }
  };

  return {
    get lastRateLimit() {
      return state.rateLimit;
    },
    getRateLimit: async () => {
      const result = await getRateLimit({
        baseURL,
        token,
        metricsURL,
      })({});

      if (typeof result.remaining === 'number') {
        state.rateLimit = result.remaining;
      }

      return result.remaining;
    },
    requests: buildRequests({
      baseURL,
      token,
      metricsURL,
      onResponse: handleResponse,
    }),
  };
};
