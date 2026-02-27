import Link from "next/link";

export default function HomePage() {
  return (
    <section className="pt-6 md:pt-10">
      {/* Estrutura principal da hero com tipografia e espaçamento inspirados no layout enviado. */}
      <div className="grid items-center gap-14">
        <article className="max-w-xl">
          {/* Rótulo pequeno para introduzir o bloco principal da página. */}
          <p className="section-label-uppercase text-[color:var(--primary)]">Novo Curso</p>

          {/* Mantém o conteúdo principal do site, ajustando apenas o estilo visual e hierarquia. */}
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#16152b] sm:text-6xl">
            O único curso de cliente mistério em Portugal
          </h1>

          <p className="mt-6 max-w-md text-lg text-slate-500">
            Sê dos primeiros Clientes Mistério certificados!
          </p>

          {/* Ação principal da hero com foco em conversão para iniciar o curso. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-95"
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
