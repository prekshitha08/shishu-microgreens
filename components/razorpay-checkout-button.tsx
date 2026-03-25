"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

type Props = {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  disabled?: boolean;
  onSuccess?: () => void;
};

async function loadCheckoutScript() {
  if (window.Razorpay) {
    return true;
  }

  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function RazorpayCheckoutButton(props: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const scriptLoaded = await loadCheckoutScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error("Razorpay checkout script failed to load.");
      }

      const orderResponse = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Math.round(props.total * 100),
          customerName: props.customerName,
          phone: props.phone
        })
      });

      const orderPayload = (await orderResponse.json()) as {
        orderId?: string;
        amount?: number;
        currency?: string;
        key?: string;
        message?: string;
      };

      if (!orderResponse.ok || !orderPayload.orderId || !orderPayload.key) {
        throw new Error(orderPayload.message || "Could not create Razorpay order.");
      }

      const razorpay = new window.Razorpay({
        key: orderPayload.key,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "Shishu Microgreens",
        description: "Fresh microgreens order",
        image: "/logo.svg",
        order_id: orderPayload.orderId,
        prefill: {
          name: props.customerName,
          email: props.email,
          contact: props.phone
        },
        theme: {
          color: "#2f8f46"
        },
        handler: async (response: Record<string, string>) => {
          const verifyResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...response,
              customerName: props.customerName,
              email: props.email,
              phone: props.phone,
              address: props.address,
              items: props.items,
              total: props.total
            })
          });

          const verifyPayload = (await verifyResponse.json()) as { message?: string };
          if (!verifyResponse.ok) {
            throw new Error(verifyPayload.message || "Payment verification failed.");
          }

          props.onSuccess?.();
          router.push("/checkout/success");
        },
        modal: {
          ondismiss: () => setIsLoading(false)
        }
      });

      razorpay.open();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong starting payment."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-action">
      <button
        type="button"
        className="button button-primary"
        onClick={handlePayment}
        disabled={props.disabled || isLoading}
      >
        {isLoading ? "Starting Razorpay..." : "Pay with Razorpay"}
      </button>
      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
    </div>
  );
}
