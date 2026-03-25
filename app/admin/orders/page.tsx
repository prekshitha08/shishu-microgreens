import Link from "next/link";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { AdminOrdersPanel } from "@/components/admin-orders-panel";

export const metadata = {
  title: "Admin Orders | Shishu Microgreens"
};

export default function AdminOrdersPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Admin orders</p>
            <h1 className="page-title">Order management</h1>
          </div>
          <div className="hero-actions">
            <Link href="/admin" className="button button-secondary">
              Dashboard
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        <AdminOrdersPanel />
      </div>
    </section>
  );
}
