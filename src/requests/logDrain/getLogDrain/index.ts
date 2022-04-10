import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { LogDrain } from '../types';

export const getLogDrain = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be token or url or drain id */
        identifier: string;
      };
    },
    LogDrain
  >({
    ...config,
    createURL: ({ appId, identifier }) =>
      `/apps/${appId}/log-drains/${identifier}`,
    method: 'GET',
  });
