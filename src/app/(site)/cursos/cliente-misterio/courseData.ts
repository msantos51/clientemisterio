// Este ficheiro contém os dados do curso de cliente mistério: módulos, conteúdos e questionários

// Tipo que representa cada opção de resposta
export interface QuizOption {
  text: string;
  correct: boolean;
}

// Tipo que representa cada pergunta do questionário
export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

// Tipo que representa cada módulo do curso
export interface Module {
  title: string;
  objectives: string[];
  content: string[];
  summary: string;
  quiz: QuizQuestion[];
}

// Lista de todos os módulos do curso
export const modules: Module[] = [
  {
    title: 'Introdução ao Cliente Mistério',
    objectives: [
      'Compreender o conceito de cliente mistério',
      'Perceber a importância da ferramenta para empresas',
      'Identificar o papel do avaliador',
    ],
    content: [
      'Definição de cliente mistério',
      'História e evolução da metodologia',
      'Áreas de aplicação: retalho, restauração, automóvel, turismo, serviços públicos',
      'Benefícios para empresas e clientes',
      'Perfil do cliente mistério ideal',
    ],
    summary:
      'O cliente mistério é uma ferramenta estratégica usada pelas empresas para medir qualidade de serviço de forma anónima e imparcial.',
    quiz: [
      {
        question: 'O que é um cliente mistério?',
        options: [
          { text: 'Um inspetor da ASAE', correct: false },
          { text: 'Um cliente que reclama sempre', correct: false },
          { text: 'Um avaliador anónimo que testa o serviço', correct: true },
          { text: 'Um funcionário da empresa', correct: false },
        ],
      },
      {
        question: 'Quais são as áreas onde se aplica o cliente mistério?',
        options: [
          { text: 'Agricultura e pecuária', correct: false },
          { text: 'Retalho, restauração, automóvel, turismo e serviços públicos', correct: true },
          { text: 'Apenas hotéis de luxo', correct: false },
          { text: 'Apenas supermercados', correct: false },
        ],
      },
      {
        question: 'O cliente mistério avalia de forma…',
        options: [
          { text: 'Subjetiva, baseada em opinião', correct: false },
          { text: 'Objetiva, baseada em factos observados', correct: true },
          { text: 'Aleatória', correct: false },
          { text: 'Em função da amizade com o funcionário', correct: false },
        ],
      },
      {
        question: 'Quais os benefícios para as empresas?',
        options: [
          { text: 'Criar campanhas de publicidade', correct: false },
          { text: 'Melhorar qualidade de serviço e identificar falhas', correct: true },
          { text: 'Aumentar impostos', correct: false },
          { text: 'Substituir funcionários', correct: false },
        ],
      },
      {
        question: 'O que se espera de um cliente mistério?',
        options: [
          { text: 'Que seja famoso', correct: false },
          { text: 'Que gaste muito dinheiro', correct: false },
          { text: 'Discrição, imparcialidade e capacidade de observação', correct: true },
          { text: 'Que avise os funcionários', correct: false },
        ],
      },
      {
        question: 'O cliente mistério deve ser identificado pelo funcionário?',
        options: [
          { text: 'Sempre', correct: false },
          { text: 'Às vezes', correct: false },
          { text: 'Nunca', correct: true },
          { text: 'Apenas se pedir', correct: false },
        ],
      },
      {
        question: 'Diferença entre cliente mistério e inquérito de satisfação?',
        options: [
          { text: 'Nenhuma diferença', correct: false },
          { text: 'Cliente mistério é treinado, inquérito é cliente real', correct: true },
          { text: 'O inquérito é secreto', correct: false },
          { text: 'O cliente mistério paga mais caro', correct: false },
        ],
      },
      {
        question: 'Porque é importante a imparcialidade?',
        options: [
          { text: 'Para agradar ao funcionário', correct: false },
          { text: 'Para ter prémios', correct: false },
          { text: 'Para garantir relatórios fiáveis e justos', correct: true },
          { text: 'Para acabar mais rápido', correct: false },
        ],
      },
      {
        question: 'Quem pode ser cliente mistério?',
        options: [
          { text: 'Apenas jornalistas', correct: false },
          { text: 'Apenas empresários', correct: false },
          { text: 'Qualquer pessoa comum com perfil adequado', correct: true },
          { text: 'Apenas estudantes', correct: false },
        ],
      },
      {
        question: 'Em que setor nasceu a metodologia?',
        options: [
          { text: 'Saúde', correct: false },
          { text: 'Retalho', correct: true },
          { text: 'Agricultura', correct: false },
          { text: 'Ensino', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Preparação da Visita',
    objectives: [
      'Aprender a interpretar um guião de avaliação',
      'Preparar corretamente uma missão de cliente mistério',
      'Saber que elementos observar durante a visita',
    ],
    content: [
      'O que é o guião de visita',
      'Instruções recebidas pela agência',
      'Preparação antes da visita (documentos, horários, contexto)',
      'Pontos de atenção: limpeza, atendimento, conhecimento do produto, simpatia',
      'Como manter a naturalidade',
    ],
    summary:
      'A preparação é essencial para recolher informação com rigor sem levantar suspeitas.',
    quiz: [
      {
        question: 'O que é um guião de visita?',
        options: [
          { text: 'Um mapa da cidade', correct: false },
          { text: 'Um conjunto de instruções e critérios a avaliar', correct: true },
          { text: 'Um folheto publicitário', correct: false },
          { text: 'Uma lista de compras', correct: false },
        ],
      },
      {
        question: 'Porque ler o guião antes da visita?',
        options: [
          { text: 'Para decorar promoções', correct: false },
          { text: 'Para saber o que observar e perguntar', correct: true },
          { text: 'Para enganar o funcionário', correct: false },
          { text: 'Para parecer mais profissional', correct: false },
        ],
      },
      {
        question: 'O cliente mistério deve decorar as perguntas?',
        options: [
          { text: 'Sim, para não levantar suspeitas', correct: true },
          { text: 'Não, deve levar cábula', correct: false },
          { text: 'Só se quiser', correct: false },
          { text: 'Nunca', correct: false },
        ],
      },
      {
        question: 'O que observar logo à entrada?',
        options: [
          { text: 'Limpeza, organização e receção', correct: true },
          { text: 'A cor das paredes', correct: false },
          { text: 'A roupa dos clientes', correct: false },
          { text: 'O logótipo da empresa', correct: false },
        ],
      },
      {
        question: 'O papel do horário na visita?',
        options: [
          { text: 'Nenhum', correct: false },
          { text: 'Avaliar em contexto real definido', correct: true },
          { text: 'Escolher horas vazias', correct: false },
          { text: 'Escolher quando for conveniente', correct: false },
        ],
      },
      {
        question: 'Manter a naturalidade significa…',
        options: [
          { text: 'Fingir ser ator', correct: false },
          { text: 'Agir como cliente normal', correct: true },
          { text: 'Ser frio e distante', correct: false },
          { text: 'Falar muito alto', correct: false },
        ],
      },
      {
        question: 'Se for reconhecido como cliente mistério…',
        options: [
          { text: 'Fugir', correct: false },
          { text: 'Manter calma e não confirmar', correct: true },
          { text: 'Admitir logo', correct: false },
          { text: 'Cancelar o relatório', correct: false },
        ],
      },
      {
        question: 'Funcionário não segue guião esperado…',
        options: [
          { text: 'Ignorar', correct: false },
          { text: 'Registar exatamente o que aconteceu', correct: true },
          { text: 'Corrigir o funcionário', correct: false },
          { text: 'Ir embora', correct: false },
        ],
      },
      {
        question: 'O que levar consigo?',
        options: [
          { text: 'Folha do guião na mão', correct: false },
          { text: 'Guião memorizado e atenção aos detalhes', correct: true },
          { text: 'Máquina fotográfica visível', correct: false },
          { text: 'Questionário impresso', correct: false },
        ],
      },
      {
        question: 'Deve avisar os funcionários antes de entrar?',
        options: [
          { text: 'Sim', correct: false },
          { text: 'Apenas se for amigo', correct: false },
          { text: 'Não, nunca', correct: true },
          { text: 'Se for restaurante', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Execução da Visita',
    objectives: [
      'Realizar a missão mantendo discrição',
      'Recolher informação sem interferir no serviço',
      'Registar detalhes relevantes para o relatório',
    ],
    content: [
      'Técnicas de observação atenta',
      'Atenção ao comportamento verbal e não verbal do funcionário',
      'Recolha de tempo de espera, saudações, despedida',
      'Como lidar com situações inesperadas',
      'Exemplos de boas práticas',
    ],
    summary:
      'A execução da visita é o momento-chave para recolher dados que permitirão avaliar a experiência.',
    quiz: [
      {
        question: 'Regra principal durante a execução?',
        options: [
          { text: 'Fotografar tudo', correct: false },
          { text: 'Ser discreto e agir naturalmente', correct: true },
          { text: 'Fazer muitas perguntas estranhas', correct: false },
          { text: 'Gravar vídeo', correct: false },
        ],
      },
      {
        question: 'Observar discretamente é…',
        options: [
          { text: 'Disfarçar com óculos escuros', correct: false },
          { text: 'Fingir estar ao telefone', correct: false },
          { text: 'Prestar atenção sem chamar atenção', correct: true },
          { text: 'Não observar nada', correct: false },
        ],
      },
      {
        question: 'O que registar sobre tempo de espera?',
        options: [
          { text: 'A opinião do funcionário', correct: false },
          { text: 'Tempo exato até atendimento', correct: true },
          { text: 'Apenas se for demorado', correct: false },
          { text: 'Nunca', correct: false },
        ],
      },
      {
        question: 'Como avaliar linguagem corporal?',
        options: [
          { text: 'Observar postura, expressões, contacto visual', correct: true },
          { text: 'Perguntar ao funcionário se está cansado', correct: false },
          { text: 'Especular', correct: false },
          { text: 'Ignorar', correct: false },
        ],
      },
      {
        question: 'Se visita corre diferente do guião…',
        options: [
          { text: 'Registar factualmente o que ocorreu', correct: true },
          { text: 'Inventar o esperado', correct: false },
          { text: 'Repetir a visita', correct: false },
          { text: 'Desistir', correct: false },
        ],
      },
      {
        question: 'Como reagir a erro do funcionário?',
        options: [
          { text: 'Corrigir imediatamente', correct: false },
          { text: 'Agir como cliente normal', correct: true },
          { text: 'Rir-se', correct: false },
          { text: 'Reclamar no momento', correct: false },
        ],
      },
      {
        question: 'É permitido gravar sem autorização?',
        options: [
          { text: 'Não, salvo instruções da agência', correct: true },
          { text: 'Sempre', correct: false },
          { text: 'Sim, com telemóvel escondido', correct: false },
          { text: 'Depende da loja', correct: false },
        ],
      },
      {
        question: 'Que notas tirar durante a visita?',
        options: [
          { text: 'Muitas, em frente do funcionário', correct: false },
          { text: 'Discretas ou mentais', correct: true },
          { text: 'Nenhuma', correct: false },
          { text: 'Apenas no carro', correct: false },
        ],
      },
      {
        question: 'Impacto de demonstrar nervosismo?',
        options: [
          { text: 'Nenhum', correct: false },
          { text: 'Levanta suspeitas e compromete missão', correct: true },
          { text: 'É positivo', correct: false },
          { text: 'Ajuda a disfarçar', correct: false },
        ],
      },
      {
        question: '“Naturalidade” significa…',
        options: [
          { text: 'Ser frio', correct: false },
          { text: 'Agir como cliente real', correct: true },
          { text: 'Não falar com ninguém', correct: false },
          { text: 'Fingir papel teatral', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Elaboração do Relatório',
    objectives: [
      'Estruturar e preencher relatórios com clareza',
      'Distinguir entre factos e opiniões',
      'Entregar no prazo estipulado',
    ],
    content: [
      'Estrutura típica do relatório',
      'Linguagem objetiva e factual',
      'Exemplos de descrições corretas vs incorretas',
      'Importância da pontualidade na entrega',
      'Consequências de relatórios imprecisos',
    ],
    summary:
      'Um relatório bem feito é essencial para a credibilidade do cliente mistério e utilidade da avaliação.',
    quiz: [
      {
        question: 'O que deve conter um relatório de cliente mistério?',
        options: [
          { text: 'Fotos do funcionário', correct: false },
          { text: 'Descrição detalhada e objetiva da visita', correct: true },
          { text: 'Opinião pessoal apenas', correct: false },
          { text: 'História inventada', correct: false },
        ],
      },
      {
        question: 'Qual a diferença entre opinião e facto?',
        options: [
          { text: 'Nenhuma', correct: false },
          { text: 'Opinião é julgamento pessoal, facto é verificável', correct: true },
          { text: 'Ambos são iguais', correct: false },
          { text: 'Facto é subjetivo', correct: false },
        ],
      },
      {
        question: 'Porque é importante ser objetivo?',
        options: [
          { text: 'Para escrever menos', correct: false },
          { text: 'Para que a empresa confie nos resultados', correct: true },
          { text: 'Para agradar ao funcionário', correct: false },
          { text: 'Para parecer inteligente', correct: false },
        ],
      },
      {
        question: 'O que acontece se faltar informação essencial?',
        options: [
          { text: 'Não tem problema', correct: false },
          { text: 'Relatório pode ser rejeitado', correct: true },
          { text: 'Fica melhor', correct: false },
          { text: 'O cliente ganha mais pontos', correct: false },
        ],
      },
      {
        question: 'O relatório pode ser entregue fora do prazo?',
        options: [
          { text: 'Sim', correct: false },
          { text: 'Só se avisar', correct: false },
          { text: 'Não', correct: true },
          { text: 'Apenas em lojas pequenas', correct: false },
        ],
      },
      {
        question: 'Exemplos de linguagem a evitar',
        options: [
          { text: 'Clara e simples', correct: false },
          { text: '“Acho que”, “pareceu-me”', correct: true },
          { text: 'Factual', correct: false },
          { text: 'Objetiva', correct: false },
        ],
      },
      {
        question: 'O que significa clareza na escrita?',
        options: [
          { text: 'Usar frases longas', correct: false },
          { text: 'Escrever simples, direto e compreensível', correct: true },
          { text: 'Usar palavras difíceis', correct: false },
          { text: 'Escrever de forma poética', correct: false },
        ],
      },
      {
        question: 'Porque é importante usar exemplos concretos?',
        options: [
          { text: 'Decora melhor', correct: false },
          { text: 'Ilustra e fundamenta avaliação', correct: true },
          { text: 'Enche espaço', correct: false },
          { text: 'Parece mais bonito', correct: false },
        ],
      },
      {
        question: 'Qual a consequência de inventar informações?',
        options: [
          { text: 'Mais pontos', correct: false },
          { text: 'Perda de credibilidade e exclusão', correct: true },
          { text: 'Promoção', correct: false },
          { text: 'Aceitação automática', correct: false },
        ],
      },
      {
        question: 'Quem lê e valida o relatório?',
        options: [
          { text: 'O funcionário avaliado', correct: false },
          { text: 'O próprio cliente', correct: false },
          { text: 'Agência e empresa contratante', correct: true },
          { text: 'Governo', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Ética e Boas Práticas',
    objectives: [
      'Conhecer os princípios éticos do cliente mistério',
      'Identificar erros a evitar',
      'Garantir confidencialidade e profissionalismo',
    ],
    content: [
      'Confidencialidade da missão',
      'Imparcialidade e neutralidade',
      'Comportamentos proibidos (chantagem, suborno, falsificação)',
      'Profissionalismo e respeito pelo funcionário avaliado',
      'Impacto do cliente mistério na qualidade do serviço',
    ],
    summary:
      'Ser cliente mistério é ser imparcial, ético e profissional, garantindo resultados fiáveis.',
    quiz: [
      {
        question: 'O que significa confidencialidade no cliente mistério?',
        options: [
          { text: 'Partilhar com amigos', correct: false },
          { text: 'Não divulgar missão a terceiros', correct: true },
          { text: 'Postar nas redes sociais', correct: false },
          { text: 'Guardar fotos no telemóvel', correct: false },
        ],
      },
      {
        question: 'Porque é importante manter neutralidade?',
        options: [
          { text: 'Para acabar rápido', correct: false },
          { text: 'Para ser simpático', correct: false },
          { text: 'Para não influenciar a avaliação', correct: true },
          { text: 'Para agradar à empresa', correct: false },
        ],
      },
      {
        question: 'Quais os comportamentos proibidos?',
        options: [
          { text: 'Cumprimentar', correct: false },
          { text: 'Chantagem, suborno, falsificação', correct: true },
          { text: 'Ser simpático', correct: false },
          { text: 'Fazer perguntas', correct: false },
        ],
      },
      {
        question: 'O que fazer se conhecer o funcionário avaliado?',
        options: [
          { text: 'Ignorar', correct: false },
          { text: 'Avisar agência e recusar missão', correct: true },
          { text: 'Fazer mesmo', correct: false },
          { text: 'Esconder amizade', correct: false },
        ],
      },
      {
        question: 'É permitido falar da missão a familiares?',
        options: [
          { text: 'Sim', correct: false },
          { text: 'Só aos pais', correct: false },
          { text: 'Não', correct: true },
          { text: 'Apenas depois', correct: false },
        ],
      },
      {
        question: 'Como agir em caso de conflito de interesses?',
        options: [
          { text: 'Continuar', correct: false },
          { text: 'Recusar missão e avisar agência', correct: true },
          { text: 'Ocultar', correct: false },
          { text: 'Inventar desculpa', correct: false },
        ],
      },
      {
        question: 'O que significa imparcialidade?',
        options: [
          { text: 'Ser simpático', correct: false },
          { text: 'Avaliar apenas factos observados', correct: true },
          { text: 'Dar sempre nota máxima', correct: false },
          { text: 'Não responder', correct: false },
        ],
      },
      {
        question: 'Qual o impacto da ética na credibilidade do cliente mistério?',
        options: [
          { text: 'Nenhum', correct: false },
          { text: 'Garante confiança e fiabilidade', correct: true },
          { text: 'Só atrasa', correct: false },
          { text: 'Apenas decora', correct: false },
        ],
      },
      {
        question: 'O que deve fazer perante erros pequenos do funcionário?',
        options: [
          { text: 'Ignorar', correct: false },
          { text: 'Exagerar', correct: false },
          { text: 'Registar factualmente', correct: true },
          { text: 'Perdoar', correct: false },
        ],
      },
      {
        question: 'O que distingue um bom cliente mistério?',
        options: [
          { text: 'Gastar muito', correct: false },
          { text: 'Falar alto', correct: false },
          { text: 'Discrição, objetividade, ética e profissionalismo', correct: true },
          { text: 'Ser amigo dos funcionários', correct: false },
        ],
      },
    ],
  },
];
