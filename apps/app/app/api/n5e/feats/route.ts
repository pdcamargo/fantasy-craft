import { paginate } from "app/api/paginate";

import feats from "app/api/json/feats.json";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get("page")) || undefined;
  const perPage = Number(url.searchParams.get("perPage")) || undefined;

  const json = paginate(feats, page, perPage);

  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
