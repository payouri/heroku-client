import { createHerokuClientErrorMessage } from './helpers';

export class HerokuClientError extends Error {
  constructor(message = 'unspecified error') {
    super(createHerokuClientErrorMessage(message));
  }
}
