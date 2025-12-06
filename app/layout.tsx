// This file is required for next-intl to work with App Router
// It serves as a pass-through layout

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}