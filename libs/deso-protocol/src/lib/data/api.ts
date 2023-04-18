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

export interface DesoNodeClientConfig {
  nodeURI?: string;
  mediaURI?: string;
}

export interface DesoMediaClientConfig {
  mediaURI?: string;
}

export const cleanURL = (origin: string, endpoint: string) => {
  return `${origin.replace(/\/+$/, '')}/${endpoint.replace(/^\/+/, '')}`;
};

class APIClient {
  protected uri = '';

  post(
    endpoint: string,
    data: Record<string, any>,
    options: { contentType?: 'multipart/form-data' } = {}
  ): Promise<any> {
    const contentType = options.contentType ?? 'application/json';
    let body: FormData | string;

    switch (contentType) {
      case 'multipart/form-data':
        body = new FormData();
        for (const key in data) {
          body.append(key, data[key]);
        }
        break;
      case 'application/json':
        body = JSON.stringify(data);
        break;
      default:
        throw new Error(`Unsupported content type: ${contentType}`);
    }

    return wrappedFetch(this.#url(endpoint), {
      method: 'POST',
      body,
      headers: {
        // NOTE: We only set the content type header if it's not
        // multipart/form-data.  This is because we need the browser to
        // automatically set the boundary for us when we use FormData:
        // https://stackoverflow.com/a/39281156
        ...(contentType !== 'multipart/form-data' && {
          'Content-Type': contentType,
        }),
      },
      ...options,
    });
  }

  get(endpoint: string): Promise<any> {
    return wrappedFetch(this.#url(endpoint), { method: 'GET' });
  }

  /**
   * Returns a URL for the given node URI and endpoint after normalizing any
   * trailing or leading slashes.
   * @private
   */
  #url(endpoint: string) {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      // If the endpoint is a full URL, just use it directly.
      // This is an optional case that allows us to override the node URI.
      return endpoint;
    }
    // Otherwise use the node URI and endpoint to construct a URL.
    // This will be the typical case.
    return cleanURL(this.uri, endpoint);
  }
}

class DeSoNodeClient extends APIClient {
  override uri = 'https://node.deso.org';

  get nodeURI() {
    return this.uri;
  }

  configure(options: DesoNodeClientConfig) {
    if (typeof options.nodeURI === 'string') {
      this.uri = options.nodeURI;
    }
  }
}

class DeSoMediaClient extends APIClient {
  override uri = 'https://media.deso.org';

  get mediaURI() {
    return this.uri;
  }

  configure(options: DesoMediaClientConfig) {
    if (typeof options.mediaURI === 'string') {
      this.uri = options.mediaURI;
    }
  }
}

export const media = new DeSoMediaClient();
export const api = new DeSoNodeClient();
