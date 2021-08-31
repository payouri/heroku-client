import { AppWebhook } from '../appWebhooks/types';

export type WebhookEvent = {
  id: string;
  include: string;
};

export type WebhookDeliveryWebhookData = {
  id: string;
  level: AppWebhook['level'];
};

export type WebhookDeliveryStatus =
  | 'pending'
  | 'scheduled'
  | 'retrying'
  | 'failed'
  | 'succeeded';

export type WebhookDeliveryLastAttemptStatus = Exclude<
  WebhookDeliveryStatus,
  'retrying' | 'pending'
>;

/** {@link https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery App Webhook Delivery} */
export type WebhookDelivery = {
  created_at: string;
  event: WebhookEvent;
  id: string;
  num_attempts: number;
  next_attempt_at?: string | null;
  last_attempt?: {
    id: string;
    code?: number | null;
    error_class?: string | null;
    status: WebhookDeliveryLastAttemptStatus;
    created_at: string;
    updated_at: string;
  } | null;
  status: WebhookDeliveryStatus;
  updated_at: string;
  webhook: WebhookDeliveryWebhookData;
};
