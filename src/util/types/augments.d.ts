import { CookieValueTypes } from 'cookies-next';

declare module 'cookies-next' {
  export type CookieValueTypes = Exclude<CookieValueTypes, boolean>;
}
