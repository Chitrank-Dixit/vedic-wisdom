import { Sutra } from './types';

export const SUTRAS: Sutra[] = [
  {
    id: 'ekadhikena',
    sanskritName: 'Ekadhikena Purvena',
    englishTranslation: 'By one more than the one before',
    description: 'Perfect for squaring numbers ending in 5 (e.g., 35², 85²).',
    difficulty: 'Beginner',
    colorClass: 'bg-emerald-900',
  },
  {
    id: 'nikhilam',
    sanskritName: 'Nikhilam Navatashcaramam Dashatah',
    englishTranslation: 'All from 9 and the last from 10',
    description: 'Ideal for multiplying numbers close to a base (e.g., 98 × 97) or subtracting from powers of 10.',
    difficulty: 'Beginner',
    colorClass: 'bg-indigo-900',
  },
  {
    id: 'urdhva',
    sanskritName: 'Urdhva Tiryagbhyam',
    englishTranslation: 'Vertically and Crosswise',
    description: 'The general formula for multiplication. Works for any two numbers.',
    difficulty: 'Intermediate',
    colorClass: 'bg-amber-700',
  },
  {
    id: 'antyayor',
    sanskritName: 'Antyayor Daskake Pi',
    englishTranslation: 'When the final digits add up to 10',
    description: 'Multiplication shortcut when last digits sum to 10 and previous parts are identical (e.g., 43 × 47).',
    difficulty: 'Intermediate',
    colorClass: 'bg-rose-900',
  }
];