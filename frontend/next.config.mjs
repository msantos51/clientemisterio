/** Configuração do Next.js com headers de segurança e modo estrito */
// URL do backend, lida das variáveis de ambiente em tempo de build
// se a variável não existir, usa o domínio do serviço no Render
const BACKEND =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://clientemisterio-backend.onrender.com';

const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  // permitir scripts locais e o script de feedback do Vercel
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  // permitir folhas de estilo locais e externas necessárias para as fontes
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.cdnfonts.com",
  // permitir carregamento de fontes externas
  "font-src 'self' https://fonts.gstatic.com https://fonts.cdnfonts.com",
  // permitir fetch/XHR ao backend definido em BACKEND
  `connect-src 'self' ${BACKEND}`,
  // permitir o embed do Genially:
  "frame-src https://view.genially.com",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
