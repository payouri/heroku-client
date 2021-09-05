export const stringToHash = (s: string) => {
  var hash = 0;

  if (s.length == 0) return hash;

  for (let i = 0, n = s.length; i < n; i += 1) {
    let char = s.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
};
