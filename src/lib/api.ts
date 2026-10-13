// Server-side calls from Next.js pages to the Express API. Responses are { data }.
// No Next.js fetch cache: the API caches in Redis and clears it when the dashboard edits something.
const BASE = process.env.API_URL || "http://localhost:4000";

export async function api<T>(path: string, opts: { notFound?: T } = {}): Promise<T> {
  const res = await fetch(BASE + path, { cache: "no-store" });
  if (res.status === 404 && "notFound" in opts) return opts.notFound as T;
  if (!res.ok) throw new Error(`API ${path} answered ${res.status}`);
  return ((await res.json()) as { data: T }).data;
}
