import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Brain,
  ArrowLeft,
  Monitor,
  Server,
  Layers,
  BarChart3,
  Cpu,
  Cloud,
  Palette,
  Shield,
  Code,
  Clock,
  Target,
  Zap,
  MessageSquare,
  GitBranch,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const ROLES = [
  { id: 'frontend', name: 'Frontend Developer', icon: Monitor, description: 'React, Vue, UI/UX, CSS' },
  { id: 'backend', name: 'Backend Developer', icon: Server, description: 'Node.js, Python, APIs, Databases' },
  { id: 'fullstack', name: 'Full Stack Developer', icon: Layers, description: 'Frontend + Backend expertise' },
  { id: 'data', name: 'Data Analyst', icon: BarChart3, description: 'SQL, Python, Data Visualization' },
  { id: 'ml', name: 'Machine Learning Engineer', icon: Cpu, description: 'ML models, TensorFlow, Python' },
  { id: 'devops', name: 'DevOps Engineer', icon: Cloud, description: 'CI/CD, Docker, Kubernetes' },
  { id: 'design', name: 'UI/UX Designer', icon: Palette, description: 'Figma, User Research, Prototyping' },
  { id: 'security', name: 'Cybersecurity Analyst', icon: Shield, description: 'Security audits, Pen testing' },
  { id: 'software', name: 'Software Engineer', icon: Code, description: 'General programming, DSA' },
];

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy', description: 'Beginner-friendly questions' },
  { id: 'medium', name: 'Medium', description: 'Intermediate level' },
  { id: 'hard', name: 'Hard', description: 'Advanced challenges' },
];

const INTERVIEW_TYPES = [
  { id: 'technical', name: 'Technical', icon: Code },
  { id: 'hr', name: 'HR', icon: MessageSquare },
  { id: 'behavioral', name: 'Behavioral', icon: Target },
  { id: 'mixed', name: 'Mixed', icon: GitBranch },
  { id: 'system-design', name: 'System Design', icon: Layers },
];

const QUESTION_COUNTS = [5, 10, 15, 20];

const TIME_LIMITS = [
  { id: 'none', name: 'No Limit', minutes: null },
  { id: '15', name: '15 Minutes', minutes: 15 },
  { id: '30', name: '30 Minutes', minutes: 30 },
  { id: '45', name: '45 Minutes', minutes: 45 },
  { id: '60', name: '60 Minutes', minutes: 60 },
];

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<string>('medium');
  const [interviewType, setInterviewType] = useState<string>('technical');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timeLimit, setTimeLimit] = useState<string>('45');
  const [instructions, setInstructions] = useState('');

  const selectedRoleData = ROLES.find((r) => r.id === selectedRole);
  const selectedTimeData = TIME_LIMITS.find((t) => t.id === timeLimit);
  const estimatedDuration = selectedTimeData?.minutes ? `${selectedTimeData.minutes} min` : 'No limit';

  // Calculate AI readiness based on selections
  const calculateReadiness = () => {
    let score = 60;
    if (selectedRole) score += 20;
    if (difficulty) score += 5;
    if (interviewType) score += 5;
    if (questionCount >= 10) score += 5;
    if (instructions.trim()) score += 5;
    return Math.min(score, 100);
  };

  const handleStartInterview = () => {
    const setupConfig = {
      role: selectedRole,
      difficulty,
      interviewType,
      questionCount,
      timeLimit: selectedTimeData?.minutes || null,
    };
    sessionStorage.setItem('interviewiq_setup_config', JSON.stringify(setupConfig));
    navigate('/resume-analysis');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="border-b border-dark-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-semibold">InterviewIQ</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Side - Setup Form */}
          <div className="flex-1">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Prepare for Your AI Interview</h1>
              <p className="text-dark-400">Customize your interview experience before you begin.</p>
            </div>

            {/* Section 1: Choose Your Role */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent-500" />
                Choose Your Role
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`glass-card rounded-xl p-4 text-left transition-all hover-lift ${
                      selectedRole === role.id
                        ? 'ring-2 ring-accent-500 bg-accent-500/10'
                        : 'hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedRole === role.id
                            ? 'bg-accent-500 text-white'
                            : 'bg-dark-800 text-dark-400'
                        }`}
                      >
                        <role.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-1">{role.name}</p>
                        <p className="text-xs text-dark-400">{role.description}</p>
                      </div>
                      {selectedRole === role.id && (
                        <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 2: Difficulty */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-500" />
                Difficulty
              </h2>
              <div className="flex flex-wrap gap-3">
                {DIFFICULTIES.map((diff) => (
                  <button
                    key={diff.id}
                    onClick={() => setDifficulty(diff.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      difficulty === diff.id
                        ? 'bg-accent-500 text-white'
                        : 'glass-card hover:border-white/20'
                    }`}
                  >
                    <span className="block">{diff.name}</span>
                    <span className={`text-xs ${difficulty === diff.id ? 'text-white/70' : 'text-dark-400'}`}>
                      {diff.description}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 3: Interview Type */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent-500" />
                Interview Type
              </h2>
              <div className="flex flex-wrap gap-3">
                {INTERVIEW_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setInterviewType(type.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                      interviewType === type.id
                        ? 'bg-accent-500 text-white'
                        : 'glass-card hover:border-white/20'
                    }`}
                  >
                    <type.icon className="w-4 h-4" />
                    {type.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Section 4: Number of Questions */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent-500" />
                Number of Questions
              </h2>
              <div className="flex gap-3">
                {QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`w-16 h-16 rounded-xl font-bold text-lg transition-all ${
                      questionCount === count
                        ? 'bg-accent-500 text-white'
                        : 'glass-card hover:border-white/20'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </section>

            {/* Section 5: Time Limit */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-500" />
                Time Limit
              </h2>
              <div className="flex flex-wrap gap-3">
                {TIME_LIMITS.map((time) => (
                  <button
                    key={time.id}
                    onClick={() => setTimeLimit(time.id)}
                    className={`px-5 py-3 rounded-xl font-medium transition-all ${
                      timeLimit === time.id
                        ? 'bg-accent-500 text-white'
                        : 'glass-card hover:border-white/20'
                    }`}
                  >
                    {time.name}
                  </button>
                ))}
              </div>
            </section>

            {/* Section 6: Additional Instructions */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent-500" />
                Additional Instructions
              </h2>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Example: Focus on React and JavaScript. Ask medium-level questions. Include some behavioural questions."
                className="w-full h-32 bg-dark-800/50 border border-dark-700 rounded-xl p-4 text-white placeholder-dark-500 resize-none focus:outline-none focus:border-accent-500 transition-colors"
              />
            </section>

            {/* Bottom Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleStartInterview}
                disabled={!selectedRole}
                className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:bg-dark-700 disabled:text-dark-500 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 disabled:hover:scale-100"
              >
                Start AI Interview
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 glass-card hover:border-white/20 px-6 py-4 rounded-xl font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>

          {/* Right Sidebar - Interview Summary */}
          <div className="xl:w-80">
            <div className="glass-card rounded-2xl p-6 sticky top-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-500" />
                Interview Summary
              </h3>

              <div className="space-y-4">
                {/* Selected Role */}
                <SummaryItem
                  label="Selected Role"
                  value={selectedRoleData?.name || 'Not selected'}
                  icon={selectedRoleData?.icon || Code}
                  isPlaceholder={!selectedRole}
                />

                {/* Difficulty */}
                <SummaryItem
                  label="Difficulty"
                  value={DIFFICULTIES.find((d) => d.id === difficulty)?.name || 'Medium'}
                  icon={Target}
                />

                {/* Interview Type */}
                <SummaryItem
                  label="Interview Type"
                  value={INTERVIEW_TYPES.find((t) => t.id === interviewType)?.name || 'Technical'}
                  icon={MessageSquare}
                />

                {/* Questions */}
                <SummaryItem
                  label="Questions"
                  value={`${questionCount} questions`}
                  icon={Brain}
                />

                {/* Estimated Duration */}
                <SummaryItem
                  label="Estimated Duration"
                  value={estimatedDuration}
                  icon={Clock}
                />
              </div>

              {/* AI Readiness Score */}
              <div className="mt-6 pt-6 border-t border-dark-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-dark-400">AI Readiness Score</span>
                  <span className="font-bold text-lg text-accent-500">{calculateReadiness()}%</span>
                </div>
                <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${calculateReadiness()}%` }}
                  />
                </div>
                <p className="text-xs text-dark-500 mt-2">
                  {calculateReadiness() >= 80
                    ? "You're all set! Ready to start."
                    : calculateReadiness() >= 60
                    ? 'Almost ready. Select a role to continue.'
                    : 'Complete the setup to begin.'}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="mt-6 p-4 bg-dark-800/50 rounded-xl">
                <p className="text-xs text-dark-400 uppercase tracking-wider mb-2">Pro Tip</p>
                <p className="text-sm text-dark-300">
                  {selectedRoleData
                    ? `${selectedRoleData.name} interviews typically focus on ${
                        selectedRoleData.description
                      }. Prepare accordingly!`
                    : 'Select a role to get personalized preparation tips.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Summary Item Component
function SummaryItem({
  label,
  value,
  icon: Icon,
  isPlaceholder,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  isPlaceholder?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-dark-800 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-accent-500" />
      </div>
      <div>
        <p className="text-xs text-dark-400">{label}</p>
        <p className={`text-sm font-medium ${isPlaceholder ? 'text-dark-500' : 'text-white'}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
