"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SessionUser = {
  fullName: string;
  email: string;
  isAdmin?: boolean;
};

const userStorageKey = "vp_user";
const sessionStorageKey = "vp_session";

export default function HeaderActions() {
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  const profileHref = useMemo(() => {
    // Mantém destino único para utilizadores autenticados.
    return "/dashboard";
  }, []);

  useEffect(() => {
    // Lê a sessão guardada no browser para alternar ação entre login e dashboard.
    const storedSession = localStorage.getItem(sessionStorageKey);
    const storedUser = localStorage.getItem(userStorageKey);

    if (!storedSession || !storedUser) {
      setSessionUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser) as SessionUser;

      if (parsedUser.email !== storedSession) {
        setSessionUser(null);
        return;
      }

      setSessionUser(parsedUser);
    } catch {
      setSessionUser(null);
    }
  }, []);

  return (
    <div className="flex items-center gap-3">
      {/* Apresenta ícones minimalistas para simular a zona de utilitários do cabeçalho de moda. */}
      <span aria-hidden className="hidden text-lg text-[color:var(--foreground)] md:inline">
        ⌕
      </span>
      <span aria-hidden className="hidden text-lg text-[color:var(--foreground)] md:inline">
        ♡
      </span>

      {!sessionUser ? (
        <Link
          className="inline-flex items-center justify-center border border-[color:var(--foreground)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--foreground)] transition hover:bg-[color:var(--foreground)] hover:text-white"
          href="/login"
        >
          Sign up
        </Link>
      ) : (
        <Link
          className="inline-flex items-center justify-center border border-[color:var(--foreground)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--foreground)] transition hover:bg-[color:var(--foreground)] hover:text-white"
          href={profileHref}
        >
          Dashboard
        </Link>
      )}
    </div>
  );
}
