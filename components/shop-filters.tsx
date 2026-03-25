"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/product-grid";
import type { ProductRecord } from "@/lib/types";

export function ShopFilters({ products }: { products: ProductRecord[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="shop-layout">
      <div className="filter-bar" aria-label="Product category filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-chip ${selectedCategory === category ? "filter-chip-active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <ProductGrid products={filteredProducts} />
    </div>
  );
}
