import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { App } from '../types';

export const getApps = (config: Parameters<Request>[0]) =>
  createRequest<Record<string, unknown>, App[]>({
    ...config,
    createURL: () => '/apps',
  });
