import { NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Product } from "@/models/product";
import { Order } from "@/models/order";

export async function GET() {
  const seeded = await ensureSeedData();

  if (!seeded) {
    return NextResponse.json(
      {
        ok: false,
        message: "MongoDB is not connected. Check MONGODB_URI in .env.local."
      },
      { status: 503 }
    );
  }

  const [productCount, orderCount, sampleProducts] = await Promise.all([
    Product.countDocuments(),
    Order.countDocuments(),
    Product.find().select("name slug price").sort({ createdAt: -1 }).limit(6).lean()
  ]);

  return NextResponse.json({
    ok: true,
    database: "shishu-microgreens",
    collections: {
      products: productCount,
      orders: orderCount
    },
    sampleProducts
  });
}
