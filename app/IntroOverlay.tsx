"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "init" | "tagline" | "headline" | "exit" | "done";

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("init");
  const previousOverflow = useRef("");
  const decision = useRef<"skip" | "play" | null>(null);

  useEffect(() => {
    if (decision.current === null) {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const alreadySeen = sessionStorage.getItem("dengarlah-intro-seen");
      decision.current = reduceMotion || alreadySeen ? "skip" : "play";
      if (decision.current === "play") sessionStorage.setItem("dengarlah-intro-seen", "1");
    }

    if (decision.current === "skip") {
      const skipTimer = setTimeout(() => setPhase("done"), 0);
      return () => clearTimeout(skipTimer);
    }

    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const timers = [
      setTimeout(() => setPhase("tagline"), 50),
      setTimeout(() => setPhase("headline"), 1950),
      setTimeout(() => setPhase("exit"), 4050),
      setTimeout(() => {
        document.documentElement.style.overflow = previousOverflow.current;
        setPhase("done");
      }, 4950),
    ];

    return () => {
      timers.forEach(clearTimeout);
      document.documentElement.style.overflow = previousOverflow.current;
    };
  }, []);

  if (phase === "done") return null;

  const skip = () => {
    document.documentElement.style.overflow = previousOverflow.current;
    setPhase("done");
  };

  return (
    <div
      className={`introOverlay${phase === "exit" ? " introOverlay--exit" : ""}`}
      onClick={skip}
      role="presentation"
    >
      <p className={`introTagline${phase === "tagline" ? " introTagline--in" : ""}${phase === "headline" || phase === "exit" ? " introTagline--out" : ""}`}>
        Your trip. Your pace. <em>Our guidance.</em>
      </p>
      <h1 className={`introHeadline${phase === "headline" || phase === "exit" ? " introHeadline--in" : ""}`}>
        Wander quietly.<br /><em>Listen closely.</em>
      </h1>
    </div>
  );
}
