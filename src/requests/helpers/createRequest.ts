import fetch from 'isomorphic-fetch';
import qs from 'query-string';
import { FullRequestParams } from '../../cache/types';
import { HerokuClientRequestError } from '../../errors';
import { defaultHeaders } from '../config';
import { HTTPVerb, Request, RequestParams, ResponseBody } from '../types';

const createHeaders = (headers: Record<string, string>): Headers =>
  new Headers(headers);

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (response.status >= 400) {
    throw new HerokuClientRequestError(response.status, await response.text());
  }

  const data = await response.json();

  return data;
};

export function createRequest<
  Req extends RequestParams = RequestParams,
  Res extends ResponseBody = unknown
>(
  config: Parameters<Request<Req, Res>>[0] & {
    createURL: (params: Req['params']) => string;
    method?: HTTPVerb;
    useMetricsURL?: boolean;
    defaultHeaders?: RequestParams['headers'];
    defaultQuery?: RequestParams['headers'];
  }
): (params: Req) => Promise<Res> {
  return async (req): Promise<Res> => {
    const method = config?.method ?? 'GET';
    const query =
      req?.query || config.defaultQuery
        ? qs.stringify({ ...config.defaultQuery, ...req.query })
        : '';
    const body = req?.body ? JSON.stringify(req?.body) : undefined;
    const fullURL = `${
      config.useMetricsURL ? config.metricsURL : config.baseURL
    }${config.createURL(req.params)}`;

    const computedParams: FullRequestParams = {
      requestURL: fullURL,
      ...req,
    };

    if (config.onRequest) {
      const res = config.onRequest(computedParams);

      if (res) {
        return handleResponse(res);
      }
    }

    const response = await fetch(
      `${
        config.useMetricsURL ? config.metricsURL : config.baseURL
      }${config.createURL(req.params)}${query ? `?${query}` : ''}`.replace(
        /([^:]\/)\/+/g,
        '$1'
      ),
      {
        method,
        headers: createHeaders({
          ...defaultHeaders,
          ...config.defaultHeaders,
          ...req?.headers,
          Authorization: `Bearer ${config.token}`,
        }),
        body,
      }
    );

    if (config.onResponse) {
      config.onResponse(computedParams, response.clone());
    }

    return handleResponse(response);
  };
}
