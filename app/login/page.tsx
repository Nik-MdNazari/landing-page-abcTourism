import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./LoginForm";
import styles from "./login.module.css";

export const metadata: Metadata = {
  title: "Sign in | ABC Tourism",
  description: "Sign in to the ABC Tourism admin panel.",
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const fromRaw = params.from;
  const from = (Array.isArray(fromRaw) ? fromRaw[0] : fromRaw) || "/admin";

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <Image src="/images/abc-tourism-logo.png" alt="ABC Tourism" width={640} height={430} className={styles.logo} priority />
        <p className="eyebrow"><span /> Internal · Operations</p>
        <h1>Welcome <em>back.</em></h1>
        <p className={styles.sub}>Sign in to manage clients, tour guides and packages.</p>
        <LoginForm from={from} />
        <p className={styles.hint}>Demo access — admin@abctourism.my / ipoh2026</p>
      </div>
    </main>
  );
}
