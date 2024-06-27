import { TokenType, getCurrentToken } from "./useAuthToken";

const normalizeUrl = (url: string) => {
  return url.startsWith("/") ? url : `/${url}`;
};

export type FetcherOptions = RequestInit & {
  isBlob?: boolean;
  withBearer?: boolean;
};

enum StatusCode {
  UNAUTHORIZED = 401,
}

export const UNAUTHORIZED_RESPONSE = "app:unauthorized";

const dispatchUnauthorized = () => {
  const event = new Event(UNAUTHORIZED_RESPONSE, {
    bubbles: true,
    cancelable: false,
  });

  window.dispatchEvent(event);
};

export type FetcherResponse<T = any> = [Response, T];

export async function fetcher<T = any>(
  requestUrl: string,
  init: FetcherOptions = {},
): Promise<FetcherResponse<T>> {
  const { isBlob, headers, withBearer = true, ...rest } = init;

  let tokenHeader: Record<string, string> = {};

  if (withBearer) {
    const token = getCurrentToken();

    if (!token) {
      throw new Error("Token not found");
    }

    tokenHeader = {
      Authorization: `Bearer ${token.token}`,
    };
  }

  const resp = await fetch(`${normalizeUrl(requestUrl)}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...tokenHeader,
      ...headers,
    },
    credentials: "include",
  });

  if (resp.status === StatusCode.UNAUTHORIZED) {
    dispatchUnauthorized();
  }

  if (isBlob) {
    return [resp, (await resp.blob()) as T] as const;
  }

  return [resp, (await resp.json()) as T] as const;
}

fetcher.post = async function post<T>(
  requestUrl: string,
  body: any,
  init: FetcherOptions = {},
) {
  const isFormData = body instanceof FormData;

  const finalBody = isFormData ? body : JSON.stringify(body ?? {});

  return fetcher<T>(requestUrl, {
    ...init,
    method: "POST",
    body: finalBody,
  });
};

fetcher.put = async function put<T>(
  requestUrl: string,
  body: any,
  init: FetcherOptions = {},
) {
  const isFormData = body instanceof FormData;

  const finalBody = isFormData ? body : JSON.stringify(body ?? {});

  return fetcher<T>(requestUrl, {
    ...init,
    method: "PUT",
    body: finalBody,
  });
};

fetcher.get = async function get<T>(
  requestUrl: string,
  data?: any,
  init: FetcherOptions = {},
) {
  const searchParams = new URLSearchParams(data ?? {});

  const requestUrlWithParams =
    searchParams.size > 0
      ? `${requestUrl}?${searchParams.toString()}`
      : requestUrl;

  return fetcher<T>(requestUrlWithParams, {
    ...init,
    method: "GET",
  });
};

fetcher.delete = async function del<T>(
  requestUrl: string,
  data?: any,
  init: FetcherOptions = {},
) {
  const searchParams = new URLSearchParams(data ?? {});

  const requestUrlWithParams =
    searchParams.size > 0
      ? `${requestUrl}?${searchParams.toString()}`
      : requestUrl;

  return fetcher<T>(requestUrlWithParams, {
    ...init,
    method: "DELETE",
  });
};
