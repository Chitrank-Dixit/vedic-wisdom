import React from 'react';
import { Sutra } from '../types';

interface SutraCardProps {
  sutra: Sutra;
  onClick: (sutra: Sutra) => void;
}

const SutraCard: React.FC<SutraCardProps> = ({ sutra, onClick }) => {
  return (
    <button
      onClick={() => onClick(sutra)}
      className="group relative flex flex-col items-start p-6 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl bg-white rounded-xl border border-stone-200 overflow-hidden w-full"
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${sutra.colorClass} transition-all group-hover:w-full opacity-10`} />
      
      <div className="relative z-10 w-full">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${sutra.colorClass}`}>
            {sutra.difficulty}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-vedic-gold">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>

        <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 group-hover:text-vedic-deep">
          {sutra.sanskritName}
        </h3>
        <p className="text-sm text-vedic-gold font-medium mb-3 italic">
          "{sutra.englishTranslation}"
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {sutra.description}
        </p>
      </div>
    </button>
  );
};

export default SutraCard;