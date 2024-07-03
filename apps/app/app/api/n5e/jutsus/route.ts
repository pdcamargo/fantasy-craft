import { paginate } from "app/api/paginate";

import jutsus from "app/api/json/jutsus.json";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page")) || undefined;
  const perPage = Number(url.searchParams.get("perPage")) || undefined;

  const json = paginate(jutsus, page, perPage);

  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
