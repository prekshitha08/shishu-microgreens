import { model, models, Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true }
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [orderItemSchema],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "dispatched", "delivered"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export const Order = models.Order || model("Order", orderSchema);
