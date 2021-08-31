import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { WebhookDelivery } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery-info Get App Webhook Delivery} */
export const getAppWebhookDelivery = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be name or uuid */
        deliveryId: string;
      };
    },
    WebhookDelivery
  >({
    ...config,
    createURL: ({ appId, deliveryId }) =>
      `/apps/${appId}/webhook-deliveries/${deliveryId}`,
  });
