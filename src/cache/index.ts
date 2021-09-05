import { DEFAULT_CACHE_TIME } from './constants';
import {
  FullRequestParams,
  onRequestFunction,
  onResponseFunction,
  PastRequests,
  ResponseCacheParams,
} from './types';
import { stringToHash } from './utils';

export type ResponseCacheResult = {
  onRequest: onRequestFunction;
  onResponse: onResponseFunction;
};

const createInvalidateTimer = (
  requests: PastRequests,
  hash: string,
  time: number
): void => {
  const req = requests[hash];
  if (req?.timer) {
    clearTimeout(req.timer);
  }
  setTimeout(() => {
    delete requests[hash];
  }, time * 1000);
};

const createRequestHash = ({
  requestURL,
  ...params
}: FullRequestParams): string => {
  return String(stringToHash(`${requestURL}${JSON.stringify(params)}`));
};

export const createResponseCache = ({
  invalidateTimerSec = DEFAULT_CACHE_TIME,
}: ResponseCacheParams): ResponseCacheResult => {
  const pastRequests: PastRequests = {};

  const onResponse: onResponseFunction = (request, response) => {
    const hash = createRequestHash(request);

    createInvalidateTimer(pastRequests, hash, invalidateTimerSec);

    pastRequests[hash] = {
      ...response,
      executionDate: new Date().toISOString(),
    };
  };

  const onRequest: onRequestFunction = (request) => {
    const hash = createRequestHash(request);
    if (!pastRequests[hash]) return null;
    return pastRequests[hash];
  };

  return {
    onRequest,
    onResponse,
  };
};
