import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import TopNav from "./components/TopNav";
import HeaderActions from "./components/HeaderActions";
import "./globals.css";

// Configura a fonte base para todo o layout da aplicação.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Mantém uma fonte monoespaçada disponível para áreas técnicas quando necessário.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Usa Poppins para aproximar a estética visual da referência enviada.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Define metadados globais da aplicação.
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
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} bg-[color:var(--background)] text-[color:var(--foreground)] antialiased`}
      >
        {/* Cria a estrutura principal com cabeçalho fixo no topo visual e conteúdo centralizado. */}
        <div className="min-h-screen bg-[color:var(--background)]">
          {/* Organiza marca, navegação e ações com distribuição similar ao layout de referência. */}
          <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-4 pb-8 pt-8 sm:px-6 lg:px-8">
            <a className="text-2xl font-extrabold tracking-tight text-[#16152b]" href="/">
              Cliente Mistério
            </a>
            <TopNav />
            <HeaderActions />
          </header>

          {/* Renderiza o conteúdo de cada página no centro com largura confortável. */}
          <main className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
