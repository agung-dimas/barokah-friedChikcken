import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <details className="bg-surface-container-lowest rounded-xl border border-surface-variant shadow-sm group">
      <summary className="flex justify-between items-center font-display text-xl font-bold p-6 cursor-pointer list-none">
        <span>{question}</span>
        <span className="transition group-open:rotate-180 text-primary-container">
          <span className="material-symbols-outlined">expand_more</span>
        </span>
      </summary>
      <div className="text-on-surface-variant p-6 pt-0 font-body leading-relaxed border-t border-surface-variant/30 mt-2">
        {answer}
      </div>
    </details>
  );
};

export default FAQItem;
