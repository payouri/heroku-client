import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { App } from '../types';

export const getApp = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    App
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}`,
  });
