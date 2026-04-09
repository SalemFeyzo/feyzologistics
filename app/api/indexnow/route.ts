import { NextResponse } from "next/server";
import { submitUrlsToIndexNow } from "@/lib/indexnow";
import { getIndexedPageUrls } from "@/lib/sitemap-urls";

export const runtime = "nodejs";

/**
 * POST /api/indexnow
 * Pings Bing IndexNow (shared with Yandex via IndexNow protocol).
 *
 * Security: set INDEXNOW_SECRET and send header:
 *   Authorization: Bearer <INDEXNOW_SECRET>
 *
 * Env:
 *   INDEXNOW_KEY — must match the filename of your key in /public (e.g. abc.txt → INDEXNOW_KEY=abc)
 *   INDEXNOW_SECRET — required to call this route (generate a random string)
 *   NEXT_PUBLIC_SITE_URL — production origin (key must be hosted at https://host/{key}.txt)
 *
 * Optional JSON body: { "urls": ["https://..."] } to submit a subset; default = all sitemap page URLs.
 */
export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SECRET;
  const key = process.env.INDEXNOW_KEY;

  if (!secret) {
    return NextResponse.json(
      { error: "INDEXNOW_SECRET is not configured" },
      { status: 503 },
    );
  }

  const auth = request.headers.get("authorization");
  const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  if (token !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (
    !key ||
    key.length < 8 ||
    key.length > 128 ||
    !/^[a-zA-Z0-9_-]+$/.test(key)
  ) {
    return NextResponse.json(
      {
        error:
          "INDEXNOW_KEY missing or invalid. Must match the public key file name (e.g. public/your-key.txt → INDEXNOW_KEY=your-key).",
      },
      { status: 503 },
    );
  }

  let urls: string[] | undefined;
  try {
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const body = (await request.json()) as { urls?: unknown };
      if (Array.isArray(body.urls) && body.urls.every((u) => typeof u === "string")) {
        urls = body.urls as string[];
      }
    }
  } catch {
    // empty body is fine
  }

  const result = await submitUrlsToIndexNow({ key, urls });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: "IndexNow request failed",
        status: result.status,
        urlCount: result.urlCount,
        detail: result.bodySnippet,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    submitted: result.urlCount,
    urls: urls ?? getIndexedPageUrls(),
  });
}
