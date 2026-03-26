import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getFeaturedProducts } from "@/lib/store";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Freshly harvested wellness</p>
            <h1>Shishu Microgreens brings power in every leaf.</h1>
            <p className="hero-copy">
              Explore fresh sunflower, radish, mustard, amaranthus, and pea
              shoots with a clean local-delivery shopping experience.
            </p>
            <div className="hero-actions">
              <Link href="/shop" className="button button-primary">
                Shop collection
              </Link>
              <WhatsAppButton />
              <Link href="/admin" className="button button-secondary">
                View admin
              </Link>
            </div>
          </div>
          <div className="hero-card">
            <span>Weekly bestseller</span>
            <strong>Kids Vitality Mix</strong>
            <p>Broccoli, sunflower, pea shoots, and amaranth in one easy pack.</p>
            <div className="hero-stat-row">
              <div>
                <strong>24 hrs</strong>
                <span>Harvest window</span>
              </div>
              <div>
                <strong>6</strong>
                <span>Service zones</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Avg. rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <div>
            <p className="eyebrow">Featured collection</p>
            <h2>Curated mixes for daily nutrition goals</h2>
          </div>
          <Link href="/shop" className="text-link">
            Browse all products
          </Link>
        </div>
        <div className="container">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="section section-muted">
        <div className="container features-grid">
          <article className="feature-card">
            <h3>Pincode-based delivery</h3>
            <p>Support local delivery slots, pickup, and freshness cut-off logic.</p>
          </article>
          <article className="feature-card">
            <h3>MongoDB-ready catalog</h3>
            <p>Flexible product schema for nutrition benefits, variants, and bundles.</p>
          </article>
          <article className="feature-card">
            <h3>Admin workflows</h3>
            <p>Manage products, stock, coupons, and orders from a single dashboard.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Price list</p>
              <h2>Current Shishu Microgreens pricing</h2>
            </div>
          </div>
          <div className="price-list">
            <article className="price-item">
              <span>Sunflower</span>
              <strong>Rs. 60</strong>
            </article>
            <article className="price-item">
              <span>Yellow Mustard</span>
              <strong>Rs. 149</strong>
            </article>
            <article className="price-item">
              <span>Pink Radish</span>
              <strong>Rs. 135</strong>
            </article>
            <article className="price-item">
              <span>White Radish</span>
              <strong>Rs. 135</strong>
            </article>
            <article className="price-item">
              <span>Amaranthus</span>
              <strong>Rs. 200</strong>
            </article>
            <article className="price-item">
              <span>Pea Shoots</span>
              <strong>Rs. 90</strong>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="panel centered-panel">
            <p className="eyebrow">Contact</p>
            <h2>Need help choosing the right microgreens?</h2>
            <p className="page-copy">
              Reach Shishu Microgreens directly on WhatsApp for orders, availability,
              delivery questions, and custom requirements.
            </p>
            <div className="hero-actions contact-actions">
              <WhatsAppButton />
              <Link href="/shop" className="button button-secondary">
                Browse products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
