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
    // Direciona utilizadores autenticados para o dashboard principal.
    return "/dashboard";
  }, []);

  useEffect(() => {
    // Lê o estado da sessão no browser para decidir qual ação apresentar no cabeçalho.
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

  if (!sessionUser) {
    return (
      <div className="flex items-center justify-end">
        {/* Aplica o botão primário arredondado para replicar o destaque visual da imagem de referência. */}
        <Link
          className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-8 py-2 text-sm font-semibold text-white transition hover:brightness-95"
          href="/login"
        >
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end">
      <Link
        className="inline-flex items-center justify-center rounded-full border border-[color:var(--primary)] px-6 py-2 text-sm font-semibold text-[color:var(--primary)] transition hover:bg-[color:var(--primary-soft)]"
        href={profileHref}
      >
        Dashboard
      </Link>
    </div>
  );
}
