import type { Config } from 'tailwindcss'

// Configuração do TailwindCSS utilizando a paleta padrão
const config: Config = {
  // Diretórios onde o TailwindCSS procura por classes a serem compiladas
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    // Mantém todas as cores padrão sem redefini-las
    extend: {},
  },
  plugins: [],
}

export default config
