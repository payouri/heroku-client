import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Formation } from '../types';

export const updateAppFormations = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
      };
      body: Pick<Formation, 'type'> &
        Partial<Pick<Formation, 'quantity' | 'size'>>;
    },
    Formation[]
  >({
    ...config,
    createURL: ({ appId }) => `/apps/${appId}/formation`,
    method: 'PATCH',
  });
