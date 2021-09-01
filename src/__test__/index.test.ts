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

    const apps = await client.getApps({ pollEvery: 5000 });
    console.log(apps);
    expect(typeof apps.length).toBe('number');
  });
});
