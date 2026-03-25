"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import type { ProductRecord } from "@/lib/types";

type CartItem = Pick<ProductRecord, "slug" | "name" | "price"> & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (product: ProductRecord) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = window.localStorage.getItem("cart-items");
    if (raw) {
      setItems(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const addItem = (product: ProductRecord) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug);
      if (existing) {
        return current.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ];
    });
  };

  const removeItem = (slug: string) => {
    setItems((current) => current.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (!Number.isFinite(quantity) || quantity < 1) {
      removeItem(slug);
      return;
    }

    setItems((current) =>
      current.map((item) => (item.slug === slug ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
