import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';

export const getApp = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    Record<string, string>
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/config-vars`,
  });
