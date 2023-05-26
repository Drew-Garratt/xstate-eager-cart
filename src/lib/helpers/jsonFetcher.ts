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

  /**
   * If the method is GET, append the params to the URL
   * 
   * If the value is a string, append it as is (e.g. ?key=value)
   * if the value is not a string we need to stringify it first
   */
  if (method === "GET" && params) {
    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (typeof value === 'string') {
        url.searchParams.append(key, value)
      } else {
        url.searchParams.append(key, JSON.stringify(value))
      }
    });
  }

  let response;
  let json;

  try {
    response = await fetch(url, {
      method,
      // Ensure content type is always set to JSON for this method
      headers: { ...headers, 'Content-Type': 'application/json' },
      /**
       * If the method is not GET, we need to stringify the params
       */
      body: method !== 'GET' ? JSON.stringify(params) : undefined,
    });
    json = await response.json();
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error('There was a SyntaxError', error);
    } else {
      console.error('There was an error', error);
    }
    return false;
  }

  return json;
}
