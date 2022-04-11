import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import {
  DataStepInMinutes,
  Metrics,
  RouterMetricsMap,
  RouterMetricsTypes,
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
        step: DataStepInMinutes;
      };
    },
    Metrics<RouterMetricsMap[RouterMetricsTypes.STATUS]>
  >({
    ...config,
    createURL: ({ appId }) =>
      `/metrics/${appId}/router/${RouterMetricsTypes.STATUS}`,
    method: 'GET',
    useMetricsURL: true,
    defaultQuery: {
      process_type: 'web',
    },
  });
