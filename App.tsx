import React, { useState } from 'react';
import { Sutra, AppState } from './types';
import { SUTRAS } from './constants';
import SutraCard from './components/SutraCard';
import PuzzleArena from './components/PuzzleArena';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    view: 'MENU',
    selectedSutra: null,
    score: 0,
    streak: 0,
  });

  const handleSutraSelect = (sutra: Sutra) => {
    setState(prev => ({ ...prev, view: 'PUZZLE', selectedSutra: sutra }));
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
            <h1 className="font-serif text-xl md:text-2xl font-bold text-vedic-deep">
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
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Master the Sutras
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select a Vedic technique to begin your training. Learn to calculate with the speed of thought.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SUTRAS.map((sutra) => (
                <SutraCard 
                  key={sutra.id} 
                  sutra={sutra} 
                  onClick={handleSutraSelect} 
                />
              ))}
            </div>
          </div>
        ) : (
          state.selectedSutra && (
            <PuzzleArena 
              sutra={state.selectedSutra} 
              onBack={handleBackToMenu}
              onSolve={handleSolve}
              onFail={handleFail}
            />
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