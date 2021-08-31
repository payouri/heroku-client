import * as apps from './apps';
import * as users from './users';
import * as appFeatures from './appFeatures';
import * as appWebhooks from './appWebhooks';
import * as appWebhooksDelivery from './appWebhooksDelivery';

const requests = {
  ...apps,
  ...appFeatures,
  ...users,
  ...appWebhooks,
  ...appWebhooksDelivery,
};

type Requests = typeof requests;
type RequestIds = keyof Requests;

export const buildRequests = ({
  baseURL,
  token,
}: {
  baseURL: string;
  token: string;
}) => {
  return Object.keys(requests).reduce<
    { [K in keyof typeof requests]: ReturnType<typeof requests[K]> }
  >((builtRequests, requestId) => {
    const reqId = requestId as RequestIds;
    const request = requests[reqId];

    // @ts-ignore
    builtRequests[reqId] = request({
      baseURL,
      token,
    });

    return builtRequests;
  }, {} as { [K in keyof typeof requests]: ReturnType<typeof requests[K]> });
};
