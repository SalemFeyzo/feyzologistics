import { getBaseUrl } from "@/lib/site";
import { getIndexedPageUrls } from "@/lib/sitemap-urls";

const INDEXNOW_BING_ENDPOINT = "https://www.bing.com/indexnow";

export type IndexNowSubmitResult = {
  ok: boolean;
  status: number;
  urlCount: number;
  bodySnippet?: string;
};

/**
 * Submits URLs to Bing IndexNow (Yandex participates in the IndexNow protocol).
 * @see https://www.indexnow.org/documentation
 */
export async function submitUrlsToIndexNow(options: {
  key: string;
  urls?: string[];
}): Promise<IndexNowSubmitResult> {
  const baseUrl = getBaseUrl();
  const urlList = options.urls?.length ? options.urls : getIndexedPageUrls();
  const host = new URL(baseUrl).host;
  const keyLocation = `${baseUrl}/${options.key}.txt`;

  const response = await fetch(INDEXNOW_BING_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host,
      key: options.key,
      keyLocation,
      urlList,
    }),
  });

  const text = await response.text();
  return {
    ok: response.ok,
    status: response.status,
    urlCount: urlList.length,
    bodySnippet: text.slice(0, 200) || undefined,
  };
}
