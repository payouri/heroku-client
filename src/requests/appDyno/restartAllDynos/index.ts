import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#dyno-restart-all | dyno-restart-all} */
export const restartAllDynos = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    void
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/dynos`,
    method: 'DELETE',
  });
