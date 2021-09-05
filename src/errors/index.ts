const createHerokuClientErrorMessage = (msg: string): string =>
  `HerokuClientError: ${msg}`;

export class HerokuClientError extends Error {
  constructor(message = 'unspecified error') {
    super(createHerokuClientErrorMessage(message));
  }
}

export class HerokuClientRequestError extends HerokuClientError {
  public code: number;

  constructor(code: number, message = 'unspecified error') {
    super(createHerokuClientErrorMessage(message));

    this.code = code;
  }
}
