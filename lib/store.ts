import { seedOrders, seedProducts } from "@/lib/data";
import { ensureSeedData } from "@/lib/seed";
import { Order } from "@/models/order";
import { Product } from "@/models/product";
import type { ProductRecord } from "@/lib/types";

function normalizeProduct(product: ProductRecord & { _id?: unknown }): ProductRecord {
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    description: product.description,
    benefits: product.benefits,
    price: product.price,
    weight: product.weight,
    image: product.image,
    inventory: product.inventory,
    featured: product.featured
  };
}

export async function getAllProducts() {
  const seeded = await ensureSeedData();
  if (!seeded) {
    return seedProducts;
  }

  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return products.map((product) => normalizeProduct(product as ProductRecord));
}

export async function getFeaturedProducts() {
  const products = await getAllProducts();
  return products.filter((product) => product.featured).slice(0, 3);
}

export async function getProductBySlug(slug: string) {
  const seeded = await ensureSeedData();
  if (!seeded) {
    return seedProducts.find((product) => product.slug === slug) ?? null;
  }

  const product = await Product.findOne({ slug }).lean();
  return product ? normalizeProduct(product as ProductRecord) : null;
}

export async function getRelatedProducts(slug: string, category: string) {
  const products = await getAllProducts();
  return products
    .filter((product) => product.slug !== slug && product.category === category)
    .slice(0, 3);
}

export async function getAdminDashboardData() {
  const seeded = await ensureSeedData();
  if (!seeded) {
    return {
      productCount: seedProducts.length,
      lowStockCount: seedProducts.filter((product) => product.inventory < 10).length,
      pendingOrders: seedOrders.filter((order) => order.status === "pending").length,
      products: seedProducts.slice(0, 4),
      orders: seedOrders
    };
  }

  const [products, orders, productCount, lowStockCount, pendingOrders] =
    await Promise.all([
      Product.find().sort({ createdAt: -1 }).limit(4).lean(),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Product.countDocuments(),
      Product.countDocuments({ inventory: { $lt: 10 } }),
      Order.countDocuments({ status: "pending" })
    ]);

  return {
    productCount,
    lowStockCount,
    pendingOrders,
    products: products.map((product) => normalizeProduct(product as ProductRecord)),
    orders
  };
}
