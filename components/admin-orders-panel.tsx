"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  productName: string;
  quantity: number;
  price: number;
};

type AdminOrder = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "dispatched" | "delivered";
};

const statusOptions: AdminOrder["status"][] = [
  "pending",
  "confirmed",
  "dispatched",
  "delivered"
];

export function AdminOrdersPanel() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/admin/orders");
        const payload = (await response.json()) as AdminOrder[] | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in payload ? payload.message || "Unable to load orders." : "Unable to load orders."
          );
        }

        setOrders(payload as AdminOrder[]);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unable to load orders.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadOrders();
  }, []);

  const handleStatusChange = async (orderNumber: string, status: AdminOrder["status"]) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status })
      });

      const payload = (await response.json()) as AdminOrder | { message?: string };

      if (!response.ok) {
        throw new Error(
          "message" in payload ? payload.message || "Unable to update order." : "Unable to update order."
        );
      }

      setOrders((current) =>
        current.map((order) =>
          order.orderNumber === orderNumber ? (payload as AdminOrder) : order
        )
      );
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update order.");
    }
  };

  if (isLoading) {
    return <section className="panel">Loading orders...</section>;
  }

  if (errorMessage) {
    return <section className="panel error-text">{errorMessage}</section>;
  }

  return (
    <section className="panel">
      <h2>All orders</h2>
      <div className="admin-orders">
        {orders.map((order) => (
          <article key={order.orderNumber} className="order-card">
            <div className="order-card-head">
              <div>
                <strong>{order.orderNumber}</strong>
                <p className="page-copy">
                  {order.customerName} | {order.phone}
                </p>
              </div>
              <span className={`status-badge status-${order.status}`}>{order.status}</span>
            </div>
            <p className="page-copy">{order.email}</p>
            <p className="page-copy">{order.address}</p>
            <div className="stack">
              {order.items.map((item, index) => (
                <div key={`${order.orderNumber}-${index}`} className="summary-row">
                  <span>
                    {item.productName} x {item.quantity}
                  </span>
                  <strong>Rs. {(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>Rs. {order.total.toFixed(2)}</strong>
            </div>
            <label className="form-field">
              <span>Update status</span>
              <select
                value={order.status}
                onChange={(event) =>
                  handleStatusChange(order.orderNumber, event.target.value as AdminOrder["status"])
                }
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
          </article>
        ))}
      </div>
    </section>
  );
}
