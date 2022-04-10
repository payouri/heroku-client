import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#dyno-size-list | dyno-size-list} */
export const restartDyno = (config: Parameters<Request>[0]) =>
  createRequest<Record<string, string>, void>({
    ...config,
    createURL: () => `/dyno-sizes`,
    method: 'GET',
  });
