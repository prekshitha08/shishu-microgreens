import { model, models, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    benefits: [{ type: String, required: true }],
    price: { type: Number, required: true },
    weight: { type: String, required: true },
    image: { type: String, required: true },
    inventory: { type: Number, required: true, default: 0 },
    featured: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

export const Product = models.Product || model("Product", productSchema);
