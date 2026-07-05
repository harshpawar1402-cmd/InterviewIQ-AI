import { useState, useEffect } from 'react';
import type { GeneratedInterviewQuestion } from '../services/geminiService';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  X,
  Clock,
  MessageSquare,
  Mic,
  ChevronRight,
  CheckCircle2,
  Circle,
  Send,
  SkipForward,
  Bot,
  TrendingUp,
} from 'lucide-react';
import {
  evaluateInterviewAnswer,
  type AnswerEvaluation,
} from '../services/geminiService';

const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    question: "Tell me about yourself and your experience with software development.",
  },
  {
    id: 2,
    question: "Describe a challenging technical problem you solved recently. What was your approach?",
  },
  {
    id: 3,
    question: "How do you handle tight deadlines and pressure in a project?",
  },
  {
    id: 4,
    question: "Explain the difference between REST and GraphQL. When would you use each?",
  },
  {
    id: 5,
    question: "Describe your experience with testing and test-driven development.",
  },
  {
    id: 6,
    question: "How do you approach debugging a complex issue in production?",
  },
  {
    id: 7,
    question: "Tell me about a time you had a disagreement with a teammate. How did you resolve it?",
  },
  {
    id: 8,
    question: "What strategies do you use to keep your skills up to date?",
  },
  {
    id: 9,
    question: "Explain how you would design a scalable web application architecture.",
  },
  {
    id: 10,
    question: "Do you have any questions for us about the role or company?",
  },
];
function getPersonalizedQuestions(): GeneratedInterviewQuestion[] {
  try {
    const savedQuestions = sessionStorage.getItem('interviewiq_questions');

    if (!savedQuestions) {
      return INTERVIEW_QUESTIONS.map((item) => ({
        id: item.id,
        question: item.question,
        focus: 'General interview readiness',
      }));
    }

    const parsedQuestions = JSON.parse(savedQuestions);

    if (!Array.isArray(parsedQuestions) || parsedQuestions.length === 0) {
      return INTERVIEW_QUESTIONS.map((item) => ({
        id: item.id,
        question: item.question,
        focus: 'General interview readiness',
      }));
    }

    return parsedQuestions;
  } catch {
    return INTERVIEW_QUESTIONS.map((item) => ({
      id: item.id,
      question: item.question,
      focus: 'General interview readiness',
    }));
  }
}

type InterviewResponse = {
  questionId: number;
  question: string;
  answer: string;
  evaluation: AnswerEvaluation;
};
function saveInterviewResponse(response: InterviewResponse): InterviewResponse[] {
  try {
    const saved = sessionStorage.getItem('interviewiq_responses');

    const previousResponses: InterviewResponse[] = saved
      ? JSON.parse(saved)
      : [];

    const withoutCurrentQuestion = previousResponses.filter(
      (item) => item.questionId !== response.questionId
    );

    const updatedResponses = [...withoutCurrentQuestion, response].sort(
      (first, second) => first.questionId - second.questionId
    );

    sessionStorage.setItem(
      'interviewiq_responses',
      JSON.stringify(updatedResponses)
    );

    return updatedResponses;
  } catch {
    const updatedResponses = [response];

    sessionStorage.setItem(
      'interviewiq_responses',
      JSON.stringify(updatedResponses)
    );

    return updatedResponses;
  }
}

export default function InterviewPage() {
  const [questions] = useState<GeneratedInterviewQuestion[]>(getPersonalizedQuestions);
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0); // Start at question 3 (index 2)
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [submittedQuestions, setSubmittedQuestions] = useState<number[]>([]);
  const [evaluation, setEvaluation] = useState<{
    communication: number | null;
    technical: number | null;
    confidence: number | null;
    problemSolving: number | null;
  }>({
    communication: null,
    technical: null,
    confidence: null,
    problemSolving: null,
  });
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AnswerEvaluation | null>(null);
const [evaluationError, setEvaluationError] = useState('');
const [responseHistory, setResponseHistory] = useState<InterviewResponse[]>(() => {
  try {
    const savedResponses = sessionStorage.getItem('interviewiq_responses');
    return savedResponses ? JSON.parse(savedResponses) : [];
  } catch {
    return [];
  }
});

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const finalizeInterviewHistory = (responses: InterviewResponse[]) => {
  try {
    const activeInterviewId = sessionStorage.getItem(
      'interviewiq_active_interview_id'
    );

    if (!activeInterviewId || responses.length === 0) return;

    const rawHistory = localStorage.getItem(
      'interviewiq_interview_history'
    );

    const history: any[] = rawHistory ? JSON.parse(rawHistory) : [];

    const interviewIndex = history.findIndex(
      (item: any) => item.id === activeInterviewId
    );

    if (interviewIndex === -1) return;

    const average = (key: string) =>
      Math.round(
        responses.reduce(
          (total, response) =>
            total + Number((response.evaluation as any)?.[key] || 0),
          0
        ) / responses.length
      );

    history[interviewIndex] = {
      ...history[interviewIndex],
      completedAt: new Date().toISOString(),
      responses,
      overallScore: average('overallScore'),
      communicationScore: average('communication'),
      technicalScore: average('technicalKnowledge'),
      confidenceScore: average('confidence'),
      problemSolvingScore: average('problemSolving'),
    };

    localStorage.setItem(
      'interviewiq_interview_history',
      JSON.stringify(history)
    );
  } catch (error) {
    console.error('Could not finalize interview history:', error);
  }
};
  const handleSubmitAnswer = async () => {
  if (!answer.trim()) return;

  setIsEvaluating(true);
  setEvaluationError('');

  try {
    const result = await evaluateInterviewAnswer(
      questions[currentQuestion].question,
      answer,
      'Software Engineer'
    );

    setAiFeedback(result);

    setEvaluation({
      communication: result.communication,
      technical: result.technicalKnowledge,
      confidence: result.confidence,
      problemSolving: result.problemSolving,
    });

    const completedResponse: InterviewResponse = {
      questionId: questions[currentQuestion].id,
      question: questions[currentQuestion].question,
      answer,
      evaluation: result,
    };

    const updatedResponses = saveInterviewResponse(completedResponse);
setResponseHistory(updatedResponses);


if (currentQuestion === questions.length - 1) {
  finalizeInterviewHistory(updatedResponses);
}

    setSubmittedQuestions((previous) =>
      previous.includes(currentQuestion + 1)
        ? previous
        : [...previous, currentQuestion + 1]
    );

    if (currentQuestion === questions.length - 1) {
      // Interview completed - save to localStorage history
      setTimeout(() => {
        try {
          const activeInterviewId = sessionStorage.getItem('interviewiq_active_interview_id');
          const allResponses = saveInterviewResponse(completedResponse);
          
          if (activeInterviewId) {
            // Calculate aggregate scores
            const scores = allResponses.map(r => r.evaluation.overallScore);
            const communications = allResponses.map(r => r.evaluation.communication);
            const technicals = allResponses.map(r => r.evaluation.technicalKnowledge);
            const confidences = allResponses.map(r => r.evaluation.confidence);
            const problemSolvings = allResponses.map(r => r.evaluation.problemSolving);
            
            const overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
            const communicationScore = Math.round(communications.reduce((a, b) => a + b, 0) / communications.length);
            const technicalScore = Math.round(technicals.reduce((a, b) => a + b, 0) / technicals.length);
            const confidenceScore = Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length);
            const problemSolvingScore = Math.round(problemSolvings.reduce((a, b) => a + b, 0) / problemSolvings.length);
            
            // Get interview history and update completed interview
            let history: any[] = [];
            try {
              const existingHistory = localStorage.getItem('interviewiq_interview_history');
              history = existingHistory ? JSON.parse(existingHistory) : [];
            } catch {
              history = [];
            }
            
            const interviewIndex = history.findIndex(
  (i: any) => i.id === activeInterviewId
);
            if (interviewIndex !== -1) {
              history[interviewIndex].completedAt = new Date().toISOString();
              history[interviewIndex].responses = allResponses;
              history[interviewIndex].questions = questions;
              history[interviewIndex].overallScore = overallScore;
              history[interviewIndex].communicationScore = communicationScore;
              history[interviewIndex].technicalScore = technicalScore;
              history[interviewIndex].confidenceScore = confidenceScore;
              history[interviewIndex].problemSolvingScore = problemSolvingScore;
              
              localStorage.setItem('interviewiq_interview_history', JSON.stringify(history));
            }
          }
        } catch (error) {
          console.error('Error saving completed interview to history:', error);
        }
        
        navigate('/results');
      }, 1400);
      return;
    }

    setTimeout(() => {
      setCurrentQuestion((previous) => previous + 1);
      setAnswer('');
      setAiFeedback(null);

      setEvaluation({
        communication: null,
        technical: null,
        confidence: null,
        problemSolving: null,
      });
    }, 1600);
  } catch (error) {
    setEvaluationError(
  'Live AI evaluation is temporarily unavailable. Demo evaluation is being shown so you can continue.'
);

const normalizedAnswer = answer.trim().toLowerCase();

const isWeakAnswer = [
  'i dont know',
  "i don't know",
  'dont know',
  'no idea',
  'idk',
  'not sure',
].some((phrase) => normalizedAnswer.includes(phrase));

const wordCount = normalizedAnswer.split(/\s+/).filter(Boolean).length;

let baseScore = 75;

if (isWeakAnswer) {
  baseScore = 25;
} else if (wordCount < 10) {
  baseScore = 40;
} else if (wordCount < 30) {
  baseScore = 58;
} else if (wordCount < 70) {
  baseScore = 70;
} else {
  baseScore = 82;
}

const fallbackEvaluation: AnswerEvaluation = {
  communication: Math.min(100, baseScore + 2),
  technicalKnowledge: Math.max(0, baseScore - 3),
  confidence: Math.max(0, baseScore - 1),
  problemSolving: Math.min(100, baseScore + 4),
  overallScore: baseScore,
  feedback: isWeakAnswer
    ? 'Your response does not provide enough information to assess your knowledge or experience.'
    : wordCount < 30
      ? 'Your response is relevant but needs more detail, structure, and a practical example.'
      : 'Your response is clear and relevant, with a good explanation of your approach.',
  improvementTip: isWeakAnswer
    ? 'Use the STAR method: describe the situation, your task, the action you took, and the result.'
    : 'Add one measurable result or specific example to make your answer more convincing.',
};

setAiFeedback(fallbackEvaluation);

setEvaluation({
  communication: fallbackEvaluation.communication,
  technical: fallbackEvaluation.technicalKnowledge,
  confidence: fallbackEvaluation.confidence,
  problemSolving: fallbackEvaluation.problemSolving,
});

const completedResponse: InterviewResponse = {
  questionId: questions[currentQuestion].id,
  question: questions[currentQuestion].question,
  answer,
  evaluation: fallbackEvaluation,
};

const updatedResponses = saveInterviewResponse(completedResponse);
setResponseHistory(updatedResponses);
if (currentQuestion === questions.length - 1) {
  finalizeInterviewHistory(updatedResponses);
}

setSubmittedQuestions((previous) =>
  previous.includes(currentQuestion + 1)
    ? previous
    : [...previous, currentQuestion + 1]
);
  } finally {
    if (currentQuestion === questions.length - 1) {
  setTimeout(() => navigate('/results'), 1400);
} else {
  setTimeout(() => {
    setCurrentQuestion((previous) => previous + 1);
    setAnswer('');
    setAiFeedback(null);
    setEvaluation({
      communication: null,
      technical: null,
      confidence: null,
      problemSolving: null,
    });
  }, 1600);
}
    setIsEvaluating(false);
  }
};const handleQuestionSelect = (questionIndex: number) => {
  const selectedQuestion = questions[questionIndex];

  const savedResponse = responseHistory.find(
    (item) => item.questionId === selectedQuestion.id
  );

  setCurrentQuestion(questionIndex);
  setEvaluationError('');

  if (savedResponse) {
    setAnswer(savedResponse.answer);
    setAiFeedback(savedResponse.evaluation);

    setEvaluation({
      communication: savedResponse.evaluation.communication,
      technical: savedResponse.evaluation.technicalKnowledge,
      confidence: savedResponse.evaluation.confidence,
      problemSolving: savedResponse.evaluation.problemSolving,
    });
  } else {
    setAnswer('');
    setAiFeedback(null);

    setEvaluation({
      communication: null,
      technical: null,
      confidence: null,
      problemSolving: null,
    });
  }
};

  const handleSkip = () => {
  if (currentQuestion === questions.length - 1) {
    const savedResponses = (() => {
      try {
        const rawResponses = sessionStorage.getItem(
          'interviewiq_responses'
        );

        return rawResponses ? JSON.parse(rawResponses) : [];
      } catch {
        return [];
      }
    })();

    finalizeInterviewHistory(savedResponses);

    setTimeout(() => {
      navigate('/results');
    }, 400);

    return;
  }

  setCurrentQuestion((previous) => previous + 1);
  setAnswer('');
  setAiFeedback(null);

  setEvaluation({
    communication: null,
    technical: null,
    confidence: null,
    problemSolving: null,
  });
};

  const timerProgress = (timeLeft / (45 * 60)) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timerProgress / 100) * circumference;

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      {/* Top Header */}
      <header className="bg-dark-900 border-b border-dark-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-accent-500" />
              <span className="text-xl font-semibold">InterviewIQ</span>
            </Link>

            {/* Interview Info */}
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wider">Role</p>
                <p className="font-medium">Software Engineer</p>
              </div>
              <div className="h-8 w-px bg-dark-800" />
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wider">Difficulty</p>
                <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-400 font-medium">
                  Medium
                </span>
              </div>
              <div className="h-8 w-px bg-dark-800" />
              <div>
                <p className="text-xs text-dark-400 uppercase tracking-wider">Progress</p>
                <p className="font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Circular Timer */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-dark-800"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-accent-500 transition-all duration-1000"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Clock className="w-4 h-4 text-dark-400" />
                <span className="text-sm font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>

            {/* Exit Button */}
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-rose-500/20 hover:text-rose-400 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Exit Interview
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side - Interview Area */}
        <div className="w-full lg:w-[70%] p-6 flex flex-col">
          {/* AI Interviewer Card */}
          <div className="glass-card rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-500 to-emerald-400 flex items-center justify-center flex-shrink-0">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">AI Interviewer</span>
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                </div>
                <div className="bg-dark-800/50 rounded-xl p-4">
                  <p className="text-dark-300 text-lg leading-relaxed">
                    {questions[currentQuestion].question}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Area */}
          <div className="flex-1 glass-card rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-accent-500" />
              <span className="font-medium">Your Answer</span>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your response here... Be detailed and specific in your answer."
              className="flex-1 w-full bg-dark-800/50 border border-dark-700 rounded-xl p-4 text-white placeholder-dark-500 resize-none focus:outline-none focus:border-accent-500 transition-colors"
            />
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-dark-400">{answer.length} characters</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSkip}
                  className="flex items-center gap-2 px-4 py-2.5 bg-dark-800 hover:bg-dark-700 rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  Skip Question
                </button>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2.5 bg-dark-800 text-dark-500 rounded-lg cursor-not-allowed"
                >
                  <Mic className="w-4 h-4" />
                  Use Voice Answer
                  <span className="text-xs bg-dark-700 px-2 py-0.5 rounded ml-1">Coming Soon</span>
                </button>
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim() || isEvaluating}
                  className="flex items-center gap-2 px-6 py-2.5 bg-accent-500 hover:bg-accent-600 disabled:bg-dark-700 disabled:text-dark-500 rounded-lg font-medium transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - AI Evaluation Panel */}
        <div className="hidden lg:block w-[30%] border-l border-dark-800 p-6 overflow-auto">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-accent-500" />
            <h2 className="font-semibold">Live AI Evaluation</h2>
          </div>

          <div className="space-y-4">
            {/* Communication */}
            <EvaluationCard
              label="Communication"
              value={evaluation.communication}
              color="bg-blue-500"
              isEvaluating={isEvaluating}
            />

            {/* Technical Knowledge */}
            <EvaluationCard
              label="Technical Knowledge"
              value={evaluation.technical}
              color="bg-accent-500"
              isEvaluating={isEvaluating}
            />

            {/* Confidence */}
            <EvaluationCard
              label="Confidence"
              value={evaluation.confidence}
              color="bg-emerald-500"
              isEvaluating={isEvaluating}
            />

            {/* Problem Solving */}
            <EvaluationCard
              label="Problem Solving"
              value={evaluation.problemSolving}
              color="bg-amber-500"
              isEvaluating={isEvaluating}
            />
          </div>

          {/* Overall Score */}
          <div className="mt-6 glass-card rounded-xl p-4">
            <p className="text-sm text-dark-400 mb-2">Overall Score</p>
            {evaluation.communication !== null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-accent-500">
                  {Math.round(
                    (evaluation.communication +
                      evaluation.technical! +
                      evaluation.confidence! +
                      evaluation.problemSolving!) /
                      4
                  )}
                </span>
                <span className="text-dark-400">/ 100</span>
              </div>
            ) : (
              <p className="text-dark-500 text-sm">Waiting for your response...</p>
            )}
          </div>

          {/* Tips */}
          <div className="mt-6 bg-dark-800/50 rounded-xl p-4 border border-dark-700">
            <p className="text-xs text-dark-400 uppercase tracking-wider mb-2">AI Tip</p>
            <p className="text-sm text-dark-300">
  {evaluationError
    ? evaluationError
    : aiFeedback?.improvementTip ||
      'Take your time to structure your answer. Begin with a clear opening, provide specific examples, and conclude with key takeaways.'}
</p>
          </div>
        </div>
      </main>

      {/* Bottom - Question Navigation */}
      <div className="bg-dark-900 border-t border-dark-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-400 mr-4">Questions:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => handleQuestionSelect(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  i === currentQuestion
                    ? 'bg-accent-500 text-white'
                    : submittedQuestions.includes(i + 1)
                    ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    : 'bg-dark-800 text-dark-400 hover:bg-dark-700'
                }`}
              >
                {submittedQuestions.includes(i + 1) && i !== currentQuestion ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className={`w-4 h-4 ${i === currentQuestion ? 'fill-accent-500 stroke-accent-500' : ''}`} />
                )}
                <span>Q{i + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Evaluation Card Component
function EvaluationCard({
  label,
  value,
  color,
  isEvaluating,
}: {
  label: string;
  value: number | null;
  color: string;
  isEvaluating: boolean;
}) {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-dark-400">{label}</span>
        {value !== null && <span className="font-semibold">{value}%</span>}
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        {isEvaluating ? (
          <div className="h-full w-1/3 bg-dark-700 rounded-full animate-pulse" />
        ) : value !== null ? (
          <div
            className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
            style={{ width: `${value}%` }}
          />
        ) : (
          <div className="h-full w-full bg-dark-800 rounded-full" />
        )}
      </div>
      {value === null && !isEvaluating && (
        <p className="text-xs text-dark-500 mt-2">Waiting for your response...</p>
      )}
    </div>
  );
}
