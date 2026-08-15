"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MOCK_CREDENTIALS, SESSION_COOKIE, SESSION_VALUE } from "./session";

export type LoginState = { error?: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const fromRaw = String(formData.get("from") || "/admin");
  const redirectTo = fromRaw.startsWith("/") ? fromRaw : "/admin";

  if (email !== MOCK_CREDENTIALS.email.toLowerCase() || password !== MOCK_CREDENTIALS.password) {
    return { error: "Incorrect email or password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(redirectTo);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/login");
}
