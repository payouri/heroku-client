import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppFeature } from '../types';

export const getAppFeatures = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    AppFeature[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/features/`,
  });
