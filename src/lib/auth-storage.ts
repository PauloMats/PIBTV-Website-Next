import type { AuthUser, LoginResponse } from "@/types/admin";

const ACCESS_TOKEN_KEY = "pibtv.accessToken";
const AUTH_USER_KEY = "pibtv.authUser";

export function getStoredAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function persistSession(session: LoginResponse) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, session.accessToken);
  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(session.user));
}

export function clearSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(AUTH_USER_KEY);
}
