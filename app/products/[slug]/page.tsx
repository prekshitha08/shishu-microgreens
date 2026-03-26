import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductPurchasePanel } from "@/components/product-purchase-panel";
import { seedProducts } from "@/lib/data";
import { getProductBySlug, getRelatedProducts } from "@/lib/store";

type Props = {
  params: { slug: string };
};

export const revalidate = 3600;

export function generateStaticParams() {
  return seedProducts.map((product) => ({
    slug: product.slug
  }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.slug, product.category);

  return (
    <>
      <section className="section">
        <div className="container product-layout">
          <div className="product-image-wrap">
            <Image
              src={product.image}
              alt={product.name}
              className="product-image"
              width={900}
              height={900}
            />
            <div className="delivery-card">
              <h3>Delivery details</h3>
              <p>Freshly harvested and packed for local delivery.</p>
              <ul className="detail-list">
                <li>Dispatch window: Within 24 hours</li>
                <li>Storage: Refrigerate immediately after delivery</li>
                <li>Best consumed: Within 2 to 4 days</li>
              </ul>
            </div>
          </div>
          <div className="product-details">
            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>
            <p className="price">Rs. {product.price.toFixed(2)}</p>
            <p className="page-copy">{product.description}</p>
            <div className="pill-row">
              {product.benefits.map((benefit) => (
                <span key={benefit} className="pill">
                  {benefit}
                </span>
              ))}
            </div>
            <ul className="detail-list">
              <li>Weight: {product.weight}</li>
              <li>Inventory: {product.inventory} packs available</li>
              <li>Freshness: Harvested within 24 hours of dispatch</li>
              <li>Storage: Keep refrigerated and consume fresh for best taste</li>
            </ul>
            <ProductPurchasePanel product={product} />
            <div className="product-info-panels">
              <div className="info-panel">
                <h3>Best for</h3>
                <p>Salads, sandwiches, wraps, grain bowls, soups, and premium garnishing.</p>
              </div>
              <div className="info-panel">
                <h3>Why choose it</h3>
                <p>
                  Freshly packed Shishu Microgreens products are designed for daily
                  wellness, bold flavor, and easy healthy meals.
                </p>
              </div>
            </div>
            <div className="nutrition-panel">
              <h3>Nutrition highlights</h3>
              <div className="nutrition-grid">
                <div className="nutrition-item">
                  <strong>Fresh</strong>
                  <span>Harvested for short delivery cycles</span>
                </div>
                <div className="nutrition-item">
                  <strong>Rich</strong>
                  <span>Dense in flavor and everyday nutrients</span>
                </div>
                <div className="nutrition-item">
                  <strong>Clean</strong>
                  <span>Easy to add to meals with minimal prep</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="section section-muted">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Related products</p>
                <h2>More from Shishu Microgreens</h2>
              </div>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      ) : null}
    </>
  );
}
