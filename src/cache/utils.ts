/* eslint-disable eqeqeq */
/* eslint-disable no-bitwise */
export const stringToHash = (s: string) => {
  let hash = 0;

  if (s.length == 0) return hash;

  for (let i = 0, n = s.length; i < n; i += 1) {
    const char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }

  return hash;
};
