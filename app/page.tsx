import Link from "next/link";

export default function HomePage() {
  return (
    <section className="hero-background grid min-h-[calc(100vh-120px)] gap-8 bg-no-repeat px-4 lg:grid-cols-[88px_1fr] lg:bg-[length:min(46vw,620px)_auto] lg:bg-[position:right_bottom]">
      {/* Constrói a coluna lateral com texto vertical e marcadores sociais para aproximar o layout original. */}
      <aside className="hidden border-r border-[color:var(--line)] py-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
        <p className="vertical-text text-[10px] font-semibold uppercase tracking-[0.35em] text-[color:var(--foreground)]">
          Bad Co.
        </p>

        <div className="flex flex-col items-center gap-5 text-xs text-[color:var(--foreground)]">
          <span aria-hidden>f</span>
          <span aria-hidden>t</span>
          <span aria-hidden>◎</span>
        </div>
      </aside>

      {/* Mantém o conteúdo textual em destaque e deixa a imagem como fundo no lado direito. */}
      <div className="grid items-center gap-10 pb-8">
        <article className="relative z-10 max-w-md bg-white/75 p-4 backdrop-blur-[1px] sm:p-5 lg:ml-6 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
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
