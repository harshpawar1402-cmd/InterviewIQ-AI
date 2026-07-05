import { Link } from 'react-router-dom';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  Target,
  Brain,
  MessageSquare,
  Lightbulb,
  ClipboardCheck,
} from 'lucide-react';

type SavedEvaluation = {
  communication: number;
  technicalKnowledge: number;
  confidence: number;
  problemSolving: number;
  overallScore: number;
  feedback: string;
  improvementTip: string;
};

type SavedResponse = {
  questionId: number;
  question: string;
  answer: string;
  evaluation: SavedEvaluation;
};

type ReportData = {
  count: number;
  overall: number;
  communication: number;
  technicalKnowledge: number;
  confidence: number;
  problemSolving: number;
  responses: SavedResponse[];
};

function getReportData(): ReportData {
  try {
    const rawResponses = sessionStorage.getItem('interviewiq_responses');

    if (!rawResponses) {
      return {
        count: 0,
        overall: 0,
        communication: 0,
        technicalKnowledge: 0,
        confidence: 0,
        problemSolving: 0,
        responses: [],
      };
    }

    const responses = JSON.parse(rawResponses) as SavedResponse[];

    if (!Array.isArray(responses) || responses.length === 0) {
      return {
        count: 0,
        overall: 0,
        communication: 0,
        technicalKnowledge: 0,
        confidence: 0,
        problemSolving: 0,
        responses: [],
      };
    }

    const average = (key: keyof SavedEvaluation) =>
      Math.round(
        responses.reduce(
          (total, item) => total + Number(item.evaluation[key] || 0),
          0
        ) / responses.length
      );

    return {
      count: responses.length,
      overall: average('overallScore'),
      communication: average('communication'),
      technicalKnowledge: average('technicalKnowledge'),
      confidence: average('confidence'),
      problemSolving: average('problemSolving'),
      responses,
    };
  } catch {
    return {
      count: 0,
      overall: 0,
      communication: 0,
      technicalKnowledge: 0,
      confidence: 0,
      problemSolving: 0,
      responses: [],
    };
  }
}

export default function ResultsPage() {
  const report = getReportData();

  const hasResponses = report.count > 0;

  const categoryScores = [
    {
      label: 'Communication',
      value: report.communication,
      icon: MessageSquare,
      color: 'text-blue-400',
      bar: 'bg-blue-500',
    },
    {
      label: 'Technical Knowledge',
      value: report.technicalKnowledge,
      icon: Brain,
      color: 'text-purple-400',
      bar: 'bg-purple-500',
    },
    {
      label: 'Confidence',
      value: report.confidence,
      icon: Target,
      color: 'text-emerald-400',
      bar: 'bg-emerald-500',
    },
    {
      label: 'Problem Solving',
      value: report.problemSolving,
      icon: Lightbulb,
      color: 'text-amber-400',
      bar: 'bg-amber-500',
    },
  ];

  const sortedCategories = [...categoryScores].sort(
    (first, second) => second.value - first.value
  );

  const strongestAreas = sortedCategories.slice(0, 2);
  const improvementAreas = sortedCategories.slice(-2).reverse();

  const recommendation =
    report.overall >= 75
      ? 'Recommended for Next Round'
      : report.overall >= 55
        ? 'Potentially Suitable With Improvement'
        : 'More Practice Recommended';

  const recommendationColor =
    report.overall >= 75
      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      : report.overall >= 55
        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
        : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

  const performanceTitle =
    report.overall >= 75
      ? 'Strong performance overall'
      : report.overall >= 55
        ? 'Promising performance with room to grow'
        : 'A solid starting point for improvement';

  const performanceSummary =
    report.overall >= 75
      ? 'You demonstrated strong interview readiness across multiple areas. Continue refining your examples and use measurable results to make your answers even more compelling.'
      : report.overall >= 55
        ? 'You showed relevant understanding, but some answers need more structure, detail, and confidence. Practicing clear examples will raise your score quickly.'
        : 'Your responses need more detail and stronger examples. Focus on structured answers, practical experience, and explaining how you approached each challenge.';

  const latestFeedback =
    report.responses.length > 0
      ? report.responses[report.responses.length - 1].evaluation.feedback
      : 'Complete at least one question to receive personalized feedback.';

  const latestTip =
    report.responses.length > 0
      ? report.responses[report.responses.length - 1].evaluation.improvementTip
      : 'Use the STAR method: Situation, Task, Action, and Result.';

  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <header className="border-b border-dark-800 bg-dark-900/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-500 to-purple-600">
              <Brain className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold">InterviewIQ AI</span>
          </Link>

          <Link
            to="/dashboard"
            className="text-sm text-dark-300 transition-colors hover:text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/15">
            <Award className="h-8 w-8 text-emerald-400" />
          </div>

          <p className="mb-2 font-medium text-accent-400">Interview Complete</p>
          <h1 className="mb-3 text-4xl font-bold">Your Performance Report</h1>
          <p className="mx-auto max-w-xl text-dark-400">
            {hasResponses
              ? `AI-powered feedback based on ${report.count} completed interview response${report.count === 1 ? '' : 's'}.`
              : 'Complete interview questions to generate your personalized report.'}
          </p>
        </section>

        <section className="mb-8 rounded-2xl border border-dark-700 bg-dark-900/60 p-8">
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex h-44 w-44 flex-col items-center justify-center rounded-full border-[12px] border-accent-500 shadow-[0_0_40px_rgba(59,130,246,0.18)]">
              <span className="text-5xl font-bold">
                {hasResponses ? report.overall : '--'}
              </span>
              <span className="mt-1 text-sm text-dark-400">Overall Score</span>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div
                className={`mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${recommendationColor}`}
              >
                <CheckCircle2 className="h-4 w-4" />
                {hasResponses ? recommendation : 'Awaiting Interview Responses'}
              </div>

              <h2 className="mb-3 text-2xl font-semibold">
                {hasResponses ? performanceTitle : 'Start answering questions'}
              </h2>

              <p className="leading-relaxed text-dark-300">
                {hasResponses
                  ? performanceSummary
                  : 'Once you submit answers during the interview, InterviewIQ AI will calculate your scores, strengths, improvement areas, and personalized learning plan.'}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {categoryScores.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-dark-700 bg-dark-900/60 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-dark-800 ${item.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-2xl font-bold">
                    {hasResponses ? `${item.value}%` : '--'}
                  </span>
                </div>

                <p className="mb-3 text-sm text-dark-400">{item.label}</p>

                <div className="h-2 overflow-hidden rounded-full bg-dark-800">
                  <div
                    className={`h-full rounded-full ${item.bar}`}
                    style={{ width: `${hasResponses ? item.value : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-dark-700 bg-dark-900/60 p-6">
            <div className="mb-5 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <h2 className="text-xl font-semibold">Your Strengths</h2>
            </div>

            <div className="space-y-4">
              {hasResponses ? (
                strongestAreas.map((area) => (
                  <div key={area.label} className="flex gap-3 text-dark-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                    <p>
                      Your strongest area was <strong>{area.label}</strong> with a
                      score of <strong>{area.value}%</strong>.
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-dark-400">
                  Strengths will appear after you submit interview answers.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-dark-700 bg-dark-900/60 p-6">
            <div className="mb-5 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400" />
              <h2 className="text-xl font-semibold">Areas to Improve</h2>
            </div>

            <div className="space-y-4">
              {hasResponses ? (
                improvementAreas.map((area) => (
                  <div key={area.label} className="flex gap-3 text-dark-300">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                    <p>
                      Focus on improving <strong>{area.label}</strong>, currently
                      scored at <strong>{area.value}%</strong>.
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-dark-400">
                  Improvement areas will appear after you submit interview answers.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-dark-700 bg-dark-900/60 p-6">
          <div className="mb-5 flex items-center gap-3">
            <ClipboardCheck className="h-5 w-5 text-accent-400" />
            <h2 className="text-xl font-semibold">Latest AI Feedback</h2>
          </div>

          <p className="mb-4 leading-relaxed text-dark-300">{latestFeedback}</p>

          <div className="rounded-xl border border-accent-500/20 bg-accent-500/10 p-4">
            <p className="mb-1 text-sm font-medium text-accent-400">
              Recommended next step
            </p>
            <p className="text-sm text-dark-200">{latestTip}</p>
          </div>
        </section>

        <section className="mb-8 rounded-2xl border border-dark-700 bg-dark-900/60 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Target className="h-5 w-5 text-accent-400" />
            <h2 className="text-xl font-semibold">Personalized Learning Plan</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-dark-700 bg-dark-800/70 p-4">
              <p className="mb-2 text-sm font-medium text-accent-400">Week 1</p>
              <p className="text-sm text-dark-300">
                Practice structured STAR-method answers with measurable examples.
              </p>
            </div>

            <div className="rounded-xl border border-dark-700 bg-dark-800/70 p-4">
              <p className="mb-2 text-sm font-medium text-accent-400">Week 2</p>
              <p className="text-sm text-dark-300">
                Focus on your lowest-scoring category from this interview.
              </p>
            </div>

            <div className="rounded-xl border border-dark-700 bg-dark-800/70 p-4">
              <p className="mb-2 text-sm font-medium text-accent-400">Week 3</p>
              <p className="text-sm text-dark-300">
                Complete another mock interview and compare your new score.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center gap-4 pb-10 sm:flex-row">
          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-3 font-medium transition-colors hover:bg-accent-600"
          >
            <Download className="h-5 w-5" />
            Download Report
          </button>

          <Link
            to="/interview/setup"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-dark-700 bg-dark-800 px-6 py-3 font-medium transition-colors hover:bg-dark-700"
          >
            <RotateCcw className="h-5 w-5" />
            Start Another Interview
          </Link>
        </section>
      </main>
    </div>
  );
}