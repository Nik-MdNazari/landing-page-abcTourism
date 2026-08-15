import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "../ScrollReveal";
import Screens from "./Screens";
import styles from "./how-it-works.module.css";

export const metadata: Metadata = {
  title: "See How It Works | Dengarlah",
  description: "A closer look at Dengarlah — the actual screens from a self-guided audio walk, and how the built-in AI tour guide detects, narrates and answers along the way.",
};

export default function HowItWorksPage() {
  return (
    <>
      <ScrollReveal />
      <a className="skip" href="#main">Skip to content</a>
      <header className="header">
        <Link className="logo" href="/" aria-label="Dengarlah home">Dengarlah</Link>
        <nav aria-label="Primary navigation">
          <Link href="/#discover">Discover Ipoh</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#locals">Local voices</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="buttonSmall" href="/#download">Get the app <span>↗</span></Link>
      </header>

      <main id="main">
        <section className={`section ${styles.intro}`}>
          <h1 data-reveal>Every stop,<br /><em>narrated for you.</em></h1>
          <p className={styles.introCopy} data-reveal>These are the actual screens from Dengarlah &mdash; self-guided audio tours with a built-in AI tour guide, shown here on the Ipoh Old Town Heritage Walk.</p>
        </section>

        <Screens />

        <section className={`section ${styles.closing}`}>
          <p className="eyebrow light" data-reveal style={{ justifyContent: "center" }}><span /> Ready when you are</p>
          <h2 data-reveal>Your own walk through<br /><em>Ipoh is waiting.</em></h2>
          <p data-reveal>No groups, no rush &mdash; just a route, a pair of earbuds, and a guide that answers only when you ask.</p>
          <div className={styles.closingActions} data-reveal>
            <Link className="button" href="/plan/start">Start your planning&hellip; <span>→</span></Link>
            <Link className="textLink" href="/#download"><b>↗</b> Get the app</Link>
          </div>
        </section>
      </main>

      <footer>
        <div className="footerTop">
          <div><span className="logo">Dengarlah</span><p>Self-guided stories for people who&rsquo;d rather listen than talk.</p></div>
          <div><b>Explore</b><Link href="/#discover">Discover Ipoh</Link><Link href="/#how">How it works</Link><Link href="/#locals">Local voices</Link></div>
          <div><b>Say hello</b><a href="mailto:hello@dengarlah.app">Email us</a><a href="#">Instagram</a><a href="#">Facebook</a></div>
        </div>
        <div className="footerBottom"><span>© 2026 ABC Dengarlah</span><span>Made quietly in Ipoh, Perak</span></div>
      </footer>
    </>
  );
}
