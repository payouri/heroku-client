/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-feature-attributes App Feature} */
export type AppFeature = {
  created_at: string;
  description: string;
  display_name: string;
  doc_url: string;
  enabled: boolean;
  feedback_email: string;
  id: string;
  name: string;
  state: string;
  updated_at: string;
};
