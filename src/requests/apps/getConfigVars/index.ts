import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { ConfigVars } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#config-vars-info-for-app Get App Config Vars} */
export const getAppConfigVars = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    ConfigVars
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/config-vars`,
    method: 'GET',
  });
