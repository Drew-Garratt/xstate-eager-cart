export async function jsonFetcher({
  baseUrl,
  path = '',
  method = 'GET',
  params,
  headers,
}: {
  baseUrl: string;
  path: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: Record<string, unknown>;
  headers?: HeadersInit;
}): Promise<unknown | false> {
  const url = new URL(path, baseUrl);

  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  let response;
  let json;

  try {
    response = await fetch(url, {
      method,
      // Ensure content type is always set to JSON for this method
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
    json = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.log('There was a SyntaxError', error);
    } else {
      console.log('There was an error', error);
    }
    return false;
  }

  return json;
}
