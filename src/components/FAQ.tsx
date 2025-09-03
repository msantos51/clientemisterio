'use client';

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

// Acordeão de FAQ com controlo de estado local
export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="rounded border">
          <button
            className="flex w-full items-center justify-between p-4 text-left"
            aria-expanded={openIndex === idx}
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span className="font-medium">{item.question}</span>
            <span>{openIndex === idx ? '-' : '+'}</span>
          </button>
          {openIndex === idx && <div className="p-4 pt-0 text-gray-700">{item.answer}</div>}
        </div>
      ))}
    </div>
  );
}
