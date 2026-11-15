import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/mockData";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
