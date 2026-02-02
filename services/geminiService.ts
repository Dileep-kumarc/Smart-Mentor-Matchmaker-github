
import { GoogleGenAI, Type } from "@google/genai";
import { Mentor, Learner, MatchResult } from "../types";

export const getSmartMatches = async (learner: Learner, mentors: Mentor[]): Promise<MatchResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an expert career coaching coordinator at 'Iron Lady', an organization dedicated to women's leadership.
    Your task is to analyze a learner's profile and suggest the top 3 most compatible mentors from a provided list.
    
    Consider:
    1. Industry overlap.
    2. Alignment of the mentor's expertise with the learner's career goals.
    3. How the mentor's bio addresses the learner's specific challenges.
    4. Seniority gap (ideally 5-10 years ahead).

    Provide a compatibility score (0-100) and a brief 2-sentence professional rationale for each match.
  `;

  const prompt = `
    Learner Profile:
    Name: ${learner.name}
    Current Role: ${learner.currentRole}
    Goals: ${learner.careerGoals}
    Challenges: ${learner.challenges}

    Available Mentors:
    ${mentors.map(m => `ID: ${m.id}, Name: ${m.name}, Title: ${m.currentTitle}, Industry: ${m.industry}, Expertise: ${m.expertise.join(', ')}, Bio: ${m.bio}`).join('\n---\n')}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  mentorId: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  reason: { type: Type.STRING }
                },
                required: ["mentorId", "score", "reason"]
              }
            }
          },
          required: ["matches"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result.matches;
  } catch (error) {
    console.error("AI Matching Error:", error);
    return [];
  }
};
