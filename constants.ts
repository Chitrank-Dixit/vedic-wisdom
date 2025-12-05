import { Sutra } from './types';

export const SUTRAS: Sutra[] = [
  // --- Beginner ---
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
    id: 'multiply11',
    sanskritName: 'Antyayor Eva (x11)',
    englishTranslation: 'Only the last two',
    description: 'The magic method for multiplying any number by 11 instantly by adding neighbors.',
    difficulty: 'Beginner',
    colorClass: 'bg-pink-900',
  },
  {
    id: 'ekanyunena',
    sanskritName: 'Ekanyunena Purvena',
    englishTranslation: 'By one less than the one before',
    description: 'The specific method for multiplying by 9, 99, 999, etc. (e.g. 77 × 99).',
    difficulty: 'Beginner',
    colorClass: 'bg-teal-800',
  },
  {
    id: 'gunita',
    sanskritName: 'Gunita Samuccayah',
    englishTranslation: 'The product of the sum is the sum of the product',
    description: 'Using "Digital Roots" (Digit Sums) to instantly verify if a calculation is correct.',
    difficulty: 'Beginner',
    colorClass: 'bg-lime-900',
  },

  // --- Intermediate ---
  {
    id: 'yavadunam',
    sanskritName: 'Yavadunam',
    englishTranslation: 'Whatever the deficiency',
    description: 'The fastest way to square numbers near a base like 100 or 1000 (e.g., 93², 104²).',
    difficulty: 'Intermediate',
    colorClass: 'bg-purple-900',
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
  },
  {
    id: 'paravartya',
    sanskritName: 'Paravartya Yojayet',
    englishTranslation: 'Transpose and Apply',
    description: 'Excellent for division where the divisor is slightly above a base (e.g. 112) or solving simple equations.',
    difficulty: 'Intermediate',
    colorClass: 'bg-cyan-900',
  },
  {
    id: 'sankalana',
    sanskritName: 'Sankalana Vyavakalanabhyam',
    englishTranslation: 'By addition and by subtraction',
    description: 'Solving simultaneous linear equations where x and y coefficients are swapped (e.g. 45x + 23y = 113).',
    difficulty: 'Intermediate',
    colorClass: 'bg-orange-900',
  },

  // --- Advanced ---
  {
    id: 'vilokanam',
    sanskritName: 'Vilokanam',
    englishTranslation: 'By mere observation',
    description: 'Find Cube Roots of perfect cubes (up to 6 digits) just by looking at the number.',
    difficulty: 'Advanced',
    colorClass: 'bg-blue-900',
  },
  {
    id: 'anurupyena',
    sanskritName: 'Anurupyena',
    englishTranslation: 'Proportionality',
    description: 'Used for finding cubes of numbers (e.g. 13³) by maintaining the geometric ratio between digits.',
    difficulty: 'Advanced',
    colorClass: 'bg-fuchsia-900',
  },
  {
    id: 'shunyam',
    sanskritName: 'Shunyam Samyasamuccaye',
    englishTranslation: 'When the sum is the same, that sum is zero',
    description: 'A specific algebraic trick to solve complex-looking equations instantly by setting terms to zero.',
    difficulty: 'Advanced',
    colorClass: 'bg-slate-800',
  },
];
