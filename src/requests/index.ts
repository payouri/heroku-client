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
  onRequest,
}: RequestConfig) => {
  return Object.keys(requests).reduce<
    { [K in keyof typeof requests]: ReturnType<typeof requests[K]> }
  >((builtRequests, requestId) => {
    const reqId = requestId as RequestIds;
    const request = requests[reqId];

    // @ts-ignore
    builtRequests[reqId] = request({
      baseURL,
      metricsURL,
      token,
      onRequest,
    });

    return builtRequests;
  }, {} as { [K in keyof typeof requests]: ReturnType<typeof requests[K]> });
};
