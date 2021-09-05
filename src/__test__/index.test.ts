import { createClient } from '../index';
import dotEnv from 'dotenv';
dotEnv.config();
import { AUTH_TOKEN } from './config';
import { HerokuClient } from '../types';

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

    expect(typeof apps.length).toBe('number');
    expect(apps.length).toBeGreaterThan(0);

    const [app] = apps;

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
      });

      expect(load.step).toBe(1);
      expect(Array.isArray(load.data['load.avg.1m.max'])).toBe(true);
      expect(Array.isArray(load.data['load.avg.1m.mean'])).toBe(true);
      expect(Array.isArray(load.data['load.avg.1m.min'])).toBe(true);
    }
  });
});
