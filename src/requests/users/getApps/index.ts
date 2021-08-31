import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { App } from '../../apps/types';

export const getUserApps = (config: Parameters<Request>[0]) =>
  createRequest<{ params: { user: string | 'self' } }, App[]>({
    ...config,
    createURL: ({ user }) => `/users/${user}/apps`,
  });
