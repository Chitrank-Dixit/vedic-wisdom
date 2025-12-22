import React, { useState } from 'react';
import { Sutra, SutraDetail } from '../types';
import { generateSutraDetails } from '../services/geminiService';

interface SutraCardProps {
  sutra: Sutra;
  onClick: (sutra: Sutra) => void;
}

const SutraCard: React.FC<SutraCardProps> = ({ sutra, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [details, setDetails] = useState<SutraDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExpand = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);

    if (newExpandedState && !details) {
      setLoading(true);
      try {
        const data = await generateSutraDetails(sutra);
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(sutra);
  };

  return (
    <div
      className={`group relative flex flex-col text-left transition-all duration-300 transform bg-white rounded-xl border border-stone-200 overflow-hidden w-full ${isExpanded ? 'shadow-2xl ring-1 ring-vedic-gold/50 z-10 scale-[1.02]' : 'hover:scale-[1.02] hover:shadow-[0_10px_40px_-10px_rgba(212,175,55,0.5)] hover:border-vedic-gold/50'}`}
      onClick={handleExpand}
    >
      <div className={`absolute top-0 left-0 w-2 h-full ${sutra.colorClass} transition-all duration-300 ${isExpanded ? 'w-full opacity-5' : 'group-hover:w-full group-hover:opacity-10'}`} />
      
      {/* Main Content Area */}
      <div className="relative z-10 w-full p-6 pb-2 cursor-pointer">
        <div className="flex justify-between items-start mb-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full text-white ${sutra.colorClass}`}>
            {sutra.difficulty}
          </span>
          
          {/* Start Action Button */}
          <button 
            onClick={handleStart}
            className="bg-stone-100 hover:bg-vedic-teal hover:text-white p-2 rounded-full text-gray-400 transition-all shadow-sm group-hover:scale-110 z-20"
            title="Start Practice"
          >
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
          </button>
        </div>

        <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 group-hover:text-vedic-deep">
          {sutra.sanskritName}
        </h3>
        <p className="text-sm text-vedic-gold font-medium mb-3 italic">
          "{sutra.englishTranslation}"
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {sutra.description}
        </p>
      </div>

      {/* Expand/Collapse Toggle Section */}
      <div className="relative z-20 px-6 pb-4 pt-0">
        <div
          className="flex items-center gap-1 text-xs font-bold text-gray-400 group-hover:text-vedic-teal transition-colors uppercase tracking-wider cursor-pointer"
        >
          {isExpanded ? (
            <>
              <span>Less Info</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            </>
          ) : (
             <>
              <span>More Info</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5-7.5" />
              </svg>
             </>
          )}
        </div>

        {/* Expanded Content */}
        <div 
          className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        >
          <div className="overflow-hidden">
            {loading ? (
              <div className="py-4 space-y-2 animate-pulse">
                <div className="h-2 bg-stone-200 rounded w-3/4"></div>
                <div className="h-2 bg-stone-200 rounded w-full"></div>
                <div className="h-2 bg-stone-200 rounded w-5/6"></div>
              </div>
            ) : details ? (
              <div className="space-y-4 pb-2 border-t border-stone-100 pt-4" onClick={(e) => e.stopPropagation()}>
                <div>
                   <h4 className="text-xs font-bold text-vedic-deep uppercase mb-1">Summary</h4>
                   <p className="text-sm text-gray-700 leading-relaxed">{details.summary}</p>
                </div>
                
                <div>
                  <h4 className="text-xs font-bold text-vedic-deep uppercase mb-1">Use Cases</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {details.useCases.map((useCase, idx) => (
                      <li key={idx}>{useCase}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <h4 className="text-xs font-bold text-stone-500 uppercase mb-1">Math Deep Dive</h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-serif italic">
                    {details.mathDeepDive}
                  </p>
                </div>

                <button 
                   onClick={handleStart}
                   className="w-full mt-2 bg-vedic-deep text-vedic-gold py-2.5 rounded-lg font-bold text-sm hover:bg-opacity-90 transition flex items-center justify-center gap-2"
                 >
                   <span>Start Now</span>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                 </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SutraCard;