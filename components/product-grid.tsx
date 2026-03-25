import Image from "next/image";
import Link from "next/link";
import type { ProductRecord } from "@/lib/types";

export function ProductGrid({ products }: { products: ProductRecord[] }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <article key={product.slug} className="product-card">
          <Image src={product.image} alt={product.name} width={700} height={700} />
          <div className="product-content">
            <p className="eyebrow">{product.category}</p>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="pill-row">
              {product.benefits.slice(0, 2).map((benefit) => (
                <span className="pill" key={benefit}>
                  {benefit}
                </span>
              ))}
            </div>
            <div className="product-meta">
              <strong>Rs. {product.price.toFixed(2)}</strong>
              <Link href={`/products/${product.slug}`} className="text-link">
                View details
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
