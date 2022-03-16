/* eslint-disable no-underscore-dangle */
import { AxiosResponse } from 'axios';
import { RequestConfig, RequestParams } from '../requests/types';
import { createHerokuClientErrorMessage } from './helpers';
import { HerokuClientError } from './HerokuClientError';

export class HerokuClientRequestError extends HerokuClientError {
  public code: number;

  private _response: AxiosResponse | undefined;

  private _requestParams: RequestParams;

  constructor(
    code: number,
    requestParams: RequestParams & { config: RequestConfig },
    response?: AxiosResponse,
    message = 'unspecified error'
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
