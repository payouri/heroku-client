import { FullRequestParams } from '../requests/types';
import { DEFAULT_CACHE_TIME } from './constants';
import {
  OnRequestFunction,
  OnResponseFunction,
  PastRequests,
  ResponseCacheParams,
} from './types';
import { stringToHash } from './utils';

export type ResponseCacheResult = {
  onRequest: OnRequestFunction;
  onResponse: OnResponseFunction;
  /** Return number of deleted cached responses */
  inValidateFromURL: (url: string) => number;
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
    // eslint-disable-next-line no-param-reassign
    delete requests[hash];
  }, time * 1000);
};

const createRequestHash = ({
  requestURL,
  method,
  ...params
}: FullRequestParams): string => {
  return String(
    stringToHash(`${requestURL}${method}${JSON.stringify(params)}`)
  );
};

export const createResponseCache = ({
  invalidateTimerSec = DEFAULT_CACHE_TIME,
}: ResponseCacheParams): ResponseCacheResult => {
  const pastRequests: PastRequests = {};

  const onResponse: OnResponseFunction = (request, response) => {
    const hash = createRequestHash(request);

    createInvalidateTimer(pastRequests, hash, invalidateTimerSec);

    pastRequests[hash] = {
      ...response,
      executionDate: new Date().toISOString(),
    };
  };

  const onRequest: OnRequestFunction = (request) => {
    const hash = createRequestHash(request);
    if (!pastRequests[hash]) return null;
    return pastRequests[hash];
  };

  return {
    onRequest,
    onResponse,
    inValidateFromURL: (url: string): number => {
      let deletedCount = 0;
      Object.entries(pastRequests).forEach(([hash, responseData]) => {
        if (responseData?.request?.url.toLowerCase() === url.toLowerCase()) {
          if (responseData.timer) {
            clearTimeout(responseData.timer);
          }
          delete pastRequests[hash];
          deletedCount += 1;
        }
      });

      return deletedCount;
    },
  };
};
