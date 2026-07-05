import { GoogleGenAI } from '@google/genai';

export type ResumeAnalysis = {
  score: number;
  skills: string[];
  projects: number;
  experience: string;
  education: string;
  missingSkills: string[];
  readiness: number;
  recommendedRoles: string[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
  interviewTopics: string[];
};

function getGeminiClient() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      'Gemini API key is missing. Add VITE_GEMINI_API_KEY to .env.local and restart the Vite server.'
    );
  }

  return new GoogleGenAI({ apiKey });
}

function extractJson(text: string): string {
  return text
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();
}

export async function analyzeResumeText(
  resumeText: string
): Promise<ResumeAnalysis> {
  if (!resumeText.trim()) {
    throw new Error('Resume text is empty.');
  }

  const ai = getGeminiClient();

  const prompt = `
You are an expert career coach and technical recruiter.

Analyze the resume below for an AI mock interview platform.

Return ONLY valid JSON. Do not add markdown, code fences, explanations, or extra text.

Use exactly this JSON structure:
{
  "score": 0,
  "skills": [],
  "projects": 0,
  "experience": "",
  "education": "",
  "missingSkills": [],
  "readiness": 0,
  "recommendedRoles": [],
  "strengths": [],
  "weaknesses": [],
  "summary": "",
  "interviewTopics": []
}

Rules:
- score and readiness must be whole numbers from 0 to 100.
- skills: maximum 12 concise skills.
- projects: estimated project count from the resume.
- recommendedRoles: maximum 3 realistic roles.
- missingSkills: maximum 5 practical skills to improve.
- strengths and weaknesses: maximum 4 concise points each.
- interviewTopics: maximum 6 personalized topics/questions based on projects, skills, and gaps.
- Be constructive and realistic.
- Do not invent work experience, achievements, or technologies not supported by the resume.

RESUME:
${resumeText}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Gemini returned an empty response.');
    }

    const analysis = JSON.parse(extractJson(rawText)) as ResumeAnalysis;

    return {
      score: Math.min(100, Math.max(0, Number(analysis.score) || 0)),
      skills: Array.isArray(analysis.skills) ? analysis.skills : [],
      projects: Number(analysis.projects) || 0,
      experience: analysis.experience || 'Not specified',
      education: analysis.education || 'Not specified',
      missingSkills: Array.isArray(analysis.missingSkills)
        ? analysis.missingSkills
        : [],
      readiness: Math.min(100, Math.max(0, Number(analysis.readiness) || 0)),
      recommendedRoles: Array.isArray(analysis.recommendedRoles)
        ? analysis.recommendedRoles
        : [],
      strengths: Array.isArray(analysis.strengths) ? analysis.strengths : [],
      weaknesses: Array.isArray(analysis.weaknesses)
        ? analysis.weaknesses
        : [],
      summary: analysis.summary || 'Resume analysis completed.',
      interviewTopics: Array.isArray(analysis.interviewTopics)
        ? analysis.interviewTopics
        : [],
    };
  } catch (error) {
    console.error('Gemini resume-analysis error:', error);

    if (error instanceof Error) {
      throw new Error(`Could not analyze the resume: ${error.message}`);
    }

    throw new Error('Could not analyze the resume. Please try again.');
  }
}