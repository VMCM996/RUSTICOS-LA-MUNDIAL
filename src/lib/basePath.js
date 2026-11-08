export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : process.env.NODE_ENV === 'production'
      ? '/RUSTICOS-LA-MUNDIAL'
      : '';

export function withBasePath(path = '') {
  if (!path || typeof path !== 'string') return path;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!BASE_PATH || normalized.startsWith(`${BASE_PATH}/`) || normalized === BASE_PATH) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}
