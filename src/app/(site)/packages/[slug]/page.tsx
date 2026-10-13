import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ItemDetail from "@/components/ItemDetail";
import { findCard, packageCards } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const item = await findCard("packages", (await params).slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function PackageDetail({ params }: { params: Promise<{ slug: string }> }) {
  const item = await findCard("packages", (await params).slug);
  if (!item) notFound();
  const all = await packageCards();
  const related = [...all.filter((x) => x.id !== item.id && x.category === item.category), ...all.filter((x) => x.id !== item.id && x.category !== item.category)].slice(0, 3);
  return <ItemDetail item={item} related={related} />;
}
