const createHerokuClientErrorMessage = (msg: string): string =>
  `HerokuClientError: ${msg}`;

export class HerokuClientError extends Error {
  constructor(message = 'unspecified error') {
    super(createHerokuClientErrorMessage(message));
  }
}
