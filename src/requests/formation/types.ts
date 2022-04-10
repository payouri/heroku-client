export type Formation = {
  app: {
    name: string;
    id: string;
  };
  command: string;
  created_at: string;
  id: string;
  quantity: number;
  size:
    | 'free'
    | 'hobby'
    | 'standard-1x'
    | 'standard-2x'
    | 'performance-m'
    | 'performance-l';
  type: 'web';
  updated_at: string;
};
