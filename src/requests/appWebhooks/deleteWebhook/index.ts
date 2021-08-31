import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppWebhook } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delete Delete App Webhook} */
export const deleteAppWebhook = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be name or uuid */
        webhookId: string;
      };
    },
    AppWebhook
  >({
    ...config,
    createURL: ({ appId, webhookId }) => `/apps/${appId}/webhooks/${webhookId}`,
    method: 'DELETE',
  });
