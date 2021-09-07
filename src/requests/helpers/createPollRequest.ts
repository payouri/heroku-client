import {
  PollAbleResponse,
  Request,
  RequestParams,
  ResponseBody,
} from '../types';
import { TypedEmitter } from 'tiny-typed-emitter';

const addCancel = (
  emitter: TypedEmitter,
  cancelFn: () => void
): TypedEmitter & { cancel: () => void } => {
  const cancelableEmitter = Object.assign(emitter, {
    cancel: cancelFn,
  });

  return cancelableEmitter;
};

export function createPollRequest<
  Req extends RequestParams = RequestParams,
  Res extends ResponseBody = ResponseBody
>(
  params: RequestParams & Req,
  request: ReturnType<Request<Req, Res>>,
  pollEvery: number
): PollAbleResponse<Res> {
  const emitter = new TypedEmitter<{
    data: (data: Res) => void;
    error: (error: Error) => void;
  }>();

  let timeOut: NodeJS.Timeout | null = null;

  const createRequestTimeout = (req: Req) => {
    timeOut = setTimeout(async () => {
      try {
        const res = await request({ ...req, useCache: false });
        emitter.emit('data', res);
      } catch (err) {
        emitter.emit('error', err as Error);
      }

      createRequestTimeout({ ...req, useCache: false });
    }, pollEvery).unref();
  };

  const cancelTimeout = () => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
  };

  createRequestTimeout(params);
  return addCancel(emitter, cancelTimeout);
}
