"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { authApi, ApiError } from "@/lib/auth-api";
import {
  clearSession,
  getStoredAccessToken,
  getStoredAuthUser,
  persistSession,
} from "@/lib/auth-storage";
import type { AuthUser } from "@/types/admin";

type AdminGuardProps = {
  children: React.ReactNode;
};

export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = getStoredAccessToken();
    const storedUser = getStoredAuthUser();

    if (!token) {
      router.replace(`/admin?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    if (storedUser) {
      setUser(storedUser);
    }

    let isMounted = true;

    authApi
      .me()
      .then((currentUser) => {
        if (!isMounted) {
          return;
        }

        persistSession({
          accessToken: token,
          user: currentUser,
        });
        setUser(currentUser);
      })
      .catch((error) => {
        clearSession();

        if (error instanceof ApiError && error.status === 401) {
          router.replace(`/admin?redirect=${encodeURIComponent(pathname)}`);
          return;
        }

        router.replace("/admin");
      })
      .finally(() => {
        if (isMounted) {
          setIsChecking(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pathname, router]);

  if (isChecking || !user) {
    return (
      <section className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-6 pt-24">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-slate-300">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Validando sessão administrativa...
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
