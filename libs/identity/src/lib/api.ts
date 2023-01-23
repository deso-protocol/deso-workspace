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

class APIError {
  message: string;
  status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }

  toString() {
    return this.message;
  }
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
        return res.json().then((json) => {
          throw new APIError(json.error, res.status);
        });
      }
      return res.json();
    });
  },
};
