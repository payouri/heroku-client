export type DataArray = number[];

export type NullableDataArray = (number | null)[];

export type LoadData = {
  'load.avg.1m.max': DataArray;
  'load.avg.1m.mean': DataArray;
  'load.avg.1m.min': DataArray;
};

export type LatencyData = {
  'latency.ms.max': DataArray;
  'latency.ms.p50': DataArray;
  'latency.ms.p95': DataArray;
  'latency.ms.p99': DataArray;
};

export type StatusData = Record<number, NullableDataArray>;

export type MemoryData = {
  'memory.pages.in.max': DataArray;
  'memory.pages.in.mean': DataArray;
  'memory.pages.out.max': DataArray;
  'memory.pages.out.mean': DataArray;
  'memory.quota.bytes.max': DataArray;
  'memory.rss.bytes.max': DataArray;
  'memory.swap-plus-rss.bytes.max': DataArray;
  'memory.swap-plus-rss.bytes.mean': DataArray;
  'memory.swap.bytes.max': DataArray;
  'memory.total.bytes.max': DataArray;
  'memory.used.bytes.mean': DataArray;
};

export type RouterErrors = {
  H10?: NullableDataArray;
  H11?: NullableDataArray;
  H12?: NullableDataArray;
  H13?: NullableDataArray;
  H14?: NullableDataArray;
  H15?: NullableDataArray;
  H16?: NullableDataArray;
  H17?: NullableDataArray;
  H18?: NullableDataArray;
  H19?: NullableDataArray;
  H20?: NullableDataArray;
  H21?: NullableDataArray;
  H22?: NullableDataArray;
  H23?: NullableDataArray;
  H24?: NullableDataArray;
  H25?: NullableDataArray;
  H26?: NullableDataArray;
  H27?: NullableDataArray;
  H28?: NullableDataArray;
  H31?: NullableDataArray;
  H80?: NullableDataArray;
  H81?: NullableDataArray;
  H82?: NullableDataArray;
  H99?: NullableDataArray;
};

export type DynoErrors = {
  R10?: NullableDataArray;
  R12?: NullableDataArray;
  R13?: NullableDataArray;
  R14?: NullableDataArray;
  R15?: NullableDataArray;
  R16?: NullableDataArray;
  R17?: NullableDataArray;
  R99?: NullableDataArray;
};

export enum RouterMetricsTypes {
  STATUS = 'status',
  LATENCY = 'latency',
  ERRORS = 'errors',
}

export type RouterMetricsType =
  | RouterMetricsTypes.STATUS
  | RouterMetricsTypes.LATENCY
  | RouterMetricsTypes.ERRORS;

export enum DynoMetricsTypes {
  LOAD = 'load',
  MEMORY = 'memory',
  ERRORS = 'errors',
}

export type DynoMetricsType =
  | DynoMetricsTypes.LOAD
  | DynoMetricsTypes.MEMORY
  | DynoMetricsTypes.ERRORS;

export type Metrics<Data extends unknown = unknown> = {
  data: Data;
  end_time: string;
  start_time: string;
  step: number;
};

export type RouterMetricsMap = {
  [RouterMetricsTypes.STATUS]: StatusData;
  [RouterMetricsTypes.LATENCY]: LatencyData;
  [RouterMetricsTypes.ERRORS]: RouterErrors;
};

export type DynoMetricsMap = {
  [DynoMetricsTypes.LOAD]: LoadData;
  [DynoMetricsTypes.MEMORY]: MemoryData;
  [DynoMetricsTypes.ERRORS]: DynoErrors;
};
