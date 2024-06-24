/**
 * All requests to this route will be resended to process.env.API_URL with all path, params, query, body, http type, etc
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url.replace("/api", ""));
  const url = new URL(requestUrl.pathname, process.env.API_URL);

  const headers = new Headers(request.headers);

  return fetch(url, { headers });
}

export async function POST(request: Request) {
  const requestUrl = new URL(request.url.replace("/api", ""));

  const url = new URL(requestUrl.pathname, process.env.API_URL);
  const headers = new Headers(request.headers);
  const body = await request.json();

  return fetch(url, { headers, body, method: "POST" });
}

export async function PUT(request: Request) {
  const requestUrl = new URL(request.url.replace("/api", ""));

  const url = new URL(requestUrl.pathname, process.env.API_URL);

  const headers = new Headers(request.headers);
  const body = await request.json();

  return fetch(url, { headers, body, method: "PUT" });
}

export async function DELETE(request: Request) {
  const requestUrl = new URL(request.url.replace("/api", ""));

  const url = new URL(requestUrl.pathname, process.env.API_URL);
  const headers = new Headers(request.headers);

  return fetch(url, { headers, method: "DELETE" });
}
