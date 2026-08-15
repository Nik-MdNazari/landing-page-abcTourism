import type { CSSProperties, ReactNode } from "react";
import styles from "./how-it-works.module.css";

function StatusBar({ dark }: { dark: boolean }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div className={styles.statusBar}>
      <span style={{ color: c }}>9:41</span>
      <div className={styles.statusIcons}>
        <svg width="19" height="12" viewBox="0 0 19 12">
          <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill={c} />
          <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill={c} />
          <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill={c} />
          <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill={c} />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
          <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
          <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export default function PhoneFrame({
  dark = false,
  children,
  style,
}: {
  dark?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className={styles.viewport}>
      <div className={styles.canvas}>
        <div className={styles.device} style={{ background: dark ? "#000" : "#F2F2F7", ...style }}>
          <div className={styles.dynamicIsland} />
          <StatusBar dark={dark} />
          <div className={styles.deviceContent}>{children}</div>
          <div className={styles.homeIndicator}>
            <div className={styles.homeBar} style={{ background: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.25)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
