import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Formation } from '../types';

export const updateAppFormation = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** should be name or uuid */
        appId: string;
        formationType: Formation['type'];
      };
      body: Pick<Formation, 'quantity' | 'size'>;
    },
    Formation
  >({
    ...config,
    createURL: ({ appId, formationType }) =>
      `/apps/${appId}/formation/${formationType}`,
    method: 'PATCH',
  });
