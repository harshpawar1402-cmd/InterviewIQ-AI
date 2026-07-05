import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export default function InterviewPage() {
  const [currentQuestion, setCurrentQuestion] = useState(2); // Start at question 3 (index 2)
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes in seconds
  const [submittedQuestions, setSubmittedQuestions] = useState<number[]>([1, 2]);
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

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return;

    setIsEvaluating(true);

    // Simulate AI evaluation with animated values
    setTimeout(() => {
      setEvaluation({
        communication: 78,
        technical: 82,
        confidence: 75,
        problemSolving: 88,
      });
      setIsEvaluating(false);
      setSubmittedQuestions((prev) => [...prev, currentQuestion + 1]);
    }, 2000);
  };

  const handleSkip = () => {
    if (currentQuestion < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer('');
      setEvaluation({ communication: null, technical: null, confidence: null, problemSolving: null });
    }
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
                  Question {currentQuestion + 1} of {INTERVIEW_QUESTIONS.length}
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
                    {INTERVIEW_QUESTIONS[currentQuestion].question}
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
              {evaluation.communication === null
                ? "Take your time to structure your answer. Begin with a clear opening, provide specific examples, and conclude with key takeaways."
                : "Great answer! Consider adding more specific metrics to strengthen your examples."}
            </p>
          </div>
        </div>
      </main>

      {/* Bottom - Question Navigation */}
      <div className="bg-dark-900 border-t border-dark-800 px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-400 mr-4">Questions:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {INTERVIEW_QUESTIONS.map((q, i) => (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentQuestion(i);
                  setAnswer('');
                  setEvaluation({
                    communication: null,
                    technical: null,
                    confidence: null,
                    problemSolving: null,
                  });
                }}
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
