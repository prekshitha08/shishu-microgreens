import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  const seeded = await ensureSeedData();
  const body = await request.json();

  if (!seeded) {
    return NextResponse.json(
      {
        message: "MongoDB is not connected yet. Add MONGODB_URI to persist orders."
      },
      { status: 503 }
    );
  }

  const order = await Order.create({
    customerName: body.customerName,
    email: body.email,
    phone: body.phone,
    address: body.address,
    items: body.items,
    total: body.total,
    status: "pending",
    orderNumber: `ORD-${Date.now()}`
  });

  return NextResponse.json(order, { status: 201 });
}
