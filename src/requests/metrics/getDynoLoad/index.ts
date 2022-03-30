import { createRequest } from '../../helpers/createRequest';
import { Request } from '../../types';
import {
  DataStepInMinutes,
  DynoMetricsMap,
  DynoMetricsTypes,
  Metrics,
} from '../types';

export const getDynoLoad = (config: Parameters<Request>[0]) =>
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
    Metrics<DynoMetricsMap[DynoMetricsTypes.LOAD]>
  >({
    ...config,
    createURL: ({ appId }) => `/metrics/${appId}/dyno/${DynoMetricsTypes.LOAD}`,
    method: 'GET',
    useMetricsURL: true,
    defaultQuery: {
      process_type: 'web',
    },
  });
