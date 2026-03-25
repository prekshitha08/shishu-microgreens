"use client";

import { useEffect, useState } from "react";

type AdminProduct = {
  name: string;
  slug: string;
  category: string;
  description: string;
  benefits: string[];
  price: number;
  weight: string;
  image: string;
  inventory: number;
  featured: boolean;
};

export function AdminProductsPanel() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<AdminProduct | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const payload = (await response.json()) as AdminProduct[] | { message?: string };

        if (!response.ok) {
          throw new Error(
            "message" in payload ? payload.message || "Unable to load products." : "Unable to load products."
          );
        }

        setProducts(payload as AdminProduct[]);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Unable to load products.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/products/${slug}`, {
        method: "DELETE"
      });

      const payload = (await response.json()) as { message?: string; ok?: boolean };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to delete product.");
      }

      setProducts((current) => current.filter((product) => product.slug !== slug));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to delete product.");
    }
  };

  const startEditing = (product: AdminProduct) => {
    setEditingSlug(product.slug);
    setEditForm(product);
    setErrorMessage("");
  };

  const cancelEditing = () => {
    setEditingSlug(null);
    setEditForm(null);
  };

  const handleEditChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!editForm) {
      return;
    }

    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    const nextValue =
      target.type === "checkbox" ? target.checked : value;

    setEditForm((current) =>
      current
        ? {
            ...current,
            [name]: nextValue
          }
        : current
    );
  };

  const handleSave = async () => {
    if (!editForm) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${editForm.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...editForm,
          price: Number(editForm.price),
          inventory: Number(editForm.inventory),
          benefits: editForm.benefits
        })
      });

      const payload = (await response.json()) as AdminProduct | { message?: string };

      if (!response.ok) {
        throw new Error(
          "message" in payload ? payload.message || "Unable to update product." : "Unable to update product."
        );
      }

      setProducts((current) =>
        current.map((product) =>
          product.slug === editForm.slug ? (payload as AdminProduct) : product
        )
      );
      cancelEditing();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update product.");
    }
  };

  if (isLoading) {
    return <section className="panel">Loading products...</section>;
  }

  if (errorMessage) {
    return <section className="panel error-text">{errorMessage}</section>;
  }

  return (
    <section className="panel">
      <h2>Product management</h2>
      <div className="admin-products">
        {products.map((product) => (
          <article key={product.slug} className="product-admin-card">
            {editingSlug === product.slug && editForm ? (
              <div className="admin-edit-grid">
                <div className="product-admin-head">
                  <strong>Edit product</strong>
                  <span className="status-badge status-confirmed">{product.slug}</span>
                </div>
                <div className="form-grid">
                  <label className="form-field">
                    <span>Name</span>
                    <input name="name" value={editForm.name} onChange={handleEditChange} />
                  </label>
                  <label className="form-field">
                    <span>Category</span>
                    <input name="category" value={editForm.category} onChange={handleEditChange} />
                  </label>
                  <label className="form-field">
                    <span>Price</span>
                    <input name="price" type="number" value={editForm.price} onChange={handleEditChange} />
                  </label>
                  <label className="form-field">
                    <span>Inventory</span>
                    <input
                      name="inventory"
                      type="number"
                      value={editForm.inventory}
                      onChange={handleEditChange}
                    />
                  </label>
                  <label className="form-field">
                    <span>Weight</span>
                    <input name="weight" value={editForm.weight} onChange={handleEditChange} />
                  </label>
                  <label className="form-field">
                    <span>Image URL</span>
                    <input name="image" value={editForm.image} onChange={handleEditChange} />
                  </label>
                </div>
                <label className="form-field">
                  <span>Description</span>
                  <textarea
                    name="description"
                    rows={4}
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                </label>
                <label className="form-field">
                  <span>Benefits</span>
                  <input
                    name="benefits"
                    value={editForm.benefits.join(", ")}
                    onChange={(event) =>
                      setEditForm((current) =>
                        current
                          ? {
                              ...current,
                              benefits: event.target.value
                                .split(",")
                                .map((item) => item.trim())
                                .filter(Boolean)
                            }
                          : current
                      )
                    }
                  />
                </label>
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={editForm.featured}
                    onChange={handleEditChange}
                  />
                  <span>Featured product</span>
                </label>
                <div className="hero-actions">
                  <button type="button" className="button button-primary" onClick={handleSave}>
                    Save changes
                  </button>
                  <button type="button" className="button button-secondary" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="product-admin-head">
                  <div>
                    <strong>{product.name}</strong>
                    <p className="page-copy">{product.category}</p>
                  </div>
                  <span className="status-badge status-confirmed">
                    Rs. {product.price.toFixed(2)}
                  </span>
                </div>
                <p className="page-copy">{product.description}</p>
                <div className="pill-row">
                  {product.benefits.map((benefit) => (
                    <span key={benefit} className="pill">
                      {benefit}
                    </span>
                  ))}
                </div>
                <div className="summary-row">
                  <span>Weight: {product.weight}</span>
                  <span>Inventory: {product.inventory}</span>
                </div>
                <div className="hero-actions">
                  <button
                    type="button"
                    className="button button-primary"
                    onClick={() => startEditing(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() => handleDelete(product.slug)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
