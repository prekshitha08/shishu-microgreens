import { NextRequest, NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Product } from "@/models/product";

export async function POST(request: NextRequest) {
  const seeded = await ensureSeedData();
  const body = await request.json();

  if (!seeded) {
    return NextResponse.json(
      {
        message: "MongoDB is not connected yet. Add MONGODB_URI to save products."
      },
      { status: 503 }
    );
  }

  const product = await Product.create({
    name: body.name,
    slug: body.slug,
    category: body.category,
    price: Number(body.price),
    weight: body.weight,
    inventory: Number(body.inventory),
    image: body.image,
    description: body.description,
    benefits: body.benefits,
    featured: Boolean(body.featured)
  });

  return NextResponse.json(product, { status: 201 });
}
