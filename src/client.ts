import { defaultBaseURL } from './constants';
import { HerokuClientError } from './errors';
import { buildRequests } from './requests';
import { HerokuClient, HerokuClientParams } from './types';

export const createClient = ({
  baseURL = defaultBaseURL,
  token,
}: HerokuClientParams): HerokuClient => {
  if (!baseURL) {
    throw new HerokuClientError('Missing Heroku baseURL');
  }
  if (!token) {
    throw new HerokuClientError('Missing Heroku token');
  }

  return buildRequests({
    baseURL,
    token,
  });
};
