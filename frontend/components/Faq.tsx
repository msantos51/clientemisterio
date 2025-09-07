'use client'

// Secção de perguntas frequentes com respostas mostradas ao clicar

// Dados das perguntas e respostas
const faqItems = [
  {
    question: 'O que é o curso de Cliente Mistério?',
    answer:
      'O curso de Cliente Mistério ensina técnicas e práticas para avaliar a qualidade do atendimento ao cliente e o funcionamento de estabelecimentos comerciais de maneira sigilosa, identificando pontos de melhoria e oferecendo feedback detalhado.',
  },
  {
    question: 'Quem pode fazer este curso?',
    answer:
      'Qualquer pessoa interessada em aprender sobre o papel de um cliente mistério, seja para uso pessoal, profissional ou até para se candidatar a vagas na área. Não é necessário ter experiência prévia.',
  },
  {
    question: 'Como o curso é entregue?',
    answer:
      'Após a compra, você terá acesso a todo o curso no nosso site. Basta fazer login e concluir o curso.',
  },
  {
    question: 'Existe algum tipo de suporte durante o curso?',
    answer:
      'Sim! Você pode entrar em contato com nosso suporte para esclarecer dúvidas sobre o conteúdo do curso. Os detalhes de contato estão incluídos no material.',
  },
  {
    question: 'Receberei um certificado ao concluir o curso?',
    answer:
      'Sim, ao completar o teste final, você poderá receber um certificado de conclusão. O certificado será enviado para o e-mail cadastrado.',
  },
  {
    question: 'Quanto tempo leva para concluir o curso?',
    answer:
      'O curso é autoinstrucional, então você pode avançar no seu próprio ritmo. Em média, ele pode ser concluído em algumas horas, dependendo do tempo dedicado.',
  },
  {
    question: 'Como funciona o pagamento?',
    answer:
      'O pagamento é realizado através de cartão ou PayPal. Todos os métodos são completamente seguros e rápidos.',
  },
]

// Renderiza a secção de FAQ na página
export function Faq() {
  return (
    // Adiciona margem superior para afastar as FAQs da secção anterior
    <section className="mx-auto mt-10 max-w-3xl pb-20">
        {/* Título das FAQs com texto branco */}
        <h2 className="mb-8 text-center text-3xl font-bold text-white">FAQs</h2>
      {/* Lista de perguntas */}
      <div className="space-y-4">
        {faqItems.map((item) => (
          // Cada item expansível com pergunta e resposta
          <details
            key={item.question}
            className="rounded-lg bg-white p-4 text-black shadow"
          >
              {/* Pergunta visível em negrito que pode ser clicada */}
              <summary className="cursor-pointer font-bold">{item.question}</summary>
            {/* Resposta apresentada ao clicar na pergunta */}
            <p className="mt-2 text-black">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

