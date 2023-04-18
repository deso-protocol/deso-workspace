import { APIProvider } from './types';

function buildOptions(customOptions: any = {}) {
  const headers = customOptions.headers ?? {};
  delete customOptions.headers;

  return {
    headers,
    ...customOptions,
  };
}

export class APIError {
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

const wrappedFetch = (url: string, options: any) => {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return res.json().then((json) => {
        throw new APIError(json.error, res.status);
      });
    }

    return res.text().then((rawBodyText) => {
      if (rawBodyText.length === 0) {
        // In the case where the response body is empty, it will fail to parse
        // as JSON so we just handle it as a special case.
        return null;
      } else {
        return JSON.parse(rawBodyText);
      }
    });
  });
};

export const api: APIProvider = {
  post(url: string, data: Record<string, any>): Promise<any> {
    return wrappedFetch(
      url,
      buildOptions({
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },
  get(url: string): Promise<any> {
    return wrappedFetch(url, buildOptions({ method: 'GET' }));
  },
};
