"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "init" | "tagline" | "headline" | "exit" | "done";

function revealHero() {
  document.documentElement.classList.add("hero-in");
}

export default function IntroOverlay() {
  const [phase, setPhase] = useState<Phase>("init");
  const previousOverflow = useRef("");
  const decision = useRef<"skip" | "play" | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (decision.current === null) {
      const alreadySeen = sessionStorage.getItem("dengarlah-intro-seen");
      decision.current = reduceMotion || alreadySeen ? "skip" : "play";
      if (decision.current === "play") sessionStorage.setItem("dengarlah-intro-seen", "1");
    }

    if (!reduceMotion) document.documentElement.classList.add("hero-anim");

    if (decision.current === "skip") {
      timers.current.push(setTimeout(() => setPhase("done"), 0));
      if (!reduceMotion) timers.current.push(setTimeout(revealHero, 150));
      const scheduled = timers.current;
      return () => scheduled.forEach(clearTimeout);
    }

    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    timers.current.push(
      setTimeout(() => setPhase("tagline"), 50),
      setTimeout(() => setPhase("headline"), 1950),
      setTimeout(() => {
        setPhase("exit");
        revealHero();
      }, 4050),
      setTimeout(() => {
        document.documentElement.style.overflow = previousOverflow.current;
        setPhase("done");
      }, 5380)
    );

    const scheduled = timers.current;
    return () => {
      scheduled.forEach(clearTimeout);
      document.documentElement.style.overflow = previousOverflow.current;
    };
  }, []);

  if (phase === "done") return null;

  const skip = () => {
    timers.current.forEach(clearTimeout);
    document.documentElement.style.overflow = previousOverflow.current;
    revealHero();
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
