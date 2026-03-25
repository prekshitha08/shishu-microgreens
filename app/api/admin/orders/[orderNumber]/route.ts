import { NextRequest, NextResponse } from "next/server";
import { ensureSeedData } from "@/lib/seed";
import { Order } from "@/models/order";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const seeded = await ensureSeedData();
  const { orderNumber } = await params;
  const body = await request.json();

  if (!seeded) {
    return NextResponse.json(
      { message: "MongoDB is not connected. Order status cannot be updated." },
      { status: 503 }
    );
  }

  const allowedStatuses = ["pending", "confirmed", "dispatched", "delivered"];
  if (!allowedStatuses.includes(body.status)) {
    return NextResponse.json({ message: "Invalid order status." }, { status: 400 });
  }

  const order = await Order.findOneAndUpdate(
    { orderNumber },
    { $set: { status: body.status } },
    { new: true }
  ).lean();

  if (!order) {
    return NextResponse.json({ message: "Order not found." }, { status: 404 });
  }

  return NextResponse.json(order);
}
