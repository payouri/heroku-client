import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppBuild } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#build-info Get Build Info} */
export const getAppBuild = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be name or uuid */
        buildId: string;
      };
    },
    AppBuild
  >({
    ...config,
    createURL: ({ appId, buildId }) => `/apps/${appId}/builds/${buildId}`,
  });
