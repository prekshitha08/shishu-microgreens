import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "Admin Login | Shishu Microgreens"
};

export default function AdminLoginPage() {
  return (
    <section className="section">
      <div className="container narrow">
        <AdminLoginForm />
      </div>
    </section>
  );
}
