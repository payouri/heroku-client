import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { ConfigVars } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#config-vars-info-for-app-release Get App Release Config Vars} */
export const getAppReleaseConfigVars = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be release id or version */
        releaseId: string;
      };
    },
    ConfigVars
  >({
    ...config,
    createURL: ({ appId, releaseId }) =>
      `/apps/${appId}/releases/${releaseId}/config-vars`,
    method: 'GET',
  });
