/* eslint-disable @typescript-eslint/naming-convention */
import { type ZodSchema } from 'zod';
import { jsonFetcher } from '../utils/helpers/jsonFetcher';

let domain = 'http://localhost:3000';

if (process) {
  const { URL, VERCEL_URL, PORT = '3000' } = process.env;

  domain = `http://localhost:${PORT}`;

  if (VERCEL_URL) {
    domain = `https://${VERCEL_URL}`;
  } else if (URL) {
    domain = URL;
  }
}

if (typeof window !== 'undefined') {
  domain = window.location.origin;
}

const baseUrl = 'https://api.chec.io/v1/';

const defaultHeaders = {
  Accept: 'application/json',
  ['Content-Type']: 'application/json',
};

const commerceJsHeaders = {
  // TODO: Move this to an environment variable
  ['X-Authorization']: process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY ?? 'xxx',
  Host: 'api.chec.io',
};

/**
 * Commerce JS Fetcher
 *
 * @description Fetches data from the Commerce JS API type checked with Zod
 *
 * @param input : { path: string; method?: 'GET' | 'POST' | 'PUT' | 'DELETE'; params?: Record<string, string>; schema: ZodSchema<T>; }
 * @returns : Promise<T | false>
 */
export async function commercejsFetcher<T>(input: {
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
  schema: ZodSchema<T>;
  localApi?: boolean;
}): Promise<T | false> {
  /** Set if addressing local (in app) API */
  const local = input.localApi ?? false;

  /** Create fetch config based on local or commerceJS location */
  const fetchConfig = local
    ? {
        baseUrl: `${domain}/api/commercejs/`,
        headers: defaultHeaders,
      }
    : {
        baseUrl,
        headers: { ...defaultHeaders, ...commerceJsHeaders },
      };

  const json = await jsonFetcher({ ...input, ...fetchConfig });
  if (!json) return false;

  const parsed = input.schema.safeParse(json);

  if (!parsed.success) {
    console.error(`Fetch error at ${input.path}`, parsed.error);
    return false;
  }

  return parsed.data;
}
