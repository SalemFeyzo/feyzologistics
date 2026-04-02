import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-4 font-sans text-neutral-900">
        <h1 className="text-2xl font-semibold">Page not found</h1>
        <p className="text-center text-neutral-600">
          The page you requested does not exist.
        </p>
        <Link
          href="/en"
          className="rounded-full border border-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-100"
        >
          Go to home
        </Link>
      </body>
    </html>
  );
}
