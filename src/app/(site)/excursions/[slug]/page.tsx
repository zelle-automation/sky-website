import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetail from "@/components/ItemDetail";
import { excursionCards, findCard } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await findCard("excursions", (await params).slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function ExcursionsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findCard("excursions", (await params).slug);
  if (!item) notFound();
  const all = await excursionCards();
  const related = [...all.filter((x) => x.id !== item.id && x.city === item.city), ...all.filter((x) => x.id !== item.id && x.city !== item.city)].slice(0, 3);
  return <ItemDetail item={item} related={related} />;
}
