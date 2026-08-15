import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ABC Tourism | Walk Curious, Meet Ipoh",
  description: "Self-guided audio walking tours of Ipoh, told by passionate local guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body>{children}</body></html>;
}
