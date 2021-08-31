export type AppIds = {
  id: string;
  name: string;
};

/**
 * {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook App Webhook}
 */
export type AppWebhook = {
  app: AppIds;
  created_at: string;
  id: string;
  include: string[];
  level: 'notify' | 'sync';
  updated_at: string;
  url: string;
};
