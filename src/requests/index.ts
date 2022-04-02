import * as apps from './apps';
import * as users from './users';
import * as appFeatures from './appFeatures';
import * as appWebhooks from './appWebhooks';
import * as appWebhooksDelivery from './appWebhooksDelivery';
import * as metrics from './metrics';
import { RequestConfig } from './types';

const requests = {
  ...apps,
  ...appFeatures,
  ...users,
  ...appWebhooks,
  ...appWebhooksDelivery,
  ...metrics,
};

type Requests = typeof requests;
type RequestIds = keyof Requests;

export const buildRequests = ({
  baseURL,
  metricsURL,
  token,
  getLogger,
  onResponse,
  onRequest,
}: RequestConfig) => {
  return Object.keys(requests).reduce<
    { [K in RequestIds]: ReturnType<typeof requests[K]> }
  >((builtRequests, requestId) => {
    const reqId = requestId as RequestIds;
    const request = requests[reqId];

    const fn = request({
      getLogger,
      baseURL,
      metricsURL,
      token,
      onResponse,
      onRequest,
    });

    return {
      ...builtRequests,
      [reqId]: async (...args: Parameters<typeof fn>) => {
        const start = Date.now();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const res = await fn(...args);

        const end = Date.now();

        const logger = getLogger();
        if (logger) {
          logger.debug(`${reqId} took ${end - start}ms`);
        }

        return res;
      },
    };
  }, {} as { [K in RequestIds]: ReturnType<typeof requests[K]> });
};
