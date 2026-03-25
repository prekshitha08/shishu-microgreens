import { NextRequest, NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Product } from "@/models/product";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const seeded = await ensureSeedData();
  const { slug } = await params;
  const body = await request.json();

  if (!seeded) {
    return NextResponse.json(
      { message: "MongoDB is not connected. Product cannot be updated." },
      { status: 503 }
    );
  }

  const update = {
    ...(body.name ? { name: body.name } : {}),
    ...(body.category ? { category: body.category } : {}),
    ...(body.description ? { description: body.description } : {}),
    ...(body.price !== undefined ? { price: Number(body.price) } : {}),
    ...(body.weight ? { weight: body.weight } : {}),
    ...(body.inventory !== undefined ? { inventory: Number(body.inventory) } : {}),
    ...(body.image ? { image: body.image } : {}),
    ...(body.benefits ? { benefits: body.benefits } : {}),
    ...(body.featured !== undefined ? { featured: Boolean(body.featured) } : {})
  };

  const product = await Product.findOneAndUpdate({ slug }, { $set: update }, { new: true }).lean();

  if (!product) {
    return NextResponse.json({ message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const seeded = await ensureSeedData();
  const { slug } = await params;

  if (!seeded) {
    return NextResponse.json(
      { message: "MongoDB is not connected. Product cannot be deleted." },
      { status: 503 }
    );
  }

  const product = await Product.findOneAndDelete({ slug }).lean();

  if (!product) {
    return NextResponse.json({ message: "Product not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, slug });
}
