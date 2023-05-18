import { jsonFetcher } from '@/lib/helpers/jsonFetcher';
import { ZodSchema } from 'zod';

const baseUrl = 'https://api.chec.io/v1/';

const headers = {
  //TODO: Move this to an environment variable
  'X-Authorization': 'pk_51391d6efbdda94868f4b6cbe6cbb47b804414b0408be',
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
  params?: Record<string, string>;
  schema: ZodSchema<T>;
}): Promise<T | false> {
  const json = await jsonFetcher({ ...input, baseUrl, headers });
  if (!json) return false;

  const parsed = input.schema.safeParse(json);
  if (!parsed.success) return false;

  return parsed.data;
}
