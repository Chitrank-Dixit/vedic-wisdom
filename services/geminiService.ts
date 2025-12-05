import { GoogleGenAI, Type } from "@google/genai";
import { PuzzleData, Sutra, TutorialData, SutraDetail } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = "gemini-2.5-flash";

export const generateSutraPuzzle = async (sutra: Sutra): Promise<PuzzleData> => {
  let promptContext = "";
  
  switch (sutra.id) {
    case 'ekadhikena':
      promptContext = "Generate a math problem involving squaring a 2-digit or 3-digit number ending in 5 (e.g., 35^2, 85^2).";
      break;
    case 'nikhilam':
      promptContext = "Generate a multiplication problem with two 2-digit numbers that are close to 100 (e.g., 94 * 96) OR a subtraction problem from 1000/10000.";
      break;
    case 'multiply11':
      promptContext = "Generate a problem multiplying a random 2-digit or small 3-digit number by 11 (e.g., 43 * 11). Focus on the 'add neighbors' sandwich technique.";
      break;
    case 'ekanyunena':
      promptContext = "Generate a multiplication problem where one multiplier consists entirely of 9s (e.g., 46 * 99 or 7 * 9). The answer should be calculated using the 'Reduce by one' method.";
      break;
    case 'gunita':
      promptContext = "Generate a multiplication problem (e.g. 23 * 12) and ask for the Digital Root (sum of digits until single digit) of the product. The answer must be the single digit digital root.";
      break;
    case 'yavadunam':
      promptContext = "Generate a problem squaring a number close to 100 (e.g. 96^2 or 104^2) using the 'deficiency/surplus' method.";
      break;
    case 'urdhva':
      promptContext = "Generate a multiplication problem of two random 2-digit numbers (e.g., 23 * 41) that demonstrates the 'vertically and crosswise' method.";
      break;
    case 'antyayor':
      promptContext = "Generate a multiplication problem where the last digits sum to 10 and the initial digits are the same (e.g., 64 * 66).";
      break;
    case 'paravartya':
      promptContext = "Generate a division problem where the divisor is slightly above 10 or 100 (e.g. 1234 / 112 or 145 / 12) and ask for the Quotient. Or a simple algebraic equation x + 3 = 7.";
      break;
    case 'sankalana':
      promptContext = "Generate a system of two linear equations where coefficients are swapped (e.g. 3x + 2y = 12, 2x + 3y = 13). Ask for the value of (x + y).";
      break;
    case 'vilokanam':
      promptContext = "Generate a problem finding the Cube Root of a perfect cube between 4000 and 150000 (e.g., Cube Root of 12167). The answer must be an integer.";
      break;
    case 'anurupyena':
      promptContext = "Generate a problem asking to cube a 2-digit number (e.g. 12^3 or 21^3) using the ratio method.";
      break;
    case 'shunyam':
      promptContext = "Generate a problem asking for 'x' in an equation where the numerators are equal and denominators differ but sum to same value (e.g. 1/(x+2) + 1/(x+3) = 0). The answer is usually calculated by setting sum to zero.";
      break;
    case 'anurupye_shunyam':
      promptContext = "Generate a system of two simultaneous linear equations (e.g. 3x + 4y = 8 and 6x + 8y = k). One variable term should be a multiple of the other in the second equation, leading to a zero solution for one variable. Or a ratio based problem.";
      break;
    case 'purana':
      promptContext = "Generate a problem that uses 'completion' like difference of squares (e.g. 29 * 31 = 30^2 - 1) or finding a root by completing the square.";
      break;
    case 'calana':
      promptContext = "Generate a problem to find the roots of a simple quadratic equation (e.g. x^2 - 5x + 6 = 0) using the Calana-Kalanabhyam method which relates to differential calculus or discriminant.";
      break;
    case 'vyasti':
      promptContext = "Generate a word problem asking for the average (mean) of a set of numbers that are close to each other (e.g. 48, 52, 53, 49) using a working base.";
      break;
    case 'sesanyankena':
      promptContext = "Generate a problem asking for the first 3-4 decimal digits of a fraction like 1/19 or 1/7 using the remainders method.";
      break;
    case 'sopantyadvayamantyam':
      promptContext = "Generate an algebraic equation problem of the form 1/(x+a) + 1/(x+b) = 1/(x+c) + 1/(x+d) where a+b = c+d. The answer for x is usually -(a+b)/2.";
      break;
    case 'gunakasamuccayah':
      promptContext = "Generate a problem asking to verify the factorization of a quadratic (e.g. does (x+2)(x+3) = x^2+5x+6?) by comparing the Sum of Coefficients (Sc). The answer should be the numeric Sum of Coefficients.";
      break;
    
    // Newly Added Upsutras
    case 'sisyate':
      promptContext = "Generate a problem checking if a large number (e.g. 4563) is divisible by 9 or 3 using the digit sum remainder method. Ask for the Remainder.";
      break;
    case 'adyam':
      promptContext = "Generate a factorization problem for a simple quadratic like 2x^2 + 7x + 5. Ask for one of the factors or the 'First' term of the factors using Adyam (First by first) principle.";
      break;
    case 'kevalaih':
      promptContext = "Generate a problem involving the cyclic number 142857 (e.g. 142857 * 3) or division of a small number by 7 (e.g. 3/7) to find the repeating decimal sequence.";
      break;
    case 'vestanam':
      promptContext = "Generate a divisibility check problem (e.g. Is 91 divisible by 7? or Is 247 divisible by 13?) using the 'Osculation' (Vestanam) technique.";
      break;
    case 'lopana':
      promptContext = "Generate a classic simultaneous equation problem (e.g. 2x + 3y = 8, 3x - y = 1) to solve for x or y using the elimination (Lopana) method.";
      break;
    case 'samuccaya':
      promptContext = "Generate a problem to verify a multiplication like (x+3)(x+4) = x^2+7x+12 using 'Samuccaya Gunitah'. Ask for the Product of the Sums of the coefficients of the factors.";
      break;
      
    default:
      promptContext = "Generate a simple Vedic math problem.";
  }

  const prompt = `
    You are a Vedic Mathematics master. 
    ${promptContext}
    
    1. Create a clear numerical question.
    2. Calculate the correct numeric answer.
    3. Provide a brief summary explanation.
    4. BREAK DOWN the solution into 3-4 distinct, short steps that teach the specific Sutra technique.
    5. Provide a small hint without giving away the answer.
    
    Format the output as JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            answer: { type: Type.NUMBER },
            sutraUsed: { type: Type.STRING },
            explanation: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            hint: { type: Type.STRING }
          },
          required: ["question", "answer", "sutraUsed", "explanation", "steps", "hint"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No content generated");
    
    return JSON.parse(text) as PuzzleData;
  } catch (error) {
    console.error("Error generating puzzle:", error);
    // Fallback 
    return {
      question: "35 × 35",
      answer: 1225,
      sutraUsed: "Ekadhikena Purvena",
      explanation: "Squaring a number ending in 5 is simple.",
      steps: [
        "Take the first digit (3).",
        "Multiply it by the next number (3 + 1 = 4). So, 3 × 4 = 12.",
        "Square the last digit (5 × 5 = 25).",
        "Combine them: 12 | 25 = 1225."
      ],
      hint: "Multiply the first digit by (itself + 1), then append 25."
    };
  }
};

export const generateSutraTutorial = async (sutra: Sutra): Promise<TutorialData> => {
  const prompt = `
    You are a Vedic Mathematics expert teacher. Create a beginner-friendly tutorial for the Sutra: "${sutra.sanskritName}" (${sutra.englishTranslation}).
    
    Description: ${sutra.description}

    Please provide:
    1. A catchy title for the lesson.
    2. A clear concept explanation (When do we use this?).
    3. A specific, static example problem (e.g., "98 x 97" or "35^2").
    4. A step-by-step breakdown array. Each string should be one visual step of the calculation.
    5. A brief "Why it works" section explaining the logic.

    Format as JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            concept: { type: Type.STRING },
            exampleProblem: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            whyItWorks: { type: Type.STRING }
          },
          required: ["title", "concept", "exampleProblem", "steps", "whyItWorks"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No tutorial content generated");
    
    return JSON.parse(text) as TutorialData;
  } catch (error) {
    console.error("Error generating tutorial:", error);
    return {
      title: "Learning Vedic Math",
      concept: "Technique unavailable",
      exampleProblem: "N/A",
      steps: [
        "Please try again later.",
      ],
      whyItWorks: "AI connection failed."
    };
  }
};

export const generateSutraDetails = async (sutra: Sutra): Promise<SutraDetail> => {
  const prompt = `
    Provide a detailed explanation of the Vedic Math Sutra: "${sutra.sanskritName}" (${sutra.englishTranslation}).
    
    Return a JSON object with:
    1. summary: A 2-sentence rich description of what it does.
    2. useCases: An array of 3 specific strings describing when to use it (e.g., "Multiplying numbers close to 100", "Squaring numbers ending in 5").
    3. mathDeepDive: A concise paragraph explaining the mathematical/algebraic logic behind why it works.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            useCases: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            mathDeepDive: { type: Type.STRING }
          },
          required: ["summary", "useCases", "mathDeepDive"]
        }
      }
    });
    
    const text = response.text;
    if (!text) throw new Error("No detail generated");
    return JSON.parse(text) as SutraDetail;

  } catch (e) {
    console.error("Error details:", e);
    return {
      summary: sutra.description,
      useCases: ["General arithmetic", "Mental calculations"],
      mathDeepDive: "This sutra simplifies calculations by recognizing patterns in numbers."
    };
  }
};
