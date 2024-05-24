import { getHeaders } from "./auth-header";

const REQUEST_TIMEOUT_IN_SECS = 60 * 1000;

async function http<T>(path: string, config: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
    throw new Error("Request timeout");
  }, REQUEST_TIMEOUT_IN_SECS);

  const response = await fetch(path, {
    ...config,
    signal: controller.signal,
  });

  clearTimeout(timeoutId);

  return response.json();
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {
    headers: getHeaders(),
    method: "get",
    ...config,
  };
  return await http<T>(path, init);
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = {
    body: JSON.stringify(body),
    headers: getHeaders(),
    method: "post",
    ...config,
  };
  return await http<U>(path, init);
}
