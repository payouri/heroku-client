import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { LogSession } from '../types';

export const createLogDrain = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body?: Partial<{
        dyno: string;
        lines: number;
        source: string;
        tail: boolean;
      }>;
    },
    LogSession
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/log-sessions`,
    method: 'POST',
  });
