// The website's view of the catalogue, read from the Express API (server/routes/public.ts).
import { api } from "./api";
import type { Card, Destination, Visa } from "@/shared/catalog-types";

export type { Card, Destination, Pic, Visa } from "@/shared/catalog-types";
export { categoryLabel } from "@/shared/catalog-types";

const qs = (o: Record<string, string | undefined>) => {
  const p = new URLSearchParams(Object.entries(o).filter((e): e is [string, string] => !!e[1]));
  return p.size ? `?${p}` : "";
};

export const listDestinations = (category?: string) => api<Destination[]>(`/api/destinations${qs({ category })}`);
export const getDestination = (slug: string) => api<Destination | null>(`/api/destinations/${encodeURIComponent(slug)}`, { notFound: null });
export const hotelCards = (destination?: string) => api<Card[]>(`/api/hotels${qs({ destination })}`);
export const excursionCards = (destination?: string) => api<Card[]>(`/api/excursions${qs({ destination })}`);
export const packageCards = (o: { category?: string; deals?: boolean; destination?: string } = {}) =>
  api<Card[]>(`/api/packages${qs({ category: o.category, deals: o.deals ? "1" : undefined, destination: o.destination })}`);
export const findCard = (type: Card["type"], slug: string) => api<Card | null>(`/api/cards/${type}/${encodeURIComponent(slug)}`, { notFound: null });
export const listVisas = () => api<Visa[]>("/api/visas");
