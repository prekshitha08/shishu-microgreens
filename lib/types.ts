export type ProductRecord = {
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

export type OrderRecord = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "confirmed" | "dispatched" | "delivered";
};
