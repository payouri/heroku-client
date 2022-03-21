import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';

export const deleteBuildCache = (config: Parameters<Request>[0]) =>
  createRequest<{
    params: {
      /** should be name or uuid */
      appId: string;
    };
  }>({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/build-cache`,
    method: 'DELETE',
  });
