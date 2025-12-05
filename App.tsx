import React, { useState } from 'react';
import { Sutra, AppState } from './types';
import { SUTRAS } from './constants';
import SutraCard from './components/SutraCard';
import PuzzleArena from './components/PuzzleArena';
import TutorialArena from './components/TutorialArena';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'MENU',
    mode: 'PRACTICE', // Default mode
    selectedSutra: null,
    score: 0,
    streak: 0,
  });

  const handleSutraSelect = (sutra: Sutra) => {
    setState(prev => ({ ...prev, view: 'ACTIVE', selectedSutra: sutra }));
  };

  const handleBackToMenu = () => {
    setState(prev => ({ ...prev, view: 'MENU', selectedSutra: null }));
  };

  const handleSolve = () => {
    setState(prev => ({ 
      ...prev, 
      score: prev.score + 10 + (prev.streak * 2), // Bonus for streaks
      streak: prev.streak + 1 
    }));
  };

  const handleFail = () => {
    setState(prev => ({
      ...prev,
      streak: 0
    }));
  };
  
  const handleStartPractice = () => {
     // Switch from Tutorial view directly to Puzzle view for the same sutra
     setState(prev => ({ ...prev, mode: 'PRACTICE' }));
  };

  const setMode = (mode: 'PRACTICE' | 'TUTORIAL') => {
    setState(prev => ({ ...prev, mode }));
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 relative pb-12">
      <div className="absolute inset-0 ornament-pattern z-0 pointer-events-none"></div>

      {/* Navigation / Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={handleBackToMenu}
          >
            <div className="w-10 h-10 bg-vedic-deep rounded-lg flex items-center justify-center text-vedic-gold font-serif font-bold text-xl shadow-md">
              V
            </div>
            <h1 className="font-serif text-xl md:text-2xl font-bold text-vedic-deep hidden sm:block">
              Vedic Wisdom
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full border border-stone-200">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Streak</span>
              <span className={`font-serif font-bold ${state.streak > 2 ? 'text-orange-600' : 'text-gray-600'}`}>
                {state.streak} 🔥
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-stone-100 rounded-full border border-stone-200">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:inline">Score</span>
              <span className="font-serif font-bold text-vedic-deep">{state.score}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {state.view === 'MENU' ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Master the Sutras
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                {state.mode === 'PRACTICE' 
                  ? "Select a technique below to generate a new puzzle and test your skills."
                  : "Choose a technique to see a step-by-step interactive tutorial."}
              </p>

              {/* Mode Toggle */}
              <div className="inline-flex bg-stone-200 p-1 rounded-full relative mb-8 shadow-inner">
                <button 
                  onClick={() => setMode('PRACTICE')}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${state.mode === 'PRACTICE' ? 'bg-white text-vedic-deep shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Practice Puzzles
                </button>
                <button 
                   onClick={() => setMode('TUTORIAL')}
                   className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${state.mode === 'TUTORIAL' ? 'bg-white text-vedic-deep shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Learn Tutorials
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUTRAS.map((sutra) => (
                <div key={sutra.id} className="relative group">
                   {state.mode === 'TUTORIAL' && (
                     <div className="absolute -top-2 -right-2 z-20 bg-vedic-teal text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        LEARN
                     </div>
                   )}
                   <SutraCard 
                    sutra={sutra} 
                    onClick={handleSutraSelect} 
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          state.selectedSutra && (
            state.mode === 'PRACTICE' ? (
              <PuzzleArena 
                sutra={state.selectedSutra} 
                onBack={handleBackToMenu}
                onSolve={handleSolve}
                onFail={handleFail}
              />
            ) : (
              <TutorialArena 
                sutra={state.selectedSutra}
                onBack={handleBackToMenu}
                onStartPractice={handleStartPractice}
              />
            )
          )
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Vedic Wisdom Engine. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
