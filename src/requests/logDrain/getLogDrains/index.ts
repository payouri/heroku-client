import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { LogDrain } from '../types';

export const getLogDrains = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    LogDrain[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/log-drains`,
    method: 'GET',
  });
