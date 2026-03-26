import { ShopFilters } from "@/components/shop-filters";
import { getAllProducts } from "@/lib/store";

export const metadata = {
  title: "Shop | Shishu Microgreens"
};

export const revalidate = 3600;

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Shop</p>
        <h1 className="page-title">Fresh packs, wellness mixes, and daily essentials</h1>
        <p className="page-copy">
          This starter includes category tags, pricing, inventory, and benefit
          summaries you can extend into a full catalog.
        </p>
        <ShopFilters products={products} />
      </div>
    </section>
  );
}
