import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative grid min-h-[calc(100vh-110px)] gap-8 overflow-hidden px-1 pb-8 pt-1 sm:px-3 lg:min-h-[calc(100vh-120px)] lg:grid-cols-[88px_1fr]">
      {/* Mostra a imagem no desktop sem gradiente para evitar qualquer transparência lateral. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(46vw,620px)] lg:block"
      >
        <Image
          alt="Cliente mistério em destaque"
          className="object-contain object-right-bottom"
          fill
          priority
          sizes="(max-width: 1024px) 0px, min(46vw, 620px)"
          src="/images/IMG_2622.png"
        />
      </div>

      {/* Constrói a coluna lateral com texto vertical e marcadores sociais, sem a linha vertical preta. */}
      <aside className="relative z-10 hidden py-8 lg:flex lg:flex-col lg:items-center lg:justify-between">
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
      <div className="relative z-10 grid items-start gap-8 pb-8 lg:items-center lg:gap-10">
        <article className="max-w-md bg-white p-4 shadow-[0_0_0_1px_rgba(0,0,0,0.03)] sm:p-5 lg:ml-6 lg:bg-transparent lg:p-0 lg:shadow-none">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)] sm:text-[11px] sm:tracking-[0.28em]">
            Novo Curso
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase leading-[0.95] tracking-tight text-[color:var(--foreground)] sm:mt-5 sm:text-5xl lg:text-6xl">
            O único curso de <span className="text-[color:var(--accent)]">cliente mistério</span> em Portugal
          </h1>

          <p className="mt-5 text-sm font-medium text-[#4a4a4a] sm:mt-6 sm:text-base">
            Sê dos primeiros Clientes Mistério certificados!
          </p>

          <div className="mt-7 sm:mt-8">
            <Link
              className="site-pill-button text-[10px] uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]"
              href="/about"
            >
              Começa Já
            </Link>
          </div>
        </article>

        {/* Mostra a foto em bloco dedicado no mobile para evitar sobreposição com o texto. */}
        <div className="relative mx-auto h-[320px] w-full max-w-[360px] lg:hidden">
          <Image
            alt="Cliente mistério em destaque"
            className="object-contain object-bottom"
            fill
            priority
            sizes="(max-width: 640px) 90vw, 360px"
            src="/images/IMG_2622.png"
          />
        </div>
      </div>
    </section>
  );
}
