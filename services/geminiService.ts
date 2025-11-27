import { GoogleGenAI, Type } from "@google/genai";
import { PuzzleData, Sutra } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSutraPuzzle = async (sutra: Sutra): Promise<PuzzleData> => {
  const modelId = "gemini-2.5-flash";
  
  let promptContext = "";
  
  switch (sutra.id) {
    case 'ekadhikena':
      promptContext = "Generate a math problem involving squaring a 2-digit or 3-digit number ending in 5 (e.g., 35^2, 85^2).";
      break;
    case 'nikhilam':
      promptContext = "Generate a multiplication problem with two 2-digit numbers that are close to 100 (e.g., 94 * 96) OR a subtraction problem from 1000/10000.";
      break;
    case 'urdhva':
      promptContext = "Generate a multiplication problem of two random 2-digit numbers (e.g., 23 * 41) that demonstrates the 'vertically and crosswise' method.";
      break;
    case 'antyayor':
      promptContext = "Generate a multiplication problem where the last digits sum to 10 and the initial digits are the same (e.g., 64 * 66).";
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
    // Fallback for demo purposes if API fails or quotas hit
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