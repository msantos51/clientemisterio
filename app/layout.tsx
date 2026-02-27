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
        {/* Desenha o container principal com contorno fino para replicar a moldura da referência. */}
        <div className="mx-auto min-h-screen w-full max-w-[1400px] border border-[color:var(--accent)] bg-[color:var(--background)]">
          {/* Cria a faixa superior com navegação central e ações discretas à direita. */}
          <header className="flex items-center justify-between px-6 py-6 md:px-10">
            <a
              className="text-xs font-black uppercase tracking-[0.35em] text-[color:var(--foreground)]"
              href="/"
            >
              Cliente Mistério
            </a>
            <TopNav />
            <HeaderActions />
          </header>

          {/* Renderiza o conteúdo da página respeitando a largura do layout editorial. */}
          <main className="px-6 pb-10 md:px-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
