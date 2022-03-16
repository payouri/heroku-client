import dotEnv from 'dotenv';
import { createClient } from '../index';
import { AUTH_TOKEN } from './config';
import { HerokuClient } from '../types';

dotEnv.config();

describe('Random Tests', () => {
  let client: HerokuClient;

  test('should throw on bad init params', () => {
    const badClientCreate = () => {
      createClient({
        token: AUTH_TOKEN,
        baseURL: '',
      });
    };
    expect(badClientCreate).toThrowError(/HerokuClientError/);
  });

  test('should request apps', async () => {
    client = createClient({
      token: AUTH_TOKEN,
    });

    const apps = await client.requests.getApps({});

    if (apps.hasFailed === true) {
      if (apps.error instanceof Error) {
        throw apps.error;
      }
      throw new Error('request failed');
    }

    expect(typeof apps.data.length).toBe('number');
    expect(apps.data.length).toBeGreaterThan(0);

    const [app] = apps.data;

    if (app) {
      const load = await client.requests.getDynoLoad({
        params: {
          appId: app.id,
        },
        query: {
          start_time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          end_time: new Date().toISOString(),
          step: '1m',
        },
        useCache: false,
      });

      if (load.hasFailed === true) {
        if (load.error instanceof Error) {
          throw load.error;
        }
        throw new Error('request failed');
      }

      expect(load.data.step).toBe(1);
      expect(Array.isArray(load.data.data['load.avg.1m.max'])).toBe(true);
      expect(Array.isArray(load.data.data['load.avg.1m.mean'])).toBe(true);
      expect(Array.isArray(load.data.data['load.avg.1m.min'])).toBe(true);
    }
  });
});
