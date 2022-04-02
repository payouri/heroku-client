import { Logger } from 'winston';
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
  cache,
  debug,
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

  let logger: Logger | undefined;

  if (debug) {
    import('./logger').then(({ logger: definedLogger }) => {
      logger = definedLogger;
    });
  }

  const state: ClientInnerState = {
    rateLimit: 0,
  };

  const handleResponse: RequestConfig['onResponse'] = (request, response) => {
    const remaining = Number(response.headers['ratelimit-remaining'] || 0);

    if (!Number.isNaN(remaining)) {
      if (logger) {
        logger.debug(`Rate Limit Remaining: ${remaining}`);
      }
      state.rateLimit = remaining;
    }
    if (cache) {
      cache.onResponse(request, response);
    }
  };

  const onRequest: RequestConfig['onRequest'] = (request) => {
    if (cache?.onRequest) {
      return cache.onRequest(request);
    }
    return null;
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
        getLogger: () => logger,
      })({});

      if (result.hasFailed) {
        return result;
      }

      if (typeof result.data.remaining === 'number') {
        state.rateLimit = result.data.remaining;
      }

      return {
        hasFailed: false,
        data: result.data.remaining,
      };
    },
    requests: buildRequests({
      getLogger: () => logger,
      baseURL,
      token,
      metricsURL,
      onRequest,
      onResponse: handleResponse,
    }),
  };
};
