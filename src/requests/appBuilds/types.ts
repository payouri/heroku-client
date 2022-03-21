/** {@link https://devcenter.heroku.com/articles/platform-api-reference#build Build} */
export type AppBuild = {
  id: string;
  buildpacks: null | BuildPack[];
  created_at: string;
  output_stream_url: string;
  release: null | { id: string };
  slug: null | { id: string };
  source_blob: null | { checksum: string; url: string; version: string };
  stack: string;
  status: 'failed' | 'pending' | 'succeeded';
  updated_at: string;
  user: { id: string; email: string };
};

type BuildPack = {
  name: string;
  url: string;
};
