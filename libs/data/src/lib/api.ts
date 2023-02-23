class DeSoAPIError {
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
        throw new DeSoAPIError(json.error, res.status);
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

export interface APIConfiguration {
  nodeURI?: string;
}

class DeSoAPIClient {
  #nodeURI = 'https://node.deso.org';

  /**
   * @readonly
   */
  get nodeURI() {
    return this.#nodeURI;
  }

  post(endpoint: string, data: Record<string, any>): Promise<any> {
    return wrappedFetch(this.#url(endpoint), {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  get(endpoint: string): Promise<any> {
    return wrappedFetch(this.#url(endpoint), { method: 'GET' });
  }

  configure(options: APIConfiguration) {
    if (typeof options.nodeURI === 'string') {
      this.#nodeURI = options.nodeURI;
    }
  }

  /**
   * Returns a URL for the given node URI and endpoint after normalizing any
   * trailing or leading slashes.
   * @private
   */
  #url(endpoint: string) {
    return `${this.#nodeURI.replace(/\/+$/, '')}/${endpoint.replace(
      /^\/+/,
      ''
    )}`;
  }
}

export const api = new DeSoAPIClient();
