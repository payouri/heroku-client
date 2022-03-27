import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import { Metrics, RouterMetricsMap, RouterMetricsTypes } from '../types';

export const getRouterErrors = (config: Parameters<Request>[0]) =>
  createRequest<
    {
      params: {
        /** app uuid */
        appId: string;
      };
      query: {
        process_type?: 'web';
        start_time: string;
        end_time: string;
        step: '1m' | '10m' | '60m' | '120m';
      };
    },
    Metrics<RouterMetricsMap[RouterMetricsTypes.ERRORS]>
  >({
    ...config,
    createURL: ({ appId }) =>
      `/metrics/${appId}/router/${RouterMetricsTypes.ERRORS}`,
    method: 'GET',
    useMetricsURL: true,
    defaultQuery: {
      process_type: 'web',
    },
  });
