import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#dyno-restart | dyno-restart} */
export const restartDyno = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        dynoId: string;
      };
    },
    void
  >({
    ...config,
    createURL: ({ appId, dynoId }) => `/apps/${appId}/dynos/${dynoId}`,
    method: 'DELETE',
  });
