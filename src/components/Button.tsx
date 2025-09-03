'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// Botão reutilizável com variantes principais e secundárias
export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'rounded px-4 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles =
    variant === 'primary'
      ? 'bg-accent text-white hover:bg-accent/90 focus:ring-accent'
      : 'bg-white text-accent border border-accent hover:bg-accent/10 focus:ring-accent';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
