import { NextRequest, NextResponse } from "next/server";
import { Order } from "@/models/order";
import { ensureSeedData } from "@/lib/seed";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export async function POST(request: NextRequest) {
  try {
    const seeded = await ensureSeedData();
    const body = await request.json();

    const isValid = verifyRazorpaySignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature
    });

    if (!isValid) {
      return NextResponse.json({ message: "Payment signature verification failed." }, { status: 400 });
    }

    if (!seeded) {
      return NextResponse.json({
        ok: true,
        verified: true,
        message: "Payment verified, but MongoDB is not connected to save the order."
      });
    }

    const order = await Order.create({
      customerName: body.customerName,
      email: body.email,
      phone: body.phone,
      address: body.address,
      items: body.items,
      total: body.total,
      status: "confirmed",
      orderNumber: `ORD-${Date.now()}`
    });

    return NextResponse.json({
      ok: true,
      verified: true,
      orderNumber: order.orderNumber
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to verify Razorpay payment."
      },
      { status: 500 }
    );
  }
}
