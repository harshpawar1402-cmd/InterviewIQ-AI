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

export type GeneratedInterviewQuestion = {
  id: number;
  question: string;
  focus: string;
};

export async function generatePersonalizedInterviewQuestions(
  resumeAnalysis: ResumeAnalysis,
  role: string = 'Software Engineer',
  difficulty: string = 'Medium',
  interviewType: string = 'Mixed',
  count: number = 10
): Promise<GeneratedInterviewQuestion[]> {
  const ai = getGeminiClient();

  const prompt = `
You are an experienced technical interviewer.

Create ${count} personalized mock-interview questions for this candidate.

Target role: ${role}
Difficulty: ${difficulty}
Interview type: ${interviewType}

Candidate resume analysis:
- Skills: ${resumeAnalysis.skills.join(', ')}
- Projects: ${resumeAnalysis.projects}
- Experience: ${resumeAnalysis.experience}
- Education: ${resumeAnalysis.education}
- Strengths: ${resumeAnalysis.strengths.join(', ')}
- Weaknesses: ${resumeAnalysis.weaknesses.join(', ')}
- Missing skills: ${resumeAnalysis.missingSkills.join(', ')}
- Suggested interview topics: ${resumeAnalysis.interviewTopics.join(', ')}

Return ONLY valid JSON in exactly this format:
[
  {
    "id": 1,
    "question": "Question text here",
    "focus": "What this question evaluates"
  }
]

Rules:
- Return exactly ${count} questions.
- Ask one question at a time.
- Personalize questions using the candidate's actual projects, skills, and gaps.
- Include a balanced mix of technical, project-based, behavioural, and problem-solving questions.
- - Do not invent facts, projects, work experience, industries, or technologies not present in the provided analysis.
- Never ask questions about marketing, campaign management, ROI, A/B testing, sales, finance, healthcare, or any unrelated field unless those topics are explicitly present in the candidate analysis.
- For a Software Engineer role, prioritize programming, web development, APIs, databases, Git/GitHub, projects, debugging, machine learning, data analysis, architecture, and behavioural questions connected to the candidate's actual work.
- Every question must be traceable to at least one listed skill, project, strength, weakness, missing skill, or interview topic.
- Keep each question clear and interview-ready.
- Do not add markdown, code blocks, headings, or extra explanation.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Gemini returned an empty response.');
    }

    const questions = JSON.parse(
      extractJson(rawText)
    ) as GeneratedInterviewQuestion[];

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('Gemini did not return valid interview questions.');
    }

    return questions.map((item, index) => ({
      id: index + 1,
      question: item.question || `Interview question ${index + 1}`,
      focus: item.focus || 'General interview readiness',
    }));
  } catch (error) {
    console.error('Gemini interview-question error:', error);

    if (error instanceof Error) {
      throw new Error(
        `Could not generate personalized interview questions: ${error.message}`
      );
    }

    throw new Error(
      'Could not generate personalized interview questions. Please try again.'
    );
  }
}

export type AnswerEvaluation = {
  communication: number;
  technicalKnowledge: number;
  confidence: number;
  problemSolving: number;
  overallScore: number;
  feedback: string;
  improvementTip: string;
};

export async function evaluateInterviewAnswer(
  question: string,
  answer: string,
  role: string = 'Software Engineer'
): Promise<AnswerEvaluation> {
  if (!answer.trim()) {
    throw new Error('Please provide an answer before submitting.');
  }

  const ai = getGeminiClient();

  const prompt = `
You are a professional interviewer evaluating a candidate for a ${role} role.

Evaluate the candidate's answer fairly and constructively.

Interview question:
${question}

Candidate answer:
${answer}

Return ONLY valid JSON in exactly this format:
{
  "communication": 0,
  "technicalKnowledge": 0,
  "confidence": 0,
  "problemSolving": 0,
  "overallScore": 0,
  "feedback": "",
  "improvementTip": ""
}

Rules:
- All score values must be whole numbers from 0 to 100.
- Be constructive, realistic, and encouraging.
- Do not score based on grammar alone.
- TechnicalKnowledge should measure relevance and correctness.
- Communication should measure clarity and structure.
- Confidence should measure decisiveness and explanation quality.
- ProblemSolving should measure logic, trade-offs, and reasoning.
- feedback should be 1–2 concise sentences.
- improvementTip should be one practical suggestion.
- Do not use markdown or extra explanation outside the JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2,
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error('Gemini returned an empty evaluation.');
    }

    const evaluation = JSON.parse(
      extractJson(rawText)
    ) as AnswerEvaluation;

    const clampScore = (value: unknown) =>
      Math.min(100, Math.max(0, Number(value) || 0));

    return {
      communication: clampScore(evaluation.communication),
      technicalKnowledge: clampScore(evaluation.technicalKnowledge),
      confidence: clampScore(evaluation.confidence),
      problemSolving: clampScore(evaluation.problemSolving),
      overallScore: clampScore(evaluation.overallScore),
      feedback: evaluation.feedback || 'Your answer was evaluated successfully.',
      improvementTip:
        evaluation.improvementTip ||
        'Add a concrete example to make your answer stronger.',
    };
  } catch (error) {
    console.error('Gemini answer-evaluation error:', error);

    if (error instanceof Error) {
      throw new Error(`Could not evaluate the answer: ${error.message}`);
    }

    throw new Error('Could not evaluate the answer. Please try again.');
  }
}