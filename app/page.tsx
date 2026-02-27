import Link from "next/link";

export default function HomePage() {
  return (
    <section>
      {/* Contém a secção principal centrada com largura confortável para o texto. */}
      <div className="mx-auto w-full max-w-5xl">
        {/* Cartão principal com proposta de valor e navegação rápida. */}
        <article className="rounded-[32px] bg-[color:var(--surface)] p-8 shadow-[0_20px_50px_rgba(31,41,55,0.08)]">
          <div className="flex flex-col gap-6">
            {/* Título principal da página com destaque de marca. */}
            <div>
              <h1 className="page-title text-justify">A tua conta, dados e contacto num só lugar.</h1>
            </div>

            {/* Botões de ação para orientar utilizadores novos e recorrentes. */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                className="button-size-login bg-[color:var(--primary)] text-white shadow-sm transition hover:brightness-95"
                href="/about"
              >
                Saber mais
              </Link>
              <Link
                className="button-size-login border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300"
                href="/dashboard"
              >
                Ir para dashboard
              </Link>
            </div>
          </div>
        </article>

        {/* Secção informativa com os principais blocos disponíveis na plataforma. */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <h2 className="subsection-title">Conta pessoal</h2>
            <p className="mt-2 text-sm text-slate-600">
              Atualize os seus dados de perfil, preferências e informação essencial de acesso.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
            <h2 className="subsection-title">Segurança</h2>
            <p className="mt-2 text-sm text-slate-600">
              Altere a palavra-passe e mantenha a sua conta protegida com boas práticas de autenticação.
            </p>
          </article>

          <article className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
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
