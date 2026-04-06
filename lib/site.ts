export const SOCIAL_HANDLE = "feyzologistics";

/** Official association sites — see https://www.siffa.org.sy/ and https://fiata.org/ */
export const SIFFA_WEBSITE_URL = "https://www.siffa.org.sy/";
export const FIATA_WEBSITE_URL = "https://fiata.org/";

export function getBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://feyzologistics.com";
  return raw.replace(/\/$/, "");
}

export function getSocialProfileUrls(): string[] {
  return [
    process.env.NEXT_PUBLIC_SOCIAL_X_URL ??
      `https://x.com/${SOCIAL_HANDLE}`,
    process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK_URL ??
      `https://www.facebook.com/${SOCIAL_HANDLE}`,
    process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL ??
      `https://www.instagram.com/${SOCIAL_HANDLE}/`,
    process.env.NEXT_PUBLIC_SOCIAL_THREADS_URL ??
      `https://www.threads.net/@${SOCIAL_HANDLE}`,
  ];
}
