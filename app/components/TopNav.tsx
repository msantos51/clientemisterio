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
      {/* Exibe botão de menu apenas no mobile com ícone puro, sem texto visível. */}
      <button
        aria-expanded={isMenuOpen}
        aria-label="Abrir menu principal"
        className={`menu-toggle-button lg:hidden ${isMenuOpen ? "is-open" : ""}`}
        onClick={() => setIsMenuOpen((current) => !current)}
        type="button"
      >
        <span aria-hidden="true" className="menu-toggle-bar">
          <span className="menu-toggle-line top" />
          <span className="menu-toggle-line middle" />
          <span className="menu-toggle-line bottom" />
        </span>
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

      {/* Renderiza menu em coluna no mobile com texto vermelho e estilo do mockup. */}
      {isMenuOpen ? (
        <nav className="mobile-menu-container absolute inset-x-4 top-[84px] z-40 flex flex-col overflow-hidden rounded-[10px] border border-[color:var(--line)] bg-[color:var(--surface)] shadow-sm lg:hidden">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.href;
            const isLast = index === navigationItems.length - 1;

            return (
              <Link
                key={item.href}
                className={`mobile-menu-item px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
                  isActive
                    ? "text-[#b91c1c]"
                    : "text-[color:var(--accent)] hover:bg-red-50"
                } ${isLast ? "border-b-0" : "border-b border-[color:var(--line)]"}`}
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
