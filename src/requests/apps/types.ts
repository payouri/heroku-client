export type Region = {
  id: string;
  name: string;
};

export type Team = {
  id: string;
  name: string;
};

export type Owner = {
  email: string;
  id: string;
};

export type Organization = {
  id: string;
  name: string;
};

export type Stack = {
  id: string;
  name: string; // e.g. "heroku-18"
};

export type Space = {
  id: string;
  name: string;
  shield: boolean;
};

export type App = {
  acm: boolean;
  archived_at?: string;
  buildpack_provided_description?: string;
  build_stack: {
    id: string;
    name: string;
  };
  created_at: string;
  git_url?: string;
  id: string;
  internal_routing?: boolean;
  maintenance: boolean;
  name: string;
  owner: Owner;
  organization?: Organization;
  team?: Team;
  region: Region;
  released_at?: string;
  repo_size?: number;
  slug_size?: number;
  space?: Space;
  stack: Stack;
  updated_at?: string;
  web_url: string;
};
