import '../../styles/globals.css';
import { Inter } from 'next/font/google';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CookieBar from '../../components/CookieBar';

const inter = Inter({ subsets: ['latin'] });

// Layout raiz com cabeçalho, rodapé e fontes
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <CookieBar />
      </body>
    </html>
  );
}
