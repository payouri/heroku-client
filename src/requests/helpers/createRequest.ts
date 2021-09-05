import fetch from 'isomorphic-fetch';
import qs from 'query-string';
import { defaultHeaders } from '../config';
import { HTTPVerb, Request, RequestParams, ResponseBody } from '../types';

const createHeaders = (headers: Record<string, string>): Headers =>
  new Headers(headers);

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

    const data = await (
      await fetch(
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
      )
    ).json();

    return data as Res;
  };
}
