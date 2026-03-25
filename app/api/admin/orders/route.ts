import { NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Order } from "@/models/order";
import { seedOrders } from "@/lib/data";

export async function GET() {
  const seeded = await ensureSeedData();

  if (!seeded) {
    return NextResponse.json(seedOrders);
  }

  const orders = await Order.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(orders);
}
