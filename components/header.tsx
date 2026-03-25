import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { CartSummary } from "@/components/cart-summary";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandLogo />
        <nav className="nav" aria-label="Main navigation">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <CartSummary />
      </div>
    </header>
  );
}
