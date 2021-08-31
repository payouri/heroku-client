import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppWebhook } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-update Update App Webhook} */
export const updateAppWebhook = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be name or uuid */
        webhookId: string;
      };
      body: {
        include: AppWebhook['include'];
        level: AppWebhook['level'];
        url: AppWebhook['url'];
        authorization?: string | null;
        secret?: string | null;
      };
    },
    AppWebhook
  >({
    ...config,
    createURL: ({ appId, webhookId }) => `/apps/${appId}/webhooks/${webhookId}`,
    method: 'PATCH',
  });
