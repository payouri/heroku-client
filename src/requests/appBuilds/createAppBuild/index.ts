import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppBuild } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#build-create Create App Build} */
export const createAppBuild = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: {
        source_blob: AppBuild['source_blob'];
        buildpacks?: AppBuild['buildpacks'];
      };
    },
    AppBuild
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/builds`,
    method: 'POST',
  });
