import Link from "next/link";

export default function HomePage() {
  return (
    <section className="pt-6 md:pt-10">
      {/* Estrutura principal da hero com tipografia e espaçamento inspirados no layout enviado. */}
      <div className="grid items-center gap-14 md:grid-cols-[1fr_0.9fr]">
        <article className="max-w-xl">
          {/* Rótulo pequeno para introduzir o bloco principal da página. */}
          <p className="section-label-uppercase text-[color:var(--primary)]">Nova plataforma</p>

          {/* Mantém o conteúdo principal do site, ajustando apenas o estilo visual e hierarquia. */}
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-[#16152b] sm:text-6xl">
            A tua conta, dados e contacto num só lugar.
          </h1>

          <p className="mt-6 max-w-md text-lg text-slate-500">
            Gere informação pessoal, segurança e comunicação com a equipa através de uma experiência simples e
            consistente.
          </p>

          {/* Ações principais com botão primário e secundário conforme organização da referência. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              className="inline-flex items-center justify-center rounded-full bg-[color:var(--primary)] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-95"
              href="/about"
            >
              Saber mais
            </Link>
            <Link
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-[color:var(--primary)] text-[color:var(--primary)] transition hover:bg-[color:var(--primary-soft)]"
              href="/dashboard"
            >
              ▶
            </Link>
          </div>
        </article>

        {/* Bloco lateral para preservar o conteúdo atual da home em formato de cartões resumidos. */}
        <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <h2 className="subsection-title">Conta pessoal</h2>
            <p className="mt-2 text-sm text-slate-600">
              Atualize os seus dados de perfil, preferências e informação essencial de acesso.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <h2 className="subsection-title">Segurança</h2>
            <p className="mt-2 text-sm text-slate-600">
              Altere a palavra-passe e mantenha a sua conta protegida com boas práticas de autenticação.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:col-span-2 md:col-span-1">
            <h2 className="subsection-title">Contacto</h2>
            <p className="mt-2 text-sm text-slate-600">
              Fale com a equipa através do formulário de contacto para suporte e informações.
            </p>
          </article>
        </section>
      </div>
    </section>
  );
}
