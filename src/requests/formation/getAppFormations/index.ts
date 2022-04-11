import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Formation } from '../types';

export const getAppFormations = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
    },
    Formation[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/formation`,
  });
