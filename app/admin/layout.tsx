import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | ABC Tourism",
  description: "Manage clients, tour guides and packages for ABC Tourism.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return children;
}
