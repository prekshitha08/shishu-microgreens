"use client";

import { useState } from "react";

const initialState = {
  name: "",
  slug: "",
  category: "Microgreens",
  price: "",
  weight: "100g",
  inventory: "",
  image: "",
  description: "",
  benefits: "",
  featured: false
};

export function AdminProductForm() {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = event.target as HTMLInputElement;
    const { name, value } = target;
    const nextValue = target.type === "checkbox" ? target.checked : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          benefits: form.benefits
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message || "Unable to save product.");
      }

      setMessage("Product saved successfully.");
      setForm(initialState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong while saving the product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="panel admin-form" onSubmit={handleSubmit}>
      <h2>Add product</h2>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label className="form-field">
          <span>Slug</span>
          <input name="slug" value={form.slug} onChange={handleChange} required />
        </label>
        <label className="form-field">
          <span>Category</span>
          <select name="category" value={form.category} onChange={handleChange}>
            <option>Microgreens</option>
            <option>Combos</option>
            <option>Subscriptions</option>
          </select>
        </label>
        <label className="form-field">
          <span>Price</span>
          <input name="price" value={form.price} onChange={handleChange} required />
        </label>
        <label className="form-field">
          <span>Weight</span>
          <input name="weight" value={form.weight} onChange={handleChange} required />
        </label>
        <label className="form-field">
          <span>Inventory</span>
          <input name="inventory" value={form.inventory} onChange={handleChange} required />
        </label>
      </div>
      <label className="form-field">
        <span>Image URL</span>
        <input name="image" value={form.image} onChange={handleChange} required />
      </label>
      <label className="form-field">
        <span>Description</span>
        <textarea name="description" value={form.description} onChange={handleChange} rows={4} required />
      </label>
      <label className="form-field">
        <span>Benefits</span>
        <input
          name="benefits"
          value={form.benefits}
          onChange={handleChange}
          placeholder="Vitamin-rich, Fresh crunch, Daily wellness"
          required
        />
      </label>
      <label className="checkbox-field">
        <input
          type="checkbox"
          name="featured"
          checked={form.featured}
          onChange={handleChange}
        />
        <span>Show as featured product</span>
      </label>
      {message ? <p className="success-text">{message}</p> : null}
      {errorMessage ? <p className="error-text">{errorMessage}</p> : null}
      <button type="submit" className="button button-primary" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save product"}
      </button>
    </form>
  );
}
