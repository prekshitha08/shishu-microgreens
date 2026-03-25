import Link from "next/link";
import { AdminProductForm } from "@/components/admin-product-form";
import { AdminProductsPanel } from "@/components/admin-products-panel";
import { AdminLogoutButton } from "@/components/admin-logout-button";
import { getAdminDashboardData } from "@/lib/store";

export default async function AdminPage() {
  const data = await getAdminDashboardData();

  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Admin</p>
        <div className="section-heading">
          <h1 className="page-title">Store dashboard</h1>
          <div className="hero-actions">
            <Link href="/admin/orders" className="button button-secondary">
              Manage orders
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
        <div className="stats-grid">
          <article className="stat-card">
            <span>Products</span>
            <strong>{data.productCount}</strong>
          </article>
          <article className="stat-card">
            <span>Low stock items</span>
            <strong>{data.lowStockCount}</strong>
          </article>
          <article className="stat-card">
            <span>Pending orders</span>
            <strong>{data.pendingOrders}</strong>
          </article>
        </div>

        <div className="admin-grid">
          <section className="panel">
            <h2>Recent products</h2>
            <ul className="admin-list">
              {data.products.map((product) => (
                <li key={product.slug}>
                  <span>{product.name}</span>
                  <span>Rs. {product.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <h2>Latest orders</h2>
            <ul className="admin-list">
              {data.orders.map((order) => (
                <li key={order.orderNumber}>
                  <span>{order.orderNumber}</span>
                  <span>{order.status}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="admin-form-wrap">
          <AdminProductForm />
        </div>
        <div className="admin-form-wrap">
          <AdminProductsPanel />
        </div>
        <section className="panel admin-form-wrap">
          <h2>Current pricing reference</h2>
          <div className="price-list compact-price-list">
            <article className="price-item">
              <span>Sunflower</span>
              <strong>Rs. 60</strong>
            </article>
            <article className="price-item">
              <span>Yellow Mustard</span>
              <strong>Rs. 149</strong>
            </article>
            <article className="price-item">
              <span>Pink Radish</span>
              <strong>Rs. 135</strong>
            </article>
            <article className="price-item">
              <span>White Radish</span>
              <strong>Rs. 135</strong>
            </article>
            <article className="price-item">
              <span>Amaranthus</span>
              <strong>Rs. 200</strong>
            </article>
            <article className="price-item">
              <span>Pea Shoots</span>
              <strong>Rs. 90</strong>
            </article>
          </div>
        </section>
      </div>
    </section>
  );
}
