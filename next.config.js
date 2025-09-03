/**
 * @type {import('next').NextConfig}
 * Configuração principal do Next.js, exportando o site de forma estática
 * e desativando a otimização automática de imagens.
 */
const nextConfig = {
  // Gera saída estática para deployment sem servidor
  output: 'export',
  // Desativa a otimização de imagens para compatibilidade com export estático
  images: { unoptimized: true },
};

// Exporta a configuração para uso pelo Next.js
module.exports = nextConfig;
