import { RequestConfig, RequestParams } from '../requests/types';
import { stringToHash } from './utils';

export type ResponseCacheParams = {
  invalidateTimerSec?: number;
};

export type PastRequest = Response & {
  executionDate: string;
  timer?: NodeJS.Timeout;
};

export type PastRequests = Record<string, PastRequest | null>;

export type ComputedRequestParams = RequestParams & {
  requestURL: string;
};

type onResponseFunction = NonNullable<RequestConfig['onResponse']>;

type onRequestFunction = NonNullable<RequestConfig['onRequest']>;

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
  }, time);
};

const createRequestHash = ({
  requestURL,
  ...params
}: ComputedRequestParams): string => {
  return String(stringToHash(`${requestURL}${JSON.stringify(params)}`));
};

export const createResponseCache = ({
  invalidateTimerSec,
}: ResponseCacheParams): ResponseCacheResult => {
  const pastRequests: PastRequests = {};

  const onResponse: onResponseFunction = (request, response) => {
    const hash = createRequestHash(request);
    if (invalidateTimerSec) {
      createInvalidateTimer(pastRequests, hash, invalidateTimerSec);
    }
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
