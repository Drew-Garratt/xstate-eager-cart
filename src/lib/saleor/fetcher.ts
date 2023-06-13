import { type TypedDocumentString } from './generated/graphql';
import { invariant } from './utils';

const endpoint = process.env.SALEOR_INSTANCE_URL;
invariant(endpoint, `Missing SALEOR_INSTANCE_URL!`);

type GraphQlError = {
  message: string;
};
type GraphQlErrorRespone<T> = { data: T } | { errors: readonly GraphQlError[] };

export async function saleorFetch<Result, Variables>({
  query,
  variables,
  headers,
  cache = 'force-cache',
}: {
  query: TypedDocumentString<Result, Variables>;
  variables: Variables;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<Result> {
  invariant(endpoint, `Missing SALEOR_INSTANCE_URL!`);

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query: query.toString(),
      ...(variables && { variables }),
    }),
    cache,
    next: { revalidate: 900 }, // 15 minutes
  });

  const body = (await result.json()) as GraphQlErrorRespone<Result>;

  if ('errors' in body) {
    throw body.errors[0];
  }

  return body.data;
}
