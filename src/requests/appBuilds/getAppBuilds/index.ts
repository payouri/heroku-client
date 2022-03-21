import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppBuild } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#build-list Get App Builds} */
export const getAppBuilds = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    AppBuild[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/builds`,
  });
