'use client';

import { useEffect, useState } from 'react';
import Button from './Button';

// Barra simples de consentimento de cookies
export default function CookieBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between bg-gray-800 p-4 text-sm text-white">
      <span>Este site utiliza cookies para melhorar a experiência.</span>
      <Button onClick={accept}>Aceitar</Button>
    </div>
  );
}
