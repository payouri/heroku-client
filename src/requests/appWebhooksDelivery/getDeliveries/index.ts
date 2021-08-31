import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { WebhookDelivery } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery-list Get App Webhook Deliveries} */
export const getAppWebhookDeliveries = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    WebhookDelivery
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/webhook-deliveries`,
  });
