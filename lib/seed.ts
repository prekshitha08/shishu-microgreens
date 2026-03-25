import { connectToDatabase } from "@/lib/db";
import { seedOrders, seedProducts } from "@/lib/data";
import { Order } from "@/models/order";
import { Product } from "@/models/product";

export async function ensureSeedData() {
  const connection = await connectToDatabase();

  if (!connection) {
    return false;
  }

  await Product.bulkWrite(
    seedProducts.map((product) => ({
      updateOne: {
        filter: { slug: product.slug },
        update: { $set: product },
        upsert: true
      }
    }))
  );

  const existingOrders = await Order.countDocuments();
  if (existingOrders === 0) {
    await Order.insertMany(seedOrders);
  }

  return true;
}
