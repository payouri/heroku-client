import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Dyno } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#dyno-info | dyno-info} */
export const getAppDynos = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    Dyno[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/dynos`,
    method: 'GET',
  });
