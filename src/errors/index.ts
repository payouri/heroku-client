import { AxiosResponse } from 'axios';
import { RequestConfig, RequestParams } from '../requests/types';

const createHerokuClientErrorMessage = (msg: string): string =>
  `HerokuClientError: ${msg}`;

export class HerokuClientError extends Error {
  constructor(message = 'unspecified error') {
    super(createHerokuClientErrorMessage(message));
  }
}

export class HerokuClientRequestError extends HerokuClientError {
  public code: number;
  private _response: AxiosResponse | undefined;
  private _requestParams: RequestParams;

  constructor(
    code: number,
    message = 'unspecified error',
    requestParams: RequestParams & { config: RequestConfig },
    response?: AxiosResponse
  ) {
    super(createHerokuClientErrorMessage(message));

    this.code = code;
    this._response = response;
    this._requestParams = requestParams;
  }

  get response() {
    return this._response;
  }

  get requestParams() {
    return this._requestParams;
  }
}
