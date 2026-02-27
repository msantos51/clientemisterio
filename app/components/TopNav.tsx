"use client";

import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Sobre" },
  { href: "/contact", label: "Contacto" },
  { href: "/account", label: "Conta" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          // Mantém links em caixa alta para reproduzir a estética de revista da referência.
          <a
            key={item.href}
            className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition ${
              isActive
                ? "text-[color:var(--accent)]"
                : "text-[color:var(--foreground)] hover:text-[color:var(--accent)]"
            }`}
            href={item.href}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
