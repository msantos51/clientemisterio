
/** Configuração do Next.js com headers de segurança e modo estrito */
// Política de Content Security Policy permitindo incorporar Genially
const csp = "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'self'; frame-src https://view.genial.ly; frame-ancestors 'none';"

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    // Define cabeçalhos de segurança para todas as rotas
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'same-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
