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
    <nav className="hidden items-center gap-8 md:flex">
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          // Mantém links sem peso visual excessivo para replicar a navegação discreta da referência.
          <a
            key={item.href}
            className={`text-sm font-medium transition ${
              isActive ? "text-[#16152b]" : "text-slate-500 hover:text-[#16152b]"
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
