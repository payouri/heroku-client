import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { LogDrain } from '../types';

export const createLogDrain = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: {
        url: string;
      };
    },
    LogDrain
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/log-drains`,
    method: 'POST',
  });
