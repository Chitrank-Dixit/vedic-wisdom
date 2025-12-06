import React, { useState, useEffect, useCallback } from 'react';
import { Sutra, PuzzleData } from '../types';
import { generateSutraPuzzle } from '../services/geminiService';

interface PuzzleArenaProps {
  sutra: Sutra;
  onBack: () => void;
  onSolve: () => void;
  onFail: () => void;
}

const PuzzleArena: React.FC<PuzzleArenaProps> = ({ sutra, onBack, onSolve, onFail }) => {
  const [loading, setLoading] = useState(true);
  const [puzzle, setPuzzle] = useState<PuzzleData | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'CORRECT' | 'INCORRECT' | 'REVEALED'>('IDLE');
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const fetchPuzzle = useCallback(async () => {
    setLoading(true);
    setStatus('IDLE');
    setUserAnswer('');
    setShowHint(false);
    try {
      const data = await generateSutraPuzzle(sutra);
      setPuzzle(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [sutra]);

  useEffect(() => {
    fetchPuzzle();
  }, [fetchPuzzle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puzzle) return;

    if (parseFloat(userAnswer) === puzzle.answer) {
      setStatus('CORRECT');
      onSolve();
    } else {
      setStatus('INCORRECT');
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  };

  const handleGiveUp = () => {
    if (!puzzle) return;
    setStatus('REVEALED');
    setUserAnswer(puzzle.answer.toString());
    onFail();
  };

  const handleReset = () => {
    setUserAnswer('');
    setStatus('IDLE');
    setShowHint(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-16 h-16 border-4 border-vedic-gold border-t-transparent rounded-full animate-spin"></div>
        <p className="font-serif text-lg text-vedic-deep animate-pulse">Consulting the Sages...</p>
      </div>
    );
  }

  if (!puzzle) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">Failed to load puzzle.</p>
        <button onClick={fetchPuzzle} className="text-vedic-teal underline">Try Again</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
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
          <h2 className="font-serif text-2xl font-bold text-vedic-deep">{sutra.sanskritName}</h2>
          <p className="text-sm text-gray-500">Solve using Vedic techniques</p>
        </div>
      </div>

      {/* Puzzle Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
        <div className="p-8 md:p-12 text-center bg-stone-50">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-vedic-gold uppercase border border-vedic-gold rounded-full">
            Problem
          </span>
          <h3 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-8">
            {puzzle.question}
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
            <div className={`relative w-full max-w-xs ${shake ? 'animate-shake' : ''}`}>
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="?"
                className={`w-full text-center text-3xl p-4 border-2 rounded-xl focus:outline-none transition-all
                  ${status === 'CORRECT' ? 'border-green-500 bg-green-50 text-green-900' : 
                    status === 'INCORRECT' ? 'border-red-500 bg-red-50 text-red-900' : 
                    status === 'REVEALED' ? 'border-amber-500 bg-amber-50 text-amber-900' :
                    'border-gray-300 focus:border-vedic-gold'}`}
                disabled={status === 'CORRECT' || status === 'REVEALED'}
                autoFocus
              />
            </div>
            
            {(status === 'IDLE' || status === 'INCORRECT') && (
              <div className="flex gap-3 w-full max-w-sm justify-center">
                <button
                  type="submit"
                  className="flex-1 bg-vedic-deep text-white px-4 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                >
                  Check
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-all"
                  title="Reset Answer"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleGiveUp}
                  className="px-4 py-3 text-vedic-deep bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition-all whitespace-nowrap"
                >
                  Show Me
                </button>
              </div>
            )}
          </form>

           {/* Hint Toggle */}
           {(status === 'IDLE' || status === 'INCORRECT') && (
            <button 
              onClick={() => setShowHint(!showHint)}
              className="mt-6 text-sm text-gray-500 hover:text-vedic-teal flex items-center justify-center gap-2 mx-auto"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.001 6.001 0 0 0-5.303-7.5c2.105-1.125 4.965-1.1 7.098.125A6.001 6.001 0 0 0 12 12.75Z" />
              </svg>
              {showHint ? "Hide Hint" : "Need a Hint?"}
            </button>
           )}

           {showHint && (status === 'IDLE' || status === 'INCORRECT') && (
             <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-200 animate-fade-in text-left">
               <span className="font-bold">Hint:</span> {puzzle.hint}
             </div>
           )}
        </div>

        {/* Feedback Section */}
        {status === 'INCORRECT' && (
           <div className="bg-red-50 p-4 text-center border-t border-red-100 animate-fade-in">
             <p className="text-red-700 font-medium">Not quite. Try applying the sutra steps again!</p>
           </div>
        )}

        {(status === 'CORRECT' || status === 'REVEALED') && (
          <div className={`p-8 border-t animate-slide-up ${status === 'CORRECT' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className={`p-2 rounded-full ${status === 'CORRECT' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {status === 'CORRECT' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h3 className={`text-2xl font-serif font-bold ${status === 'CORRECT' ? 'text-emerald-800' : 'text-amber-800'}`}>
                {status === 'CORRECT' ? 'Excellent!' : 'Learning Opportunity'}
              </h3>
            </div>

            <div className="max-w-xl mx-auto">
              <h4 className="text-lg font-bold text-gray-800 mb-4 text-center">The Vedic Method:</h4>
              <p className="text-gray-600 text-center mb-6 italic">{puzzle.explanation}</p>
              
              <div className="space-y-4">
                {puzzle.steps && puzzle.steps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-white rounded-xl border border-stone-200 shadow-sm">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-vedic-gold text-white rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={fetchPuzzle}
                className="bg-vedic-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-700 transition shadow-lg flex items-center gap-2"
              >
                <span>Next Puzzle</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PuzzleArena;
