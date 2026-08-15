import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { logout } from "@/app/login/actions";
import styles from "./dashboard.module.css";

export const metadata: Metadata = {
  title: "Monitoring System | ABC Tourism",
  description: "Live booking, traffic and vendor incident monitoring for ABC Tourism, Ipoh Old Town.",
  robots: { index: false, follow: false },
};

const kpis = [
  { label: "Bookings", value: "4,812", delta: "up", deltaText: "↑ 12.4% vs. July", desc: "Total tours purchased this month, all trails combined.", accent: "var(--blue)" },
  { label: "Audio Tour Completion %", value: "81%", delta: "up", deltaText: "↑ 3.1 pts", desc: "Share of started tours finished end to end.", accent: "var(--blue)" },
  { label: "Average Tour Order Value", value: "RM 38.60", delta: "down", deltaText: "↓ 1.8%", desc: "Average revenue per booking, add-ons included.", accent: "var(--red)" },
  { label: "Fast Pass Redemption %", value: "64%", delta: "up", deltaText: "↑ 6.0 pts", desc: "Of passes bundled, share actually redeemed at the vendor.", accent: "var(--red)" },
];

const trafficBars = [
  { hr: 7, height: 10, peak: false },
  { hr: 8, height: 82, peak: true },
  { hr: 9, height: 94, peak: true },
  { hr: 10, height: 70, peak: true },
  { hr: 11, height: 38, peak: false },
  { hr: 12, height: 30, peak: false },
  { hr: 13, height: 26, peak: false },
  { hr: 14, height: 22, peak: false },
  { hr: 15, height: 34, peak: false },
  { hr: 16, height: 76, peak: true },
  { hr: 17, height: 98, peak: true },
  { hr: 18, height: 88, peak: true },
  { hr: 19, height: 42, peak: false },
  { hr: 20, height: 18, peak: false },
];

const distribution = [
  { name: "Birch Tower Heritage Walk", pct: 34 },
  { name: "Concubine Lane Circuit", pct: 27 },
  { name: "Kong Heng Square Loop", pct: 18 },
  { name: "Railway Station Trail", pct: 13 },
  { name: "Tambun Cave Trail", pct: 8 },
];

const incidents = [
  { vendor: "Sin Yoon Loong", trail: "Birch Tower Heritage Walk", issue: "Fast pass not honoured", status: "watch", statusText: "Investigating" },
  { vendor: "Kong Heng Square Stalls", trail: "Kong Heng Square Loop", issue: "Stall closed early", status: "watch", statusText: "Investigating" },
  { vendor: "Thean Chun", trail: "Concubine Lane Circuit", issue: "Booking mismatch", status: "ok", statusText: "Resolved" },
  { vendor: "Foh San Dim Sum", trail: "Railway Station Trail", issue: "Overbooked slot", status: "ok", statusText: "Resolved" },
];

export default function DashboardPage() {
  return (
    <>
      <header className="header">
        <Link className="logo" href="/" aria-label="ABC Tourism home">
          <Image src="/images/abc-tourism-logo.png" alt="ABC Tourism" width={640} height={430} priority />
        </Link>
        <nav aria-label="Dashboard navigation">
          <Link href="/">Site</Link>
          <Link href="/admin">Admin</Link>
          <form className={styles.navLogoutForm} action={logout}>
            <button type="submit" className={styles.navLogout}>Log out</button>
          </form>
        </nav>
        <Link className="button buttonSmall" href="/admin">Admin panel <span>↗</span></Link>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <div>
            <p className="eyebrow"><span /> Internal · Operations</p>
            <h1>Monitoring <em>system.</em></h1>
            <p>Live bookings, foot traffic and vendor incidents across ABC Tourism, Ipoh Old Town.</p>
          </div>
          <div className={styles.introMeta}>
            <div className={styles.loc}>Ipoh Old Town · Perak</div>
            <div className={styles.rangePill}>1–31 Aug 2026</div>
          </div>
        </section>

        <div className={styles.statGrid}>
          {kpis.map((k) => (
            <div className={styles.kpiCard} key={k.label} style={{ "--kpi-accent": k.accent } as CSSProperties}>
              <div className={styles.kpiLabel}>{k.label}</div>
              <div className={styles.kpiValue}>{k.value}</div>
              <div className={`${styles.kpiDelta} ${styles[k.delta]}`}>{k.deltaText}</div>
              <div className={styles.kpiDesc}>{k.desc}</div>
            </div>
          ))}
        </div>

        <div className={styles.panelRow}>
          <div className={styles.panel}>
            <h2>On &amp; Off-Peak Traffic</h2>
            <div className={styles.pSub}>Old Town foot traffic by hour, averaged across the month</div>
            <div className={styles.bars}>
              {trafficBars.map((b) => (
                <div className={`${styles.col} ${b.peak ? styles.peak : ""}`} key={b.hr}>
                  <div className={styles.bar} style={{ height: `${b.height}%` }}></div>
                  <span className={styles.hr}>{b.hr}</span>
                </div>
              ))}
            </div>
            <div className={styles.legend}>
              <span><span className={`${styles.dot} ${styles.off}`}></span>Off-peak</span>
              <span><span className={`${styles.dot} ${styles.on}`}></span>Peak (kopitiam breakfast, Concubine Lane evening)</span>
            </div>
            <div className={styles.peakNote}>Morning peak tracks the breakfast rush at Sin Yoon Loong and Thean Chun; evening peak is Concubine Lane and Kong Heng Square filling up.</div>
          </div>

          <div className={styles.panel}>
            <h2>Visitor Distribution</h2>
            <div className={styles.pSub}>Share of active tours, by trail</div>
            {distribution.map((d) => (
              <div className={styles.distRow} key={d.name}>
                <div className={styles.dName}>{d.name}</div>
                <div className={styles.dTrack}><div className={styles.dFill} style={{ width: `${d.pct}%` }}></div></div>
                <div className={styles.dPct}>{d.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.incidentPanel}>
          <div className={styles.incidentTop}>
            <div>
              <div className={styles.iNum}>0.9%</div>
              <div className={styles.iLabel}>Vendor Incident Rate — share of bookings where the traveller reported a problem with a partner vendor. Ideally low; this is a partner trust signal.</div>
            </div>
            <div className={styles.incidentTag}>2 open this week</div>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Vendor</th><th>Trail</th><th>Reported issue</th><th>Status</th></tr></thead>
              <tbody>
                {incidents.map((row) => (
                  <tr key={row.vendor}>
                    <td className={styles.vname}>{row.vendor}</td>
                    <td>{row.trail}</td>
                    <td>{row.issue}</td>
                    <td>
                      <span className={`${styles.pill} ${row.status === "ok" ? styles.pillPositive : styles.pillNegative}`}>
                        {row.statusText}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <footer className={styles.pageFooter}>ABC TOURISM · IPOH OLD TOWN · DATA REFRESHED EVERY 15 MIN</footer>
      </main>
    </>
  );
}
