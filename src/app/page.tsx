import { redirect } from "next/navigation";

export default function HomePage() {
  // Root entry of your system
  // Always send user to admin login
  redirect("/admin/login");
}