import { NextRequest, NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount." }, { status: 400 });
    }

    const order = await createRazorpayOrder({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        customerName: body.customerName || "",
        phone: body.phone || ""
      }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to create Razorpay order."
      },
      { status: 500 }
    );
  }
}
