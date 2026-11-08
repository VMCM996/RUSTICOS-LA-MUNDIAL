import { withBasePath } from './basePath';

export default function imageLoader({ src }) {
  return withBasePath(src);
}
