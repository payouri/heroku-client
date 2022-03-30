import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import {
  RouterMetricsTypes,
  Metrics,
  RouterMetricsMap,
  DataStepInMinutes,
} from '../types';

export const getRouterLatency = (config: Parameters<Request>[0]) =>
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
        step: DataStepInMinutes;
      };
    },
    Metrics<RouterMetricsMap[RouterMetricsTypes.LATENCY]>
  >({
    ...config,
    createURL: ({ appId }) =>
      `/metrics/${appId}/router/${RouterMetricsTypes.LATENCY}`,
    method: 'GET',
    useMetricsURL: true,
    defaultQuery: {
      process_type: 'web',
    },
  });
