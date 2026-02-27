import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative grid min-h-[calc(100vh-120px)] gap-8 overflow-hidden px-4 lg:grid-cols-[88px_1fr]">
      {/* Cria uma camada visual fixa do lado direito para garantir que a imagem aparece sempre no hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(46vw,620px)] bg-contain bg-right-bottom bg-no-repeat lg:block"
        style={{
          backgroundImage:
            "linear-gradient(to left, rgba(244, 244, 244, 0.15) 0%, rgba(244, 244, 244, 0.45) 24%, rgba(244, 244, 244, 0.88) 100%), url('/images/hero-illustration.svg')",
        }}
      />

      {/* Adiciona uma versão mobile da imagem de fundo para manter destaque visual em ecrãs pequenos. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[46vh] bg-contain bg-center bg-no-repeat lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(244, 244, 244, 0.72) 18%, rgba(244, 244, 244, 0.92) 100%), url('/images/hero-illustration.svg')",
        }}
      />

      {/* Constrói a coluna lateral com texto vertical e marcadores sociais para aproximar o layout original. */}
      <aside className="relative z-10 hidden border-r border-[color:var(--line)] py-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <p className="vertical-text text-[10px] font-semibold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
          Bad Co.
        </p>

        <div className="flex flex-col items-center gap-5 text-xs text-[color:var(--foreground)]">
          <span aria-hidden>f</span>
          <span aria-hidden>t</span>
          <span aria-hidden>◎</span>
        </div>
      </aside>

      {/* Mantém o conteúdo textual em primeiro plano para legibilidade sobre a imagem de fundo. */}
      <div className="relative z-10 grid items-center gap-10 pb-8">
        <article className="max-w-md bg-white/80 p-4 backdrop-blur-[1px] sm:p-5 lg:ml-6 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
            Novo Curso
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:text-6xl">
            O único curso de <span className="text-[color:var(--accent)]">cliente mistério</span> em Portugal
          </h1>

          <p className="mt-6 text-base font-medium text-[#4a4a4a]">
            Sê dos primeiros Clientes Mistério certificados!
          </p>

          <div className="mt-8">
            <Link
              className="inline-flex items-center justify-center border border-[color:var(--foreground)] bg-white px-8 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--foreground)] transition hover:bg-[color:var(--foreground)] hover:text-white"
              href="/about"
            >
              Começa Já
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
