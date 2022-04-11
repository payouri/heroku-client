import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Dyno } from '../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#dyno-info | dyno-info} */
export const getDyno = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        dynoId: string;
      };
    },
    Dyno
  >({
    ...config,
    createURL: ({ appId, dynoId }) => `/apps/${appId}/dynos/${dynoId}`,
    method: 'GET',
  });
