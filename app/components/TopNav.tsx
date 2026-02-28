"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre" },
  { href: "/contact", label: "Contacto" },
  { href: "/account", label: "Conta" },
];

export default function TopNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    // Fecha o menu após navegação para melhorar a experiência em ecrãs pequenos.
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Exibe botão de menu apenas no mobile para disponibilizar navegação principal. */}
      <button
        aria-expanded={isMenuOpen}
        aria-label="Abrir menu principal"
        className="site-pill-button text-[11px] uppercase tracking-[0.15em] lg:hidden"
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        Menu
      </button>

      {/* Mantém navegação horizontal no desktop para preservar o layout editorial. */}
      <nav className="hidden items-center gap-8 lg:flex">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                isActive
                  ? "text-[color:var(--accent)]"
                  : "text-[color:var(--foreground)] hover:text-[color:var(--accent)]"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Renderiza menu em coluna no mobile com fundo sólido para legibilidade. */}
      {isMenuOpen ? (
        <nav className="absolute inset-x-4 top-[84px] z-40 flex flex-col gap-2 border border-[color:var(--line)] bg-[color:var(--surface)] p-4 shadow-sm lg:hidden">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                className={`border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "border-[color:var(--accent)] text-[color:var(--accent)]"
                    : "border-[color:var(--line)] text-[color:var(--foreground)]"
                }`}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </>
  );
}
