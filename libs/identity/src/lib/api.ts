import { APIProvider } from './types';

function getOptions(customOptions: any = {}) {
  const headers = customOptions.headers;
  delete customOptions.headers;

  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...customOptions,
  };
}

export const api: APIProvider = {
  post(url: string, data: Record<string, any>): Promise<any> {
    return fetch(
      url,
      getOptions({
        method: 'POST',
        body: JSON.stringify(data),
      })
    ).then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    });
  },
};
