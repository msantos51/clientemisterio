'use client';

import { useState } from 'react';
import Container from '../../../../components/Container';
import SectionTitle from '../../../../components/SectionTitle';
import Button from '../../../../components/Button';
import { modules } from './courseData';

// Página que apresenta os módulos e questionários do curso de cliente mistério
export default function MysteryClientCoursePage() {
  // Índice do módulo atual
  const [moduleIndex, setModuleIndex] = useState(0);
  // Índice da pergunta atual dentro do módulo
  const [questionIndex, setQuestionIndex] = useState(0);
  // Estado para mostrar se a resposta está correta ou não
  const [showFeedback, setShowFeedback] = useState(false);
  // Guarda o resultado da resposta selecionada
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  // Indica se o curso já foi concluído
  const [finished, setFinished] = useState(false);

  // Módulo e pergunta atuais
  const currentModule = modules[moduleIndex];
  const currentQuestion = currentModule.quiz[questionIndex];

  // Verificações para o fluxo do curso
  const isLastQuestion = questionIndex === currentModule.quiz.length - 1;
  const isLastModule = moduleIndex === modules.length - 1;

  // Trata a seleção de uma opção
  function handleAnswer(correct: boolean) {
    setIsCorrect(correct);
    setShowFeedback(true);
  }

  // Avança para a próxima pergunta ou módulo
  function handleNext() {
    setShowFeedback(false);
    setIsCorrect(null);

    if (isLastQuestion) {
      if (isLastModule) {
        setFinished(true);
      } else {
        setModuleIndex(moduleIndex + 1);
        setQuestionIndex(0);
      }
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  // Se o curso terminou, mostra mensagem final
  if (finished) {
    return (
      <Container>
        <section className="py-16 text-center">
          <SectionTitle title="Curso concluído" />
          <p className="mt-4">Parabéns! Concluiu todos os módulos.</p>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="py-8">
        <SectionTitle title={`Módulo ${moduleIndex + 1} - ${currentModule.title}`} />

        <h3 className="mt-6 text-lg font-semibold">Objetivos</h3>
        <ul className="ml-6 list-disc">
          {currentModule.objectives.map((obj, idx) => (
            <li key={idx}>{obj}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Conteúdo</h3>
        <ul className="ml-6 list-disc">
          {currentModule.content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <h3 className="mt-6 text-lg font-semibold">Resumo</h3>
        <p className="mt-2">{currentModule.summary}</p>
      </section>

      <section className="py-8">
        <h3 className="text-lg font-semibold">Pergunta {questionIndex + 1}</h3>
        <p className="mt-2">{currentQuestion.question}</p>
        <div className="mt-4 flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => (
            <Button
              key={idx}
              onClick={() => handleAnswer(option.correct)}
              disabled={showFeedback}
            >
              {option.text}
            </Button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-4">
            <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {isCorrect ? 'Resposta correta!' : 'Resposta incorreta.'}
            </p>
            <Button className="mt-4" onClick={handleNext}>
              {isLastQuestion ? (isLastModule ? 'Terminar Curso' : 'Próximo Módulo') : 'Próxima Pergunta'}
            </Button>
          </div>
        )}
      </section>
    </Container>
  );
}
