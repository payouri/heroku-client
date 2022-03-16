import Axios, { AxiosResponse } from 'axios';
import qs from 'query-string';
import { HerokuClientRequestError } from '../../errors';
import { defaultHeaders } from '../config';
import {
  CustomResponse,
  FullRequestParams,
  HTTPVerb,
  Request,
  RequestConfig,
  RequestParams,
  ResponseBody,
} from '../types';

const axiosInstance = Axios.create({
  timeout: 3000,
});

const handleResponse = async <T>(
  request: RequestParams & { config: RequestConfig },
  response: AxiosResponse
): Promise<CustomResponse<T>> => {
  if (response.status >= 400) {
    const message = response.statusText;
    return {
      hasFailed: true,
      error: new HerokuClientRequestError(
        response.status,
        request,
        response,
        message
      ),
      message,
    };
  }

  const data = response.data as T;

  return { hasFailed: false, data };
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
): (params: RequestParams & Req) => Promise<CustomResponse<Res>> {
  return async ({ useCache = true, ...req }): Promise<CustomResponse<Res>> => {
    const method = config?.method ?? 'GET';
    const query =
      req?.query || config.defaultQuery
        ? qs.stringify({ ...config.defaultQuery, ...req.query })
        : '';

    const fullURL = `${
      config.useMetricsURL ? config.metricsURL : config.baseURL
    }${config.createURL(req.params)}`;

    const computedParams: FullRequestParams = {
      method,
      requestURL: fullURL,
      ...req,
    };

    if (useCache && config.onRequest) {
      const res = config.onRequest(computedParams);

      if (res) {
        return handleResponse({ ...req, config }, res);
      }
    }

    try {
      const response = await axiosInstance({
        method,
        data: req?.body,
        headers: {
          ...defaultHeaders,
          ...config.defaultHeaders,
          ...req?.headers,
          Authorization: `Bearer ${config.token}`,
          Accept: 'application/vnd.heroku+json; version=3',
        },
        url: `${fullURL}?${query}`,
      });

      if (useCache && config.onResponse) {
        config.onResponse(computedParams, response);
      }

      return await handleResponse({ ...req, config }, response);
    } catch (err) {
      if (err instanceof Error) {
        return {
          hasFailed: true,
          error: new HerokuClientRequestError(
            500,
            { ...req, config },
            undefined,
            err.message
          ),
          message: err.message,
        };
      }
      return {
        hasFailed: true,
        error: new HerokuClientRequestError(
          500,
          { ...req, config },
          undefined,
          'request_failed_unexpectedly'
        ),
        message: 'request_failed_unexpectedly',
      };
    }
  };
}
