import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppWebhook } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-list Get App Webhooks} */
export const getAppWebhooks = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    AppWebhook[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/webhooks}`,
  });
