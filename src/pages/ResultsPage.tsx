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
} from 'lucide-react';

const scoreCards = [
  {
    label: 'Communication',
    value: 86,
    icon: MessageSquare,
    color: 'text-blue-400',
    bar: 'bg-blue-500',
  },
  {
    label: 'Technical Knowledge',
    value: 84,
    icon: Brain,
    color: 'text-purple-400',
    bar: 'bg-purple-500',
  },
  {
    label: 'Confidence',
    value: 81,
    icon: Target,
    color: 'text-emerald-400',
    bar: 'bg-emerald-500',
  },
  {
    label: 'Problem Solving',
    value: 89,
    icon: Lightbulb,
    color: 'text-amber-400',
    bar: 'bg-amber-500',
  },
];

export default function ResultsPage() {
  const handleDownloadReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      <header className="border-b border-dark-800 bg-dark-900/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg">InterviewIQ AI</span>
          </Link>

          <Link
            to="/dashboard"
            className="text-sm text-dark-300 hover:text-white transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <section className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-5">
            <Award className="w-8 h-8 text-emerald-400" />
          </div>

          <p className="text-accent-400 font-medium mb-2">Interview Complete</p>
          <h1 className="text-4xl font-bold mb-3">Your Performance Report</h1>
          <p className="text-dark-400 max-w-xl mx-auto">
            Here is your AI-powered feedback for the Software Engineer mock interview.
          </p>
        </section>

        <section className="glass-card rounded-2xl p-8 mb-8 border border-dark-700">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative w-44 h-44 rounded-full border-[12px] border-accent-500 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.18)]">
              <span className="text-5xl font-bold">85</span>
              <span className="text-sm text-dark-400 mt-1">Overall Score</span>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle2 className="w-4 h-4" />
                Recommended for Next Round
              </div>

              <h2 className="text-2xl font-semibold mb-3">Strong performance overall</h2>
              <p className="text-dark-300 leading-relaxed">
                You demonstrated solid technical fundamentals, clear communication,
                and a thoughtful approach to problem-solving. Strengthening system
                design and adding more measurable examples would make your answers
                even more compelling.
              </p>
            </div>
          </div>
        </section>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {scoreCards.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="glass-card rounded-2xl p-5 border border-dark-700">
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold">{item.value}%</span>
                </div>

                <p className="text-sm text-dark-400 mb-3">{item.label}</p>

                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.bar}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <section className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 border border-dark-700">
            <div className="flex items-center gap-3 mb-5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold">Your Strengths</h2>
            </div>

            <div className="space-y-4">
              {[
                'Explained technical concepts in a clear, structured manner.',
                'Showed strong problem-solving ability and logical thinking.',
                'Demonstrated a positive, professional communication style.',
              ].map((strength) => (
                <div key={strength} className="flex gap-3 text-dark-300">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  <p>{strength}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-dark-700">
            <div className="flex items-center gap-3 mb-5">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-semibold">Areas to Improve</h2>
            </div>

            <div className="space-y-4">
              {[
                'Use the STAR method more consistently for behavioural questions.',
                'Add measurable results and metrics when describing projects.',
                'Practice system-design explanations with clearer trade-offs.',
              ].map((area) => (
                <div key={area} className="flex gap-3 text-dark-300">
                  <AlertCircle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
                  <p>{area}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-card rounded-2xl p-6 border border-dark-700 mb-8">
          <div className="flex items-center gap-3 mb-5">
            <Target className="w-5 h-5 text-accent-400" />
            <h2 className="text-xl font-semibold">Personalized Learning Plan</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              ['Week 1', 'Practice SQL joins and REST API concepts.'],
              ['Week 2', 'Prepare two project stories using the STAR method.'],
              ['Week 3', 'Complete a system-design mock interview.'],
            ].map(([week, task]) => (
              <div key={week} className="bg-dark-800/70 rounded-xl p-4 border border-dark-700">
                <p className="text-accent-400 text-sm font-medium mb-2">{week}</p>
                <p className="text-sm text-dark-300">{task}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col sm:flex-row justify-center gap-4 pb-10">
          <button
            onClick={handleDownloadReport}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 font-medium transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Report
          </button>

          <Link
            to="/interview/setup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-800 hover:bg-dark-700 border border-dark-700 font-medium transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Start Another Interview
          </Link>
        </section>
      </main>
    </div>
  );
}