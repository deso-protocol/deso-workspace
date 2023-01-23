import { APIProvider } from './types';

class LocalStorageFake implements Storage {
  db: Record<string, string> = {};

  get length() {
    return Object.keys(this.db).length;
  }

  clear() {
    this.db = {};
  }

  key(index: number) {
    return Object.keys(this.db)[index];
  }

  getItem(key: string) {
    return this.db[key] ?? null;
  }
  setItem(key: string, value: string) {
    this.db[key] = value;
  }
  removeItem(key: string) {
    delete this.db[key];
  }
}

export function getWindowFake(overrides: Partial<Window> = {}): Window {
  overrides.location = {
    ...window.location,
    ...(overrides.location ?? {}),
  };

  return {
    ...window,
    ...overrides,
    open: () => {},
    removeEventListener: () => {},
    localStorage: new LocalStorageFake(),
  } as unknown as Window;
}

export function getAPIFake(overrides: Partial<APIProvider> = {}): APIProvider {
  return {
    post: () => Promise.resolve({}),
    ...overrides,
  };
}
