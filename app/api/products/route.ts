import { NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Product } from "@/models/product";
import { seedProducts } from "@/lib/data";

export async function GET() {
  const seeded = await ensureSeedData();
  if (!seeded) {
    return NextResponse.json(seedProducts);
  }

  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(products);
}
