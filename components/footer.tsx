import { BrandLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <BrandLogo footer />
        <span className="footer-copy">Fresh microgreens for everyday wellness.</span>
      </div>
    </footer>
  );
}
