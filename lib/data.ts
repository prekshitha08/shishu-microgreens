import type { OrderRecord, ProductRecord } from "@/lib/types";

export const seedProducts: ProductRecord[] = [
  {
    name: "Sunflower",
    slug: "sunflower",
    category: "Microgreens",
    description: "Fresh sunflower microgreens with a mild nutty taste and satisfying crunch. Great for salads, sandwiches, wraps, and healthy breakfast bowls.",
    benefits: ["Protein support", "Crunchy texture", "Vitamin E", "Fresh flavor"],
    price: 60,
    weight: "100g",
    image: "/products/sunflower.jpg",
    inventory: 18,
    featured: true
  },
  {
    name: "Yellow Mustard",
    slug: "yellow-mustard",
    category: "Microgreens",
    description: "Peppery yellow mustard microgreens that add sharp flavor and aroma to salads, curries, sandwiches, and fusion dishes.",
    benefits: ["Bold taste", "Digestive support", "Mineral-rich", "Natural spice"],
    price: 149,
    weight: "100g",
    image: "/products/yellow-mustard.jpg",
    inventory: 11,
    featured: true
  },
  {
    name: "Pink Radish",
    slug: "pink-radish",
    category: "Microgreens",
    description: "Crisp pink radish microgreens with a bright peppery bite. Perfect for garnishing, salads, grain bowls, and premium plating.",
    benefits: ["Antioxidants", "Peppery finish", "Vitamin-rich", "Eye-catching color"],
    price: 135,
    weight: "100g",
    image: "/products/pink-radish.jpg",
    inventory: 8,
    featured: true
  },
  {
    name: "White Radish",
    slug: "white-radish",
    category: "Microgreens",
    description: "White radish microgreens deliver a clean peppery note that works beautifully in savory dishes, salads, wraps, and soups.",
    benefits: ["Fresh spice", "Daily wellness", "Nutrient-dense", "Versatile use"],
    price: 135,
    weight: "100g",
    image: "/products/white-radish.jpg",
    inventory: 14,
    featured: false
  },
  {
    name: "Amaranthus",
    slug: "amaranthus",
    category: "Microgreens",
    description: "Vibrant amaranthus microgreens with a delicate texture and rich color, ideal for gourmet salads, platters, and premium presentation.",
    benefits: ["Iron support", "Colorful plating", "Premium mix-ins", "Delicate texture"],
    price: 200,
    weight: "100g",
    image: "/products/amaranthus.jpg",
    inventory: 10,
    featured: false
  },
  {
    name: "Pea Shoots",
    slug: "pea-shoots",
    category: "Microgreens",
    description: "Tender pea shoots with a naturally sweet taste and juicy bite, perfect for stir-fries, salads, sandwiches, and healthy snacking.",
    benefits: ["Sweet profile", "Fiber", "Versatile use", "Fresh crunch"],
    price: 90,
    weight: "100g",
    image: "/products/pea-shoots.jpg",
    inventory: 20,
    featured: false
  }
];

export const seedOrders: OrderRecord[] = [
  {
    orderNumber: "ORD-1001",
    customerName: "Aanya Gupta",
    email: "aanya@example.com",
    phone: "9999999999",
    address: "Indiranagar, Bengaluru",
    total: 209,
    status: "pending",
    items: [
      {
        productName: "Yellow Mustard",
        quantity: 1,
        price: 149
      },
      {
        productName: "Sunflower",
        quantity: 1,
        price: 60
      }
    ]
  },
  {
    orderNumber: "ORD-1002",
    customerName: "Kabir Sharma",
    email: "kabir@example.com",
    phone: "8888888888",
    address: "Kondapur, Hyderabad",
    total: 200,
    status: "confirmed",
    items: [
      {
        productName: "Amaranthus",
        quantity: 1,
        price: 200
      }
    ]
  }
];
