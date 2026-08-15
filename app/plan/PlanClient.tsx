"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./plan.module.css";
import { packages as basePackages, userContext, formatPrice, type Package } from "./data";

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function joinList(items: string[]) {
  if (items.length <= 2) return items.join(" & ");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

type Phase = "loading" | "result";
type Variant = "success" | "partial" | "empty";

function partialize(pkgs: Package[]): Package[] {
  const fallbackLabels = ["72% Match", "68% Match", "64% Match"];
  return pkgs.map((p, i) => ({ ...p, matchLabel: fallbackLabels[i] ?? "Close Match" }));
}

export default function PlanClient() {
  const params = useSearchParams();
  const variantParam = params.get("variant");
  const variant: Variant = variantParam === "partial" || variantParam === "empty" ? variantParam : "success";

  const interestsParam = params.get("interests");
  const companionsParam = params.get("companions");
  const budgetParam = params.get("budget");
  const stayParam = params.get("stay");
  const windowParam = params.get("window");
  const paceParam = params.get("pace");
  const nameParam = params.get("name");

  const resolvedContext = {
    destination: userContext.destination,
    travelWindow: windowParam || userContext.travelWindow,
    topInterests: interestsParam ? interestsParam.split(",").filter(Boolean) : userContext.topInterests,
    pace: paceParam || "relaxed",
    companions: companionsParam || "you",
  };

  const hasAnswers = !!(interestsParam || companionsParam || budgetParam || stayParam || windowParam || paceParam);
  const tripBrief: { label: string; value: string }[] = [];
  if (hasAnswers) {
    if (companionsParam) tripBrief.push({ label: "Group", value: cap(companionsParam) });
    if (windowParam) tripBrief.push({ label: "Duration", value: cap(windowParam) });
    if (budgetParam) tripBrief.push({ label: "Budget", value: budgetParam });
    if (paceParam) tripBrief.push({ label: "Pace", value: cap(paceParam) });
    if (stayParam) tripBrief.push({ label: "Stay", value: stayParam });
  }

  const loadingMessages = useMemo(
    () =>
      nameParam
        ? [`Reading your answers, ${nameParam}...`, "Matching preferences to real Ipoh trails...", "Curating your packages...", "Finalizing your itinerary..."]
        : ["Matching your preferences...", "Curating destinations...", "Finalizing your packages..."],
    [nameParam]
  );

  const [phase, setPhase] = useState<Phase>("loading");
  const [loadingKey, setLoadingKey] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const msgTimer = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 900);
    const doneTimer = setTimeout(() => setPhase("result"), 2700);

    timers.current.push(doneTimer);
    return () => {
      clearInterval(msgTimer);
      timers.current.forEach(clearTimeout);
    };
  }, [loadingKey, loadingMessages.length]);

  const regenerate = () => {
    setMsgIndex(0);
    setPhase("loading");
    setLoadingKey((k) => k + 1);
  };

  const toggleSave = (id: string) => setSaved((s) => ({ ...s, [id]: !s[id] }));

  const pkgs = variant === "partial" ? partialize(basePackages) : basePackages;

  return (
    <>
      <header className="header">
        <nav aria-label="Primary navigation">
          <Link href="/#discover">Discover Ipoh</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/#locals">Local voices</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="buttonSmall" href="/#download">Get the app <span>↗</span></Link>
      </header>

      <main className={styles.main} id="main">
        {phase === "loading" && (
          <div className={styles.loadingWrap} key={loadingKey}>
            <div className={styles.loadingArt}>
              <Image src="/images/ipoh-4.jpg" alt="" fill sizes="420px" />
              <p className={styles.loadingArtNote}>
                <b>Did you know?</b>
                Ipoh’s white coffee gets its colour from beans roasted in margarine, not butter—a wartime substitute that stuck.
              </p>
            </div>
            <div className={styles.spinner} aria-hidden="true" />
            <p className={styles.loadingStatus} role="status" aria-live="polite">{loadingMessages[msgIndex]}</p>
            <div className={styles.progressTrack}><div className={styles.progressFill} /></div>
          </div>
        )}

        {phase === "result" && variant === "empty" && (
          <div className={styles.emptyWrap}>
            <div className={styles.icon}>✦</div>
            <h1>No packages matched this time</h1>
            <p>We couldn’t put together a trip that fit every preference you gave us. Try loosening a filter, or let a real person take it from here.</p>
            <div className={styles.emptyActions}>
              <a className="button" href="mailto:hello@dengarlah.app">Talk to a travel expert</a>
              <Link className="buttonSmall" href="/plan/start">Adjust your preferences</Link>
            </div>
          </div>
        )}

        {phase === "result" && variant !== "empty" && (
          <>
            <section className={styles.introHead}>
              <div>
                <p className="eyebrow"><span /> Curated for {nameParam || "you"}</p>
                <h1>
                  Based on your love for <em>{joinList(resolvedContext.topInterests)}</em> and {resolvedContext.travelWindow} in <em>{resolvedContext.destination}</em>, here’s what we’d recommend for {resolvedContext.companions} at a {resolvedContext.pace} pace.
                </h1>
                <p className="sub">
                  {pkgs.length} AI-curated {pkgs.length === 1 ? "package" : "packages"}, matched against your answers—not generic search results.
                </p>
                {tripBrief.length > 0 && (
                  <div className={styles.tripBrief}>
                    {tripBrief.map((item) => (
                      <span key={item.label} className={styles.tripBriefChip}><b>{item.label}</b>{item.value}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className={styles.headActions}>
                {/* <a className="button" href="/purchase">Purchase tour <span>→</span></a> */}
                <Link className={styles.editLink} href="/how-it-works">Purchase plan →</Link>
              </div>
            </section>

            {variant === "partial" && (
              <div className={styles.banner}>
                <b>We couldn’t find an exact match.</b> Here are the closest options based on what you told us.
              </div>
            )}

            <div className={styles.grid}>
              {pkgs.map((pkg) => (
                <article className={styles.card} key={pkg.id}>
                  <div className={styles.cardImg}>
                    <Image src={pkg.coverImage} alt="" fill sizes="(max-width: 960px) 100vw, 33vw" />
                    <span className={`${styles.badge}${pkg.matchLabel === "Premium Pick" ? ` ${styles.premium}` : ""}`}>{pkg.matchLabel}</span>
                    <button
                      type="button"
                      className={`${styles.saveBtn}${saved[pkg.id] ? ` ${styles.saved}` : ""}`}
                      onClick={() => toggleSave(pkg.id)}
                      aria-pressed={!!saved[pkg.id]}
                      aria-label={saved[pkg.id] ? "Remove from saved" : "Save for later"}
                    >
                      {saved[pkg.id] ? "♥" : "♡"}
                    </button>
                  </div>
                  <div className={styles.cardBody}>
                    <h3>{pkg.name}</h3>
                    <p className={styles.meta}>{pkg.durationDays} Days · {pkg.destinations.join(" → ")}</p>
                    <p className={styles.price}><b>{formatPrice(pkg.pricePerPerson, pkg.currency)}</b><span>starting from, per person</span></p>
                    <p className={styles.rationale}>{pkg.aiRationale}</p>
                    <div className={styles.tags}>{pkg.tags.map((t) => <span key={t}>{t}</span>)}</div>

                    <details className={styles.itinerary}>
                      <summary>View full itinerary <span>+</span></summary>
                      <ol className={styles.itineraryList}>
                        {pkg.itineraryPreview.map((d) => (
                          <li key={d.day}><b>Day {d.day}</b>{d.title}</li>
                        ))}
                      </ol>
                    </details>

                    <div className={styles.cardActions}>
                      <a className="button cream" href="mailto:hello@dengarlah.app">Book this trip</a>
                      <button type="button" className="buttonSmall" onClick={() => toggleSave(pkg.id)}>
                        {saved[pkg.id] ? "Saved ✓" : "Save for later"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <details className={styles.compare} open>
              <summary><h2>Compare at a glance</h2><span>+</span></summary>
              <div className={styles.compareScroll}>
                <table className={styles.compareTable}>
                  <thead>
                    <tr><th>Package</th><th>Price</th><th>Pace</th><th>Best for</th><th>Duration</th></tr>
                  </thead>
                  <tbody>
                    {pkgs.map((pkg) => (
                      <tr key={pkg.id}>
                        <td>{pkg.name}</td>
                        <td>{formatPrice(pkg.pricePerPerson, pkg.currency)}</td>
                        <td>{pkg.pace}</td>
                        <td>{pkg.bestFor}</td>
                        <td>{pkg.durationDays} days</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <div className={styles.fallback}>
              <h2>None of these quite right?</h2>
              <p>AI isn’t the only path—loop in a real human, start over, or see everything we offer.</p>
              <div className={styles.fallbackActions}>
                <a className="button" href="mailto:hello@dengarlah.app">Talk to a travel expert</a>
                <button type="button" className="buttonSmall" onClick={regenerate}>Regenerate with different preferences</button>
                <Link className="buttonSmall" href="/#discover">Browse all packages</Link>
              </div>
            </div>
          </>
        )}
      </main>

      <footer>
        <div className="footerTop">
          <div><span className="logo">Dengarlah</span><p>Self-guided stories for people who’d rather listen than talk.</p></div>
          <div><b>Explore</b><Link href="/#discover">Discover Ipoh</Link><Link href="/#how">How it works</Link><Link href="/#locals">Local voices</Link></div>
          <div><b>Say hello</b><a href="mailto:hello@dengarlah.app">Email us</a><a href="#">Instagram</a><a href="#">Facebook</a></div>
        </div>
        <div className="footerBottom"><span>© 2026 ABC Dengarlah</span><span>Made quietly in Ipoh, Perak</span></div>
      </footer>
    </>
  );
}
