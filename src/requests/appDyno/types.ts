export type Dyno = {
  app: {
    id: string;
    name: string;
  };
  attach_url: string | null;
  command: string;
  created_at: string;
  id: string;
  name: string;
  release: {
    id: string;
    release: number;
  };
  size:
    | 'free'
    | 'hobby'
    | 'standard-1x'
    | 'standard-2x'
    | 'performance-m'
    | 'performance-l';
  state: 'crashed' | 'down' | 'idle' | 'starting' | 'up';
  type: 'run' | 'web';
  updated_at: string;
};
