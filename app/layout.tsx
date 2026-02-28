import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import TopNav from "./components/TopNav";
import HeaderActions from "./components/HeaderActions";
import "./globals.css";

// Define a fonte principal com estilo geométrico para reforçar o visual editorial.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Mantém as fontes auxiliares para áreas técnicas sem quebrar compatibilidade.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Centraliza metadados globais do website.
export const metadata: Metadata = {
  title: "Cliente Mistério",
  description: "Portal de participação cidadã e informação pública.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${montserrat.variable} ${geistSans.variable} ${geistMono.variable} bg-[color:var(--background)] text-[color:var(--foreground)] antialiased`}
      >
        {/* Desenha o container principal sem moldura para remover a linha vermelha externa. */}
        <div className="mx-auto min-h-screen w-full max-w-[1400px] bg-[color:var(--background)]">
          {/* Cria a faixa superior com navegação central e ações discretas à direita. */}
          <header className="relative flex items-center justify-between gap-3 px-4 py-5 sm:px-6 md:px-10 md:py-6">
            <a
              className="text-[10px] font-black uppercase tracking-[0.28em] text-[color:var(--foreground)] sm:text-xs sm:tracking-[0.35em]"
              href="/"
            >
              Cliente Mistério
            </a>
            <TopNav />
            <HeaderActions />
          </header>

          {/* Renderiza o conteúdo da página respeitando a largura do layout editorial. */}
          <main className="px-4 pb-10 sm:px-6 md:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
