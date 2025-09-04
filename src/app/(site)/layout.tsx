import '../../styles/globals.css'; // Importa os estilos globais
import { Inter } from 'next/font/google'; // Importa a fonte Inter do Google
import Header from '../../components/Header'; // Importa o componente de cabeçalho
import Footer from '../../components/Footer'; // Importa o componente de rodapé
import CookieBar from '../../components/CookieBar'; // Importa a barra de cookies

// Fonte principal do site
const inter = Inter({ subsets: ['latin'] });

// Layout raiz com cabeçalho, rodapé e fundo estático
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      {/* Aplica a fonte Inter e renderiza os elementos principais */}
      <body className={inter.className}>
        <Header /> {/* Cabeçalho exibido no topo */}
        <main className="pt-16">{children}</main> {/* Conteúdo variável com espaço superior */}
        <Footer /> {/* Rodapé com informações adicionais */}
        <CookieBar /> {/* Aviso de cookies obrigatório */}
      </body>
    </html>
  );
}
