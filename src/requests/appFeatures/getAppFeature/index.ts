import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { AppFeature } from '../types';

export const getAppFeature = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        /** should be name or uuid */
        featureId: string;
      };
    },
    AppFeature
  >({
    ...config,
    createURL: ({ appId, featureId }) => `/apps/${appId}/features/${featureId}`,
  });
