"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./questions.module.css";
import { questions } from "./questions";

type SingleKey = "companions" | "travelWindow" | "budget" | "pace" | "stay";

type Answers = {
  companions?: string;
  travelWindow?: string;
  interests: string[];
  budget?: string;
  pace?: string;
  stay?: string;
  firstName?: string;
  email?: string;
};

export default function QuestionsClient() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ interests: [] });

  const question = questions[step];
  const isLast = step === questions.length - 1;

  const selectSingle = (key: SingleKey, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
  };

  const toggleInterest = (value: string, max: number) => {
    setAnswers((a) => {
      const has = a.interests.includes(value);
      if (has) return { ...a, interests: a.interests.filter((v) => v !== value) };
      if (a.interests.length >= max) return a;
      return { ...a, interests: [...a.interests, value] };
    });
  };

  const isAnswered =
    question.type === "grouped-multi"
      ? answers.interests.length > 0
      : question.type === "contact"
        ? !!answers.firstName?.trim()
        : !!answers[question.key as SingleKey];

  const goNext = () => {
    if (!isAnswered) return;
    if (isLast) {
      const q = new URLSearchParams();
      if (answers.companions) q.set("companions", answers.companions);
      if (answers.travelWindow) q.set("window", answers.travelWindow);
      if (answers.interests.length) q.set("interests", answers.interests.join(","));
      if (answers.budget) q.set("budget", answers.budget);
      if (answers.pace) q.set("pace", answers.pace);
      if (answers.stay) q.set("stay", answers.stay);
      if (answers.firstName?.trim()) q.set("name", answers.firstName.trim());
      router.push(`/plan?${q.toString()}`);
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

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
        <div className={styles.wrap}>
          <p className={styles.step}>Step {step + 1} of {questions.length}</p>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
          </div>

          <h1>{question.title}</h1>
          {question.type === "grouped-multi" && (
            <p className={styles.subtitle}>
              {question.subtitle} <span>{answers.interests.length}/{question.max} selected</span>
            </p>
          )}
          {question.type === "contact" && question.subtitle && <p className={styles.subtitle}>{question.subtitle}</p>}

          {question.type === "single" && (
            <div className={styles.options}>
              {question.options.map((opt) => {
                const selected = answers[question.key as SingleKey] === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    className={`${styles.option}${selected ? ` ${styles.selected}` : ""}`}
                    onClick={() => selectSingle(question.key as SingleKey, opt.value)}
                    aria-pressed={selected}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "grouped-multi" && (
            <div className={styles.groups}>
              {question.groups.map((group) => (
                <div className={styles.group} key={group.name}>
                  <p className={styles.groupName}>{group.name}</p>
                  <div className={styles.options}>
                    {group.options.map((opt) => {
                      const selected = answers.interests.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          className={`${styles.option}${selected ? ` ${styles.selected}` : ""}`}
                          onClick={() => toggleInterest(opt.value, question.max)}
                          aria-pressed={selected}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {question.type === "contact" && (
            <div className={styles.contactFields}>
              <label className={styles.field}>
                <span>First name</span>
                <input
                  type="text"
                  placeholder="Aisyah"
                  value={answers.firstName ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, firstName: e.target.value }))}
                />
              </label>
              <label className={styles.field}>
                <span>Email (optional)</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={answers.email ?? ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, email: e.target.value }))}
                />
              </label>
            </div>
          )}

          <div className={styles.nav}>
            <button type="button" className="buttonSmall" onClick={goBack} disabled={step === 0}>← Back</button>
            <button type="button" className="button cream" onClick={goNext} disabled={!isAnswered}>
              {isLast ? "Get my packages" : "Next"} <span>→</span>
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
