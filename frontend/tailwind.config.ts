import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

// Configuração do TailwindCSS com cores preto e branco padrão
const config: Config = {
  // Diretórios onde o TailwindCSS procura por classes a serem compiladas
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    // Definição das cores preto e branco sem substituições
    colors: {
      ...colors, // Mantém todas as cores padrão do TailwindCSS
      inherit: 'inherit', // Mantém a herança de cor padrão
      transparent: 'transparent', // Preserva a opção de transparência
      current: 'currentColor', // Mantém a cor atual do elemento
      white: '#ffffff', // Cor branca padrão
      black: '#000000', // Cor preta padrão
    },
    extend: {},
  },
  plugins: [],
}

export default config
