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
      body: {
        build_stack?: Stack['id'] | Stack['name'];
        maintenance?: boolean;
        /** ^[a-z][a-z0-9-]{1,28}[a-z0-9]$ */
        name?: string;
      };
    },
    App[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}`,
    method: 'PATCH',
  });
