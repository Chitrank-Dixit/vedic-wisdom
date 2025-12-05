import React, { useState, useEffect } from 'react';
import { Sutra, TutorialData } from '../types';
import { generateSutraTutorial } from '../services/geminiService';

interface TutorialArenaProps {
  sutra: Sutra;
  onBack: () => void;
  onStartPractice: () => void;
}

const TutorialArena: React.FC<TutorialArenaProps> = ({ sutra, onBack, onStartPractice }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TutorialData | null>(null);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const fetchTutorial = async () => {
      setLoading(true);
      try {
        const result = await generateSutraTutorial(sutra);
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorial();
  }, [sutra]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-16 h-16 border-4 border-vedic-teal border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-lg text-vedic-deep animate-pulse">Preparing Lesson...</p>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-center text-red-600">Failed to load tutorial.</div>;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div>
          <h2 className="font-serif text-2xl font-bold text-vedic-deep">Tutorial: {sutra.sanskritName}</h2>
          <p className="text-sm text-gray-500">{data.title}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
        
        {/* Concept Section */}
        <div className="p-8 border-b border-stone-100 bg-stone-50">
          <h3 className="text-lg font-bold text-gray-800 mb-2 font-serif">The Concept</h3>
          <p className="text-gray-700 leading-relaxed">{data.concept}</p>
        </div>

        {/* Interactive Example */}
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-gray-800 font-serif">Example Walkthrough</h3>
             <span className="bg-vedic-teal text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest">
                {data.exampleProblem}
             </span>
          </div>

          <div className="space-y-4 mb-8">
             {data.steps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`flex gap-4 p-4 rounded-xl border transition-all duration-500 transform ${
                    idx <= stepIndex 
                      ? 'opacity-100 translate-y-0 bg-white border-stone-200 shadow-sm' 
                      : 'opacity-0 translate-y-4 bg-transparent border-transparent'
                  }`}
                  style={{ display: idx <= stepIndex ? 'flex' : 'none' }} 
                >
                  <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${idx === stepIndex ? 'bg-vedic-gold text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {idx + 1}
                  </div>
                  <p className="text-gray-800 font-medium">{step}</p>
                </div>
             ))}
          </div>

          <div className="flex justify-center mb-8">
            {stepIndex < data.steps.length - 1 ? (
              <button
                onClick={() => setStepIndex(prev => prev + 1)}
                className="group flex items-center gap-2 bg-stone-800 text-white px-6 py-3 rounded-lg hover:bg-stone-900 transition-all shadow-md hover:shadow-lg"
              >
                <span>Next Step</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <div className="text-center animate-fade-in">
                <p className="text-green-600 font-bold mb-4">✨ Walkthrough Complete!</p>
              </div>
            )}
          </div>
          
          {stepIndex === data.steps.length - 1 && (
             <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 animate-slide-up">
                <h4 className="text-blue-900 font-bold mb-2 text-sm uppercase tracking-wide">Why it works</h4>
                <p className="text-blue-800 text-sm leading-relaxed">{data.whyItWorks}</p>
             </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-stone-50 border-t border-stone-100 flex justify-center">
            <button
                onClick={onStartPractice}
                className="w-full md:w-auto bg-vedic-deep text-vedic-gold px-8 py-4 rounded-xl font-bold font-serif hover:bg-opacity-90 transition-all shadow-lg text-lg flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Try a Puzzle Now
            </button>
        </div>

      </div>
    </div>
  );
};

export default TutorialArena;
