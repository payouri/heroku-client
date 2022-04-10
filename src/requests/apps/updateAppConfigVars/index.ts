import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { App, Stack } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-update | app-update} */
export const updateApp = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: Record<string, string | null>;
    },
    Record<string, string>
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/config-vars`,
    method: 'PATCH',
  });
