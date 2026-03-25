"use client";

import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST"
    });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button type="button" className="button button-secondary" onClick={handleLogout}>
      Logout
    </button>
  );
}
