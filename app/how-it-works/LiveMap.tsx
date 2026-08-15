"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./how-it-works.module.css";

const stops: { pos: [number, number]; label: string }[] = [
  { pos: [4.59632, 101.07794], label: "1" },
  { pos: [4.59611, 101.07889], label: "2" },
  { pos: [4.596833, 101.076111], label: "3" },
];

export default function LiveMap() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let map: import("leaflet").Map | undefined;

    import("leaflet").then((L) => {
      if (cancelled || !elRef.current) return;

      map = L.map(elRef.current, {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        boxZoom: false,
        keyboard: false,
        attributionControl: true,
      }).setView([4.59665, 101.0778], 17);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      L.polyline(stops.map((s) => s.pos), { color: "#9c1c1c", weight: 5, opacity: 0.9, lineJoin: "round" }).addTo(map);

      stops.forEach((s) => {
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:26px;height:26px;border-radius:50%;background:#9c1c1c;color:#fff;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:500;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.25);border:2px solid #fff;">${s.label}</div>`,
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        });
        L.marker(s.pos, { icon }).addTo(map!);
      });

      const userIcon = L.divIcon({
        className: "",
        html: `<div style="width:18px;height:18px;border-radius:50%;background:#e0332f;border:3px solid #fff;box-shadow:0 0 0 6px rgba(224,51,47,0.22);"></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });
      L.marker([4.5965, 101.07845], { icon: userIcon }).addTo(map);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  return <div ref={elRef} className={styles.liveMap} />;
}
