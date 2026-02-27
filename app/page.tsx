import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid min-h-[calc(100vh-120px)] gap-8 lg:grid-cols-[88px_1fr]">
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

      {/* Mantém o conteúdo original e aplica uma composição visual inspirada em editorial de moda. */}
      <div className="grid items-center gap-10 pb-8 lg:grid-cols-[minmax(320px,460px)_1fr]">
        <article className="relative z-10 max-w-md lg:pl-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">
            Novo Curso
          </p>

          <h1 className="mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:text-6xl">
            O único curso de cliente mistério em Portugal
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

        <div className="relative min-h-[420px] overflow-hidden rounded-sm bg-[#efefef] lg:min-h-[620px]">
          {/* Exibe imagem principal em preto e branco para reforçar o contraste com o acento vermelho. */}
          <Image
            alt="Pessoa em destaque no hero"
            className="object-cover grayscale"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            src="/images/hero-illustration.png"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
