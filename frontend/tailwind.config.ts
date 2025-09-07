import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

// Configuração do TailwindCSS com substituição das cores básicas
const config: Config = {
  // Diretórios onde o TailwindCSS procura por classes a serem compiladas
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    // Definição das cores para sobrescrever o branco e o preto padrão
    colors: {
      ...colors, // Mantém todas as cores padrão do TailwindCSS
      inherit: 'inherit', // Mantém a herança de cor padrão
      transparent: 'transparent', // Preserva a opção de transparência
      current: 'currentColor', // Mantém a cor atual do elemento
      white: '#8c1c5c', // Substitui o branco pelo tom definido pelo cliente
      black: '#d36847', // Substitui o preto pelo tom definido pelo cliente
    },
    extend: {},
  },
  plugins: [],
}

export default config
