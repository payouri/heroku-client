import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppWebhook } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-create Add App Webhook} */
export const addAppWebhook = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: {
        include: AppWebhook['include'];
        level: AppWebhook['level'];
        url: AppWebhook['url'];
        authorization?: string;
        secret?: string;
      };
    },
    AppWebhook
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/webhooks`,
    method: 'POST',
  });
