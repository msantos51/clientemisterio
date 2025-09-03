import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

// Cartão simples para destacar uma funcionalidade
export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="rounded border p-6 text-center shadow-sm">
      {icon && <div className="mb-4 text-accent">{icon}</div>}
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
