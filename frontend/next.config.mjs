/** Configuração do Next.js com headers de segurança e modo estrito */
const BACKEND = "https://clientemisterio-backend.onrender.com";

const csp = [
  "default-src 'self'",
  "img-src 'self' data:",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  // permitir fetch/XHR ao backend:
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
