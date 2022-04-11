export type DynoSizeData = {
  compute: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  cost: null | object;
  dedicated: boolean;
  dyno_units: number;
  id: string;
  memory: number;
  name: string;
  private_space_only: boolean;
};
