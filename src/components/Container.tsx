import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

// Componente utilitário que centraliza o conteúdo na página
export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto max-w-7xl px-4">{children}</div>;
}
