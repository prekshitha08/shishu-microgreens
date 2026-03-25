import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  footer?: boolean;
};

export function BrandLogo({ href = "/", footer = false }: BrandLogoProps) {
  const logo = (
    <div className={`brand-logo-wrap ${footer ? "brand-logo-wrap-footer" : ""}`}>
      <Image
        src="/logo.svg"
        alt="Shishu Microgreens"
        width={footer ? 180 : 190}
        height={footer ? 180 : 190}
        className={`brand-logo ${footer ? "brand-logo-footer" : ""}`}
        priority={!footer}
      />
    </div>
  );

  return (
    <Link href={href} className="brand-link" aria-label="Shishu Microgreens home">
      {logo}
    </Link>
  );
}
