import Link from "next/link";

const whatsappMessage = encodeURIComponent(
  "Hello Shishu Microgreens, I would like to know more about your products and place an order."
);

export function WhatsAppButton() {
  return (
    <Link
      href={`https://wa.me/919999999999?text=${whatsappMessage}`}
      className="button whatsapp-button"
      target="_blank"
      rel="noreferrer"
    >
      Order on WhatsApp
    </Link>
  );
}
