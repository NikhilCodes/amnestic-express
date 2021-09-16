import { Request } from 'express';

export default function getStringFromRequest(request: Request) {
  const headersCopy = request.rawHeaders;
  headersCopy[1] = headersCopy[1].split(':')[0];
  return `${request.method}-${request.hostname}-${request.path}::${headersCopy.join(';')}-${JSON.stringify(request.body)}`;
}
