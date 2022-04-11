import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { ConfigVars } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#config-vars-update Update App Config Vars} */
export const updateAppConfigVars = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: Record<string, string | null>;
    },
    ConfigVars
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/config-vars`,
    method: 'PATCH',
  });
