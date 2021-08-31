import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { App, Stack } from '../types';

/**
 * {@link https://devcenter.heroku.com/articles/platform-api-reference#app-disable-acm | disable Automated Certificate Management }
 */
export const disableAppAcm = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    App[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/acm`,
    method: 'DELETE',
  });
