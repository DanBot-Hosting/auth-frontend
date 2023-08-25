interface SetOptions {
  expires?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
}

interface UseCookies {
  get: (key: string) => string | undefined;
  set: (key: string, value: string, opts?: SetOptions) => string;
}
