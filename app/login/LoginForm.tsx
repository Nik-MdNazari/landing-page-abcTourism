"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";
import styles from "./login.module.css";

const initialState: LoginState = {};

export default function LoginForm({ from }: { from: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form className={styles.form} action={formAction}>
      <input type="hidden" name="from" value={from} />
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className={styles.field}>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required autoComplete="current-password" />
      </div>
      {state.error && <p className={styles.error}>{state.error}</p>}
      <button className={`button ${styles.submit}`} type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"} <span>→</span>
      </button>
    </form>
  );
}
