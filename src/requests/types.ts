import { TypedEmitter } from 'tiny-typed-emitter';

export type HTTPVerb =
  /**
   * The `CONNECT` method establishes a tunnel to the server identified by the
   * target resource.
   */
  | 'CONNECT'

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
  | 'PUT'

  /**
   * The `TRACE` method performs a message loop-back test along the path to the
   * target resource.
   */
  | 'TRACE';

export type RequestParams = {
  headers?: Record<string, string>;
  query?: Record<string, string | string[]>;
  params?: Record<string, unknown>;
  body?: Record<string, unknown>;
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

export type PollRequest<
  R extends PollRequestParams = PollRequestParams,
  T extends PollAbleResponse = PollAbleResponse
> = (config: { baseURL: string; token: string }) => (params: R) => T;

export type Request<
  R extends RequestParams = {},
  T extends ResponseBody = unknown
> = (config: {
  baseURL: string;
  metricsURL: string;
  token: string;
}) => (params: R) => Promise<T>;
