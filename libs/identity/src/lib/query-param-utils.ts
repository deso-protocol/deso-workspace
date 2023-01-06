import { IdentityResponse } from './types';

export const parseQueryParams = (
  queryParams: URLSearchParams
): IdentityResponse => {
  const result = {} as any;

  queryParams.forEach((value, key) => {
    const v = decodeURIComponent(value);
    result[key] = key === 'payload' ? JSON.parse(v) : v;
  });

  return result as IdentityResponse;
};
