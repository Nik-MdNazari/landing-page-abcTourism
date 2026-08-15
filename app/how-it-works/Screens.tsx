import type { ReactNode } from "react";
import Image from "next/image";
import PhoneFrame from "./PhoneFrame";
import LiveMap from "./LiveMap";
import styles from "./how-it-works.module.css";

const RED = "#9c1c1c";
const BRIGHT = "#e0332f";
const CREAM = "#fff3f1";
const BORDER = "#f0eeec";
const MUTED = "#8a6a68";
const FAINT = "#aca39f";
const PINK = "#ffd9d2";
const SANS = "var(--font-sans-stack)";
const MONO = "var(--font-mono-stack)";

function TabBar({ active }: { active: "tour" | "map" | "guide" | "saved" }) {
  const items: { key: typeof active; label: string }[] = [
    { key: "tour", label: "Tour" },
    { key: "map", label: "Map" },
    { key: "guide", label: "Guide" },
    { key: "saved", label: "Saved" },
  ];
  return (
    <div style={{ flexShrink: 0, height: 68, borderTop: `1px solid ${BORDER}`, display: "flex", paddingBottom: 10, background: "#fff" }}>
      {items.map((item) => (
        <div key={item.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <div style={item.key === active
            ? { width: 18, height: 18, borderRadius: item.key === "map" ? "50%" : 5, background: RED }
            : { width: 18, height: 18, borderRadius: item.key === "map" ? "50%" : 5, border: `2px solid ${FAINT}` }}
          />
          <div style={{ fontSize: 10, fontWeight: item.key === active ? 500 : 400, color: item.key === active ? RED : FAINT }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function ProgressBar({ pct, light }: { pct: number; light?: boolean }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: light ? "rgba(255,255,255,0.25)" : BORDER, position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, borderRadius: 2, background: light ? "#fff" : RED }} />
      <div style={{ position: "absolute", left: `${pct}%`, top: "50%", transform: "translate(-50%, -50%)", width: 13, height: 13, borderRadius: "50%", background: light ? "#fff" : BRIGHT, border: light ? "3px solid rgba(255,255,255,0.4)" : "3px solid #fff" }} />
    </div>
  );
}

function PlayControls() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 500, color: RED }}>15</div>
      <div style={{ width: 68, height: 68, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} />
        <div style={{ width: 5, height: 22, background: "#fff", borderRadius: 2 }} />
      </div>
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 500, color: RED }}>15</div>
    </div>
  );
}

function ScriptCard() {
  return (
    <div style={{ flexShrink: 0, width: "100%", background: CREAM, border: `1px solid ${PINK}`, borderRadius: 16, padding: "8px 16px 14px" }}>
      <div style={{ width: 36, height: 4, borderRadius: 2, background: "#e3c9c4", margin: "0 auto 10px" }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED }}>Script</div>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
            <path d="M1 4V1H4" stroke={RED} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 7V10H7" stroke={RED} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: RED, textAlign: "left" }}>The clock tower was completed in 1909, commissioned by British Resident E.W. Birch as a tribute to his father,</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "#cbaba5", textAlign: "left", marginTop: 2 }}>Sir James Birch &mdash; and it still keeps time for the whole square.</div>
    </div>
  );
}

/* Screen 1 — Tour detail */
function Screen1() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ height: 380, position: "relative", flexShrink: 0 }}>
        <Image src="/images/ipoh-3.jpg" alt="Concubine Lane shophouses" fill sizes="400px" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 58, left: 16, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 9, height: 9, borderLeft: `2.5px solid ${RED}`, borderBottom: `2.5px solid ${RED}`, transform: "rotate(45deg)", marginLeft: 3 }} />
        </div>
        <div style={{ position: "absolute", top: 58, right: 16, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, border: `2px solid ${RED}` }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "30px 20px 14px", background: "linear-gradient(transparent, rgba(74,13,13,0.6))" }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Starting point &middot; Concubine Lane</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "22px 20px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 25, letterSpacing: "-0.02em", color: RED, lineHeight: 1.2 }}>Ipoh Old Town Heritage Walk</div>
          <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>6 stops &middot; 1.8 km &middot; ~50 min</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRIGHT }} />
          <div style={{ fontSize: 15, fontWeight: 500, color: RED }}>0m to start</div>
        </div>
        <div style={{ height: 54, borderRadius: 24, background: RED, display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
          <div style={{ width: 0, height: 0, borderTop: "7px solid transparent", borderBottom: "7px solid transparent", borderLeft: "11px solid #fff" }} />
          <div style={{ color: "#fff", fontFamily: SANS, fontWeight: 500, fontSize: 16 }}>Start Tour</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, height: 46, borderRadius: 6, border: `1.5px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500, color: RED }}>Get Directions</div>
          <div style={{ flex: 1, height: 46, borderRadius: 6, border: `1.5px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 500, color: RED }}>Ask Guide</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Force Start", "Resume Tour", "Offline Mode"].map((label) => (
            <div key={label} style={{ flex: 1, background: CREAM, border: `1px solid ${BORDER}`, borderRadius: 6, padding: "12px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${RED}` }} />
              <div style={{ fontSize: 11, fontWeight: 500, color: RED, textAlign: "center" }}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 11.5, color: FAINT }}>Bring headphones &middot; charge your phone before you start</div>
      </div>
      <TabBar active="tour" />
    </div>
  );
}

/* Screen 2 — Live map navigation */
function Screen2() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ padding: "4px 20px 10px", flexShrink: 0 }}>
        <ProgressBar pct={42} />
      </div>
      <div style={{ padding: "6px 20px 14px", flexShrink: 0 }}>
        <div style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: MUTED }}>Up Next</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 2 }}>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 26, letterSpacing: "-0.02em", color: RED }}>180m</div>
          <div style={{ width: 24, height: 24, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 7, height: 7, borderRight: `2px solid ${RED}`, borderBottom: `2px solid ${RED}`, transform: "rotate(45deg)", marginTop: -3 }} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 3 }}>
          <div style={{ fontSize: 14, color: MUTED }}>Towards Concubine Lane</div>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: RED, color: "#fff", fontFamily: MONO, fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>3</div>
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <LiveMap />
        <div style={{ position: "absolute", top: 18, right: 16, display: "flex", flexDirection: "column", gap: 8, zIndex: 1000 }}>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 14, height: 14, borderRadius: 4, border: `2px solid ${RED}` }} /></div>
          <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#fff", border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${RED}` }} /></div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 6, flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <Image src="/images/hero-banner.jpg" alt="Birch Memorial Clock Tower" fill sizes="80px" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: RED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Birch Memorial Clock Tower</div>
          <div style={{ fontSize: 12, color: MUTED }}>Stop 3 of 6</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderRight: `9px solid ${MUTED}` }} />
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
            <div style={{ width: 3, height: 11, background: "#fff", borderRadius: 1 }} />
            <div style={{ width: 3, height: 11, background: "#fff", borderRadius: 1 }} />
          </div>
          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `9px solid ${MUTED}` }} />
          <div style={{ width: 30, height: 30, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 14, height: 11, borderRadius: 3, border: `1.6px solid ${RED}` }} />
          </div>
        </div>
      </div>
      <TabBar active="map" />
    </div>
  );
}

/* Screen 3 — Full audio player */
function Screen3() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 16px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 8, height: 8, borderRight: `2px solid ${RED}`, borderBottom: `2px solid ${RED}`, transform: "rotate(135deg)", marginTop: -3 }} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: MUTED }}>Stop 3 of 6</div>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 14, height: 11, borderRadius: 3, border: `1.6px solid ${RED}` }} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 24px 0", gap: 16 }}>
        <div style={{ width: 200, height: 200, borderRadius: 13, position: "relative", overflow: "hidden", boxShadow: "rgba(156,28,28,0.16) 12px 20px 44px 0px" }}>
          <Image src="/images/hero-banner.jpg" alt="Birch Memorial Clock Tower" fill sizes="300px" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 21, letterSpacing: "-0.02em", color: RED }}>Birch Memorial Clock Tower</div>
          <div style={{ fontSize: 13.5, color: MUTED, marginTop: 3 }}>Ipoh Old Town Heritage Walk</div>
        </div>
        <div style={{ width: "100%" }}>
          <ProgressBar pct={55} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: MONO, fontSize: 11, color: MUTED }}><span>1:04</span><span>-0:52</span></div>
        </div>
        <div style={{ padding: "5px 14px", borderRadius: 9999, background: PINK, fontFamily: MONO, fontSize: 12, fontWeight: 500, color: RED }}>1x Speed</div>
        <PlayControls />
      </div>
      <div style={{ flexShrink: 0, padding: "0 20px 30px" }}>
        <ScriptCard />
      </div>
    </div>
  );
}

/* Screen — Full script, expanded from the script card */
function ScreenFullScript() {
  const lines: { text: string; active?: boolean }[] = [
    { text: "The clock tower was completed in 1909, commissioned by British Resident E.W. Birch", active: true },
    { text: "as a tribute to his father, Sir James Birch — and it still keeps time for the whole square.", active: true },
    { text: "Locals still set their watch by it, even now." },
    { text: "Look closely and you’ll spot four faces, one for each side of the square." },
    { text: "It survived two wars and a handful of earthquakes down the peninsula." },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#6b1414", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid rgba(255,255,255,0.7)" }} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>Birch Memorial Clock Tower</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 1 }}>Ipoh Old Town Heritage Walk</div>
        </div>
        <div style={{ width: 15, height: 15, border: "1.6px solid rgba(255,255,255,0.7)", borderRadius: 2 }} />
      </div>
      <div style={{ flex: 1, padding: "18px 28px 0", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontSize: 18, lineHeight: 1.5, fontWeight: line.active ? 600 : 400, color: line.active ? "#fff" : "rgba(255,255,255,0.4)" }}>{line.text}</div>
        ))}
      </div>
      <div style={{ flexShrink: 0, padding: "18px 28px 32px" }}>
        <ProgressBar pct={30} light />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.6)" }}><span>0:47</span><span>-1:22</span></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 26, marginTop: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <div style={{ width: 4, height: 18, background: "#6b1414", borderRadius: 2 }} />
            <div style={{ width: 4, height: 18, background: "#6b1414", borderRadius: 2 }} />
          </div>
          <div style={{ width: 36, height: 36, borderRadius: "50%", border: "1.6px solid rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "3px 3px 0 0", border: "1.6px solid rgba(255,255,255,0.8)", borderBottom: "none" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Screen 4 — AI tour guide chat */
function Screen4() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: PINK }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 16, color: RED }}>Ipoh Guide</div>
          <div style={{ fontSize: 12, color: MUTED }}>Near Concubine Lane</div>
        </div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: CREAM }} />
      </div>
      <div style={{ flex: 1, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
        <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: CREAM, border: `1px solid ${BORDER}`, borderRadius: "6px 6px 6px 2px", padding: "11px 14px", fontSize: 13.5, lineHeight: 1.4, color: RED }}>Hi! I&apos;m your Ipoh guide. Ask me anything about what&apos;s around you, or tap a suggestion below.</div>
        <div style={{ alignSelf: "flex-end", maxWidth: "80%", background: RED, color: "#fff", borderRadius: "6px 6px 2px 6px", padding: "11px 14px", fontSize: 13.5, lineHeight: 1.4 }}>What&apos;s the story behind Concubine Lane?</div>
        <div style={{ alignSelf: "flex-start", maxWidth: "82%", background: CREAM, border: `1px solid ${BORDER}`, borderRadius: "6px 6px 6px 2px", padding: "11px 14px", fontSize: 13.5, lineHeight: 1.4, color: RED }}>Also called Lorong Panglima, it dates to the 1890s tin-mining boom. Local lore says wealthy miners housed their mistresses here &mdash; today it&apos;s lined with old shophouses, snacks, and trinket stalls.</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 2 }}>
          {["Nearby food", "Translate a phrase", "Tell me more"].map((chip) => (
            <div key={chip} style={{ padding: "7px 13px", borderRadius: 9999, border: `1.5px solid ${RED}`, fontSize: 12.5, fontWeight: 500, color: RED }}>{chip}</div>
          ))}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ flex: 1, height: 42, borderRadius: 9999, background: CREAM, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13.5, color: FAINT }}>Ask about this stop&hellip;</div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: CREAM, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 12, height: 16, borderRadius: "6px 6px 0 0", border: `2px solid ${RED}`, borderBottom: "none" }} />
        </div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: RED, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid #fff", marginLeft: 2 }} />
        </div>
      </div>
      <TabBar active="guide" />
    </div>
  );
}

/* Screen 5 — Detect, don't dictate */
function Screen5() {
  const rows = [
    { n: "1", label: "Kong Heng Square", state: "dim" },
    { n: "2", label: "Sekeping Kong Heng", state: "dim" },
    { n: "3", label: "Birch Memorial Clock Tower", sub: "You are here · starting now", state: "active" },
    { n: "4", label: "Concubine Lane", state: "normal" },
    { n: "5", label: "Plan Malaya Mural", state: "normal" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px" }}>
        <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 22, letterSpacing: "-0.02em", color: RED }}>Ipoh Old Town Heritage Walk</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>6 stops &middot; 1.8 km</div>
      </div>
      <div style={{ flexShrink: 0, margin: "16px 20px 6px", background: CREAM, border: `1px solid ${PINK}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRIGHT, flexShrink: 0 }} />
        <div style={{ fontSize: 12.5, color: RED, lineHeight: 1.4 }}>You&apos;re near <strong style={{ fontWeight: 600 }}>Stop 3</strong> &mdash; starting your tour here instead of the beginning.</div>
      </div>
      <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8, overflow: "hidden" }}>
        {rows.map((row) =>
          row.state === "active" ? (
            <div key={row.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 12px", borderRadius: 10, background: CREAM, border: `1.5px solid ${RED}` }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: RED, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 500, color: "#fff" }}>{row.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: RED }}>{row.label}</div>
                <div style={{ fontSize: 11.5, color: MUTED }}>{row.sub}</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 0, height: 0, borderTop: "4.5px solid transparent", borderBottom: "4.5px solid transparent", borderLeft: "7px solid #fff", marginLeft: 1.5 }} />
              </div>
            </div>
          ) : (
            <div key={row.n} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 10, opacity: row.state === "dim" ? 0.4 : 1 }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", border: `1.5px solid ${row.state === "dim" ? FAINT : "#cbaba5"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, color: row.state === "dim" ? FAINT : RED }}>{row.n}</div>
              <div style={{ fontSize: 13.5, color: row.state === "dim" ? MUTED : RED }}>{row.label}</div>
            </div>
          )
        )}
      </div>
      <TabBar active="tour" />
    </div>
  );
}

/* Screen 6 — Narration begins */
function Screen6() {
  const bars = [10, 22, 14, 28, 8, 18, 12, 24, 9];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 16px 0", display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "5px 13px", borderRadius: 9999, background: CREAM, display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: BRIGHT }} />
          <div style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, color: RED }}>Now Playing &middot; Auto-started</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 24px 0", gap: 14 }}>
        <div style={{ width: 190, height: 190, borderRadius: 13, position: "relative", overflow: "hidden", boxShadow: "rgba(156,28,28,0.16) 12px 20px 44px 0px" }}>
          <Image src="/images/hero-banner.jpg" alt="Birch Memorial Clock Tower" fill sizes="300px" style={{ objectFit: "cover" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 20, letterSpacing: "-0.02em", color: RED }}>Birch Memorial Clock Tower</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>Stop 3 of 6</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, height: 26 }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 3, height: h * 0.8, background: i < 4 ? (i < 2 ? RED : BRIGHT) : "#d9c4c0", borderRadius: 2 }} />
          ))}
        </div>
        <div style={{ width: "100%" }}>
          <ProgressBar pct={12} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontFamily: MONO, fontSize: 11, color: MUTED }}><span>0:14</span><span>-1:42</span></div>
        </div>
        <PlayControls />
      </div>
      <div style={{ flexShrink: 0, padding: "0 20px 26px" }}>
        <ScriptCard />
      </div>
    </div>
  );
}

/* Screen 7 — Interrupt, mid-sentence */
function Screen7() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, color: MUTED }}>Stop 3 &middot; Paused</div>
        <div style={{ padding: "4px 10px", borderRadius: 9999, background: CREAM, fontFamily: MONO, fontSize: 10.5, fontWeight: 500, color: RED }}>0:47 / 1:56</div>
      </div>
      <div style={{ flex: 1, padding: "16px 22px 0", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
        <div style={{ fontSize: 15.5, lineHeight: 1.7, color: "#cbaba5" }}>The clock tower was completed in 1909, commissioned by British Resident E.W. Birch as a tribute to his father, </div>
        <div style={{ fontSize: 15.5, lineHeight: 1.7, color: RED, background: CREAM, borderRadius: 4, padding: "2px 0" }}>Sir James Birch &mdash; and it still keeps time for the whole square<span style={{ display: "inline-block", width: 2, height: 16, background: BRIGHT, verticalAlign: -3, marginLeft: 1 }} /></div>
      </div>
      <div style={{ flexShrink: 0, padding: "18px 22px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{ width: 74, height: 74, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: `0 0 0 8px ${CREAM}, 0 0 0 16px #ffe4de` }}>
          <div style={{ width: 14, height: 20, borderRadius: "7px 7px 0 0", border: "2.5px solid #fff", borderBottom: "none" }} />
        </div>
        <div style={{ fontSize: 13, color: RED, fontWeight: 500 }}>Listening&hellip;</div>
        <div style={{ height: 42, width: "100%", borderRadius: 9999, background: CREAM, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13, color: "#cbaba5", fontStyle: "italic" }}>&quot;Wait, who was he a tribute to again?&quot;</div>
      </div>
      <div style={{ flexShrink: 0, padding: "6px 24px 26px", textAlign: "center", fontSize: 11.5, color: FAINT }}>Narration will resume right where it left off</div>
    </div>
  );
}

/* Screen 8 — Sambung balik */
function Screen8() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 14px", display: "flex", alignItems: "center", gap: 12, borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: RED, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 12, height: 12, borderRadius: "50%", background: PINK }} /></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SANS, fontWeight: 500, fontSize: 16, color: RED }}>Ipoh Guide</div>
          <div style={{ fontSize: 12, color: MUTED }}>Stop 3 &middot; Birch Memorial</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "14px 18px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        <div style={{ alignSelf: "flex-end", maxWidth: "82%", background: RED, color: "#fff", borderRadius: "6px 6px 2px 6px", padding: "10px 13px", fontSize: 13, lineHeight: 1.4 }}>Wait, who was he a tribute to again?</div>
        <div style={{ alignSelf: "flex-start", maxWidth: "84%", background: CREAM, border: `1px solid ${BORDER}`, borderRadius: "6px 6px 6px 2px", padding: "10px 13px", fontSize: 13, lineHeight: 1.4, color: RED }}>Sir James Birch, the British Resident of Perak who was assassinated in 1875 &mdash; his son E.W. Birch built the tower in his memory.</div>
        <div style={{ marginTop: 4, padding: "10px 13px", borderRadius: 10, background: "#f4f1f0", border: "1px dashed #cbaba5", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: RED, flexShrink: 0 }} />
          <div style={{ fontFamily: MONO, fontSize: 11, color: MUTED }}>Resuming narration at 0:47&hellip;</div>
        </div>
        <div style={{ padding: "10px 13px", borderRadius: 10, background: CREAM, border: `1px solid ${PINK}`, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: `8px solid ${RED}`, flexShrink: 0 }} />
          <div style={{ fontSize: 11.5, color: RED }}>Rerouting to nearest stop: <strong style={{ fontWeight: 600 }}>Concubine Lane</strong>, 90m away</div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, borderTop: `1px solid ${BORDER}` }}>
        <div style={{ flex: 1, height: 42, borderRadius: 9999, background: CREAM, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 16px", fontSize: 13.5, color: FAINT }}>Ask about this stop&hellip;</div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: RED, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "9px solid #fff", marginLeft: 2 }} /></div>
      </div>
    </div>
  );
}

/* Screen 9 — Nearby, right now */
function Screen9() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#f4f1f0", fontFamily: SANS }}>
      <div style={{ height: 54, flexShrink: 0 }} />
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <LiveMap />
        <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, background: "#fff", borderRadius: 14, boxShadow: "0 10px 30px rgba(74,13,13,0.18)", padding: 14, display: "flex", gap: 12, alignItems: "center", zIndex: 1000 }}>
          <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, position: "relative", overflow: "hidden" }}>
            <Image src="/images/ipoh-1.jpg" alt="Nam Heong Kopitiam" fill sizes="80px" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: BRIGHT }} /><div style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, color: RED, textTransform: "uppercase", letterSpacing: "0.04em" }}>Nearby now</div></div>
            <div style={{ fontSize: 14, fontWeight: 500, color: RED, marginTop: 2 }}>Nam Heong Kopitiam</div>
            <div style={{ fontSize: 11.5, color: MUTED }}>White coffee &middot; 60m &middot; 1 min walk</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: RED, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 0, height: 0, borderTop: "5px solid transparent", borderBottom: "5px solid transparent", borderLeft: "8px solid #fff", marginLeft: 2 }} /></div>
        </div>
      </div>
      <TabBar active="map" />
    </div>
  );
}

/* Screen 10 — Welcome & permissions */
function Screen10() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ height: 440, position: "relative", flexShrink: 0 }}>
        <Image src="/images/ipoh-4.jpg" alt="Mural street art in Ipoh" fill sizes="400px" style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(74,13,13,0.1) 0%, transparent 45%, #fff 100%)" }} />
      </div>
      <div style={{ flex: 1, padding: "4px 26px 20px", display: "flex", flexDirection: "column", gap: 16, marginTop: -34, position: "relative" }}>
        <div>
          <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 28, letterSpacing: "-0.02em", color: RED, lineHeight: 1.2 }}>Every street has a story</div>
          <div style={{ fontSize: 14.5, color: MUTED, marginTop: 8, lineHeight: 1.5 }}>Self-guided audio tours that follow you, not a script &mdash; with an AI guide for whatever the narration doesn&apos;t cover.</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: CREAM, border: `1px solid ${PINK}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: RED, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2.5px solid #fff" }} />
          </div>
          <div style={{ fontSize: 12.5, color: RED, lineHeight: 1.4 }}>Dengarlah uses your location to start narration automatically as you walk &mdash; only while the app is open.</div>
        </div>
        <div style={{ height: 54, borderRadius: 9999, background: RED, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#fff", fontFamily: SANS, fontWeight: 500, fontSize: 16 }}>Allow Location &amp; Continue</div>
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: FAINT }}>Not now</div>
      </div>
    </div>
  );
}

/* Screen 11 — Browse tours */
function Screen11() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px" }}>
        <div style={{ fontSize: 13, color: MUTED }}>Exploring</div>
        <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 25, letterSpacing: "-0.02em", color: RED }}>Ipoh, Perak</div>
      </div>
      <div style={{ flexShrink: 0, padding: "14px 20px 10px" }}>
        <div style={{ height: 44, borderRadius: 9999, background: CREAM, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", padding: "0 16px", gap: 10 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", border: `2px solid ${FAINT}`, flexShrink: 0 }} />
          <div style={{ fontSize: 13.5, color: FAINT }}>Search tours, places&hellip;</div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "4px 20px 14px", display: "flex", gap: 8, overflowX: "auto" }}>
        {["All", "Heritage", "Food", "Street Art"].map((tag, i) => (
          <div key={tag} style={i === 0
            ? { padding: "7px 14px", borderRadius: 9999, background: RED, fontSize: 12.5, fontWeight: 500, color: "#fff", whiteSpace: "nowrap" }
            : { padding: "7px 14px", borderRadius: 9999, border: `1px solid ${BORDER}`, fontSize: 12.5, fontWeight: 500, color: MUTED, whiteSpace: "nowrap" }}
          >{tag}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "4px 20px", display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          <div style={{ height: 130, position: "relative" }}>
            <Image src="/images/ipoh-3.jpg" alt="Ipoh Old Town Heritage Walk" fill sizes="360px" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ padding: "12px 14px" }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: RED }}>Ipoh Old Town Heritage Walk</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>6 stops &middot; 1.8 km &middot; ~50 min</div>
          </div>
        </div>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}`, display: "flex" }}>
          <div style={{ width: 90, flexShrink: 0, position: "relative" }}>
            <Image src="/images/ipoh-1.jpg" alt="Kopitiam & Coffee Trail" fill sizes="150px" style={{ objectFit: "cover" }} />
          </div>
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: RED }}>Kopitiam &amp; Coffee Trail</div>
            <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3 }}>4 stops &middot; 1.1 km &middot; ~30 min</div>
          </div>
        </div>
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${BORDER}`, display: "flex", opacity: 0.85 }}>
          <div style={{ width: 90, flexShrink: 0, background: "repeating-linear-gradient(135deg, #d9c4c0, #d9c4c0 10px, #cbaba5 10px, #cbaba5 20px)" }} />
          <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: RED }}>Mural Alley Street Art</div>
            <div style={{ fontSize: 11.5, color: MUTED, marginTop: 3 }}>5 stops &middot; 1.4 km &middot; ~40 min</div>
          </div>
        </div>
      </div>
      <TabBar active="tour" />
    </div>
  );
}

/* Screen 12 — Trip summary */
function Screen12() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "64px 26px 0", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: RED, margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 20, height: 12, borderLeft: "3px solid #fff", borderBottom: "3px solid #fff", transform: "rotate(-45deg) translate(1px, -2px)" }} />
        </div>
        <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 24, letterSpacing: "-0.02em", color: RED }}>Tour complete</div>
        <div style={{ fontSize: 13.5, color: MUTED, marginTop: 6 }}>Ipoh Old Town Heritage Walk</div>
      </div>
      <div style={{ flexShrink: 0, margin: "22px 22px 0", display: "flex", border: `1px solid ${BORDER}`, borderRadius: 12, overflow: "hidden" }}>
        {[["6/6", "Stops"], ["1.8km", "Walked"], ["47m", "Time"]].map(([val, label], i) => (
          <div key={label} style={{ flex: 1, padding: "14px 8px", textAlign: "center", borderRight: i < 2 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 500, color: RED }}>{val}</div>
            <div style={{ fontSize: 10.5, color: MUTED, marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, padding: "22px 26px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>How was the trail?</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4].map((n) => <div key={n} style={{ width: 26, height: 26, borderRadius: 4, background: BRIGHT }} />)}
            <div style={{ width: 26, height: 26, borderRadius: 4, border: "1.5px solid #d9c4c0" }} />
          </div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "16px 26px 34px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 50, borderRadius: 9999, background: RED, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 15, fontWeight: 500 }}>Find Your Next Tour</div>
        <div style={{ height: 44, borderRadius: 9999, border: `1.5px solid ${RED}`, display: "flex", alignItems: "center", justifyContent: "center", color: RED, fontSize: 14, fontWeight: 500 }}>Share This Trip</div>
      </div>
    </div>
  );
}

/* Screen — Fast Pass deals */
function ScreenFastPass() {
  const deals: { name: string; detail: string; claimed?: boolean }[] = [
    { name: "Kong Heng", detail: "Claypot rice & coffee · ~20 min saved" },
    { name: "Funny Mountain", detail: "Ice kacang & tau fu fah · ~15 min saved" },
    { name: "Thean Chun", detail: "Beansprout chicken · ~10 min saved" },
    { name: "Lou Wong", detail: "Beansprout chicken", claimed: true },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", background: "#fff", fontFamily: SANS }}>
      <div style={{ flexShrink: 0, padding: "58px 20px 4px" }}>
        <div style={{ fontSize: 13, color: MUTED }}>Fast Pass</div>
        <div style={{ fontFamily: SANS, fontWeight: 400, fontSize: 25, letterSpacing: "-0.02em", color: RED }}>Skip the queue</div>
      </div>
      <div style={{ flexShrink: 0, margin: "14px 20px 6px", background: CREAM, border: `1px solid ${PINK}`, borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRIGHT, flexShrink: 0 }} />
        <div style={{ fontSize: 12.5, color: RED, lineHeight: 1.4 }}>4 partner eateries along this route &mdash; claim a spot while you walk.</div>
      </div>
      <div style={{ flex: 1, padding: "10px 14px", display: "flex", flexDirection: "column", gap: 10, overflow: "hidden" }}>
        {deals.map((d) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, border: `1px solid ${d.claimed ? PINK : BORDER}`, background: d.claimed ? CREAM : "#fff" }}>
            <div style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, position: "relative", overflow: "hidden" }}>
              <Image src="/images/ipoh-1.jpg" alt={d.name} fill sizes="80px" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: RED }}>{d.name}</div>
              <div style={{ fontSize: 11.5, color: MUTED }}>{d.detail}</div>
            </div>
            {d.claimed ? (
              <div style={{ padding: "6px 10px", borderRadius: 9999, background: RED, color: "#fff", fontFamily: MONO, fontSize: 10.5, fontWeight: 500, whiteSpace: "nowrap" }}>Code R7K2</div>
            ) : (
              <div style={{ padding: "7px 12px", borderRadius: 9999, border: `1.5px solid ${RED}`, fontSize: 11.5, fontWeight: 500, color: RED, whiteSpace: "nowrap" }}>Claim</div>
            )}
          </div>
        ))}
      </div>
      <div style={{ flexShrink: 0, padding: "0 20px 20px", textAlign: "center", fontSize: 11.5, color: FAINT }}>No booking fee, no printed voucher &mdash; just show your code</div>
      <TabBar active="tour" />
    </div>
  );
}

type ScreenDef = { n: number; title: string; sub: string; dark?: boolean; content: () => ReactNode };

const group1: ScreenDef[] = [
  { n: 1, title: "Tour detail", sub: "Start screen before setting off", content: Screen1 },
  { n: 2, title: "Live map navigation", sub: "Turn-by-turn with a docked mini player", dark: false, content: Screen2 },
  { n: 3, title: "Full audio player", sub: "Expanded from the mini player", content: Screen3 },
  { n: 4, title: "Full script", sub: "Drag the script card up to read along, synced to narration", content: ScreenFullScript },
  { n: 5, title: "AI tour guide chat", sub: "Dedicated Guide tab", content: Screen4 },
  { n: 6, title: "Fast Pass deals", sub: "Skip the queue at partner eateries along the route", content: ScreenFastPass },
];

const group2: ScreenDef[] = [
  { n: 7, title: "Detect, don't dictate", sub: "GPS says Stop 3 — the app starts there, not Stop 1", content: Screen5 },
  { n: 8, title: "Narration begins", sub: "Audio plays immediately — no confirmation tap", content: Screen6 },
  { n: 9, title: "Interrupt, mid-sentence", sub: "A tap on the mic pauses narration to ask a real question", content: Screen7 },
  { n: 10, title: "Sambung balik", sub: "Answer given, narration resumes, then hands off to the nearest stop", content: Screen8 },
  { n: 11, title: "Nearby, right now", sub: "A fast pass surfaces as the traveler moves", content: Screen9 },
];

const group3: ScreenDef[] = [
  { n: 12, title: "Welcome & permissions", sub: "First open — sets the tone before any tour starts", content: Screen10 },
  { n: 13, title: "Browse tours", sub: "Discover screen — where a trip usually begins", content: Screen11 },
  { n: 14, title: "Trip summary", sub: "Wrap-up screen shown at the last stop", content: Screen12 },
];

function ScreenRow({ screens }: { screens: ScreenDef[] }) {
  return (
    <div className={styles.screenRow}>
      {screens.map((s, i) => (
        <div key={s.n} className={styles.screenItem} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
          <div className={styles.screenLabel}>
            <span className={styles.screenNum}>{s.n}</span>
            <div>
              <b>{s.title}</b>
              <p>{s.sub}</p>
            </div>
          </div>
          <PhoneFrame dark={s.dark}>{s.content()}</PhoneFrame>
        </div>
      ))}
    </div>
  );
}

export default function Screens() {
  return (
    <>
      <section className={`section ${styles.group}`}>
        <div className={styles.groupHead} data-reveal>
          <h2>Inside the tour.</h2>
          <p>From the moment you press start to the moment you ask a real question.</p>
        </div>
        <ScreenRow screens={group1} />
      </section>

      <section className={`section ${styles.group}`}>
        <div className={styles.groupHead} data-reveal>
          <h2>How the AI guide behaves.</h2>
          <p>Five moments from the interaction model &mdash; detecting real position, narrating without a tap, letting a question interrupt, resuming exactly where it left off, and surfacing timely nearby suggestions.</p>
        </div>
        <ScreenRow screens={group2} />
      </section>

      <section className={`section ${styles.group}`}>
        <div className={styles.groupHead} data-reveal>
          <h2>Discover &amp; wrap up the trip.</h2>
          <p>First open, browsing tours, and the finish line.</p>
        </div>
        <ScreenRow screens={group3} />
      </section>
    </>
  );
}
