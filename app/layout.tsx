import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

/**
 * Root shell: no `<html>` / `<body>` here (they live in `app/[locale]/layout.tsx`).
 * GA4 is loaded there via `@next/third-parties/google` so scripts sit inside `<body>`.
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return children;
}
