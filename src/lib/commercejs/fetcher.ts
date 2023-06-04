import { jsonFetcher } from '@/lib/helpers/jsonFetcher';
import { ZodSchema } from 'zod';

const baseUrl = 'https://api.chec.io/v1/';

const headers = {
  //TODO: Move this to an environment variable
  'X-Authorization': process.env.NEXT_PUBLIC_COMMERCEJS_PUBLIC_KEY ?? 'xxx',
  Host: 'api.chec.io',
  Accept: 'application/json',
  'Content-Type': 'application/json',
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
}): Promise<T | false> {
  const json = await jsonFetcher({ ...input, baseUrl, headers });
  if (!json) return false;

  const parsed = input.schema.safeParse(json);

  if (!parsed.success) {
    console.error(`Fetch error at ${input.path}`, parsed.error);
    return false;
  }

  return parsed.data;
}
