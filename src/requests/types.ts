import { AxiosResponse } from 'axios';
import { TypedEmitter } from 'tiny-typed-emitter';
import { FullRequestParams } from '../cache/types';

export type HTTPVerb =
  /**
   * The `DELETE` method deletes the specified resource.
   */
  | 'DELETE'

  /**
   * The `GET` method requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   */
  | 'GET'

  /**
   * The `HEAD` method asks for a response identical to that of a GET request,
   * but without the response body.
   */
  | 'HEAD'

  /**
   * The `OPTIONS` method is used to describe the communication options for the
   * target resource.
   */
  | 'OPTIONS'

  /**
   * The PATCH method is used to apply partial modifications to a resource.
   */
  | 'PATCH'

  /**
   * The `POST` method is used to submit an entity to the specified resource,
   * often causing a change in state or side effects on the server.
   */
  | 'POST'

  /**
   * The `PUT` method replaces all current representations of the target
   * resource with the request payload.
   */
  | 'PUT';

export type CustomResponse<T> =
  | {
      hasFailed: true;
      error: unknown;
      message: string;
    }
  | {
      hasFailed: false;
      data: T;
    };

export type RequestParams = {
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  useCache?: boolean;
};

export type PollRequestParams = {
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pollEvery: number;
};

export type ResponseBody = unknown;

export type PollAbleResponse<Res extends ResponseBody = ResponseBody> =
  TypedEmitter<{
    data: (data: Res) => void;
    error: (error: Error) => void;
  }> & {
    cancel: () => void;
  };

export type RequestConfig = {
  baseURL: string;
  metricsURL: string;
  token: string;
  onRequest?: (request: FullRequestParams) => AxiosResponse | null;
  onResponse?: (request: FullRequestParams, response: AxiosResponse) => void;
};

export type PollRequest<
  R extends PollRequestParams = PollRequestParams,
  T extends PollAbleResponse = PollAbleResponse
> = (config: { baseURL: string; token: string }) => (params: R) => T;

export type Request<
  R extends RequestParams = {},
  T extends ResponseBody = unknown
> = (config: RequestConfig) => (params: R) => Promise<CustomResponse<T>>;
