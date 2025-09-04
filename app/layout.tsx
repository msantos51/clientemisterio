+ import '../styles/globals.css'
+ import Header from '../components/Header'
+ import Footer from '../components/Footer'
+ import CookieBar from '../components/CookieBar

// Fonte principal do site
const inter = Inter({ subsets: ['latin'] });

// Layout raiz com cabeçalho, rodapé e fundo animado
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        {/* Contêiner com fundo animado */}
        <div className="animated-background">
          <Header /> {/* Cabeçalho exibido no topo */}
          <main className="pt-16">{children}</main> {/* Conteúdo variável com espaço superior */}
          <Footer /> {/* Rodapé com informações adicionais */}
          <CookieBar /> {/* Aviso de cookies obrigatório */}
        </div>
      </body>
    </html>
  );
}
