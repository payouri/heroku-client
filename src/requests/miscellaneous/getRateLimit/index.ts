import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { RateLimit } from './types';

export const getRateLimit = (config: Parameters<Request>[0]) =>
  createRequest<{}, RateLimit>({
    ...config,
    createURL: () => `/account/rate-limits`,
  });
