import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import {
  DynoMetricsMap,
  RouterMetricsTypes,
  Metrics,
  RouterMetricsMap,
} from '../types';

export const getRouterStatus = (config: Parameters<Request>[0]) =>
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
    Metrics<RouterMetricsMap[RouterMetricsTypes.STATUS]>
  >({
    ...config,
    createURL: ({ appId }) =>
      `/metrics/${appId}/dyno/${RouterMetricsTypes.STATUS}`,
    method: 'GET',
    useMetricsURL: true,
    defaultQuery: {
      process_type: 'web',
    },
  });
