import { Link } from 'react-router-dom';
import {
  Plus,
  Upload,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Mic,
  Zap,
  Star,
  AlertCircle,
  Briefcase,
  Calendar,
  FileSearch,
  History,
  Download,
  CheckCircle2,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';

export default function DashboardPage() {
  const [animatedStats, setAnimatedStats] = useState({
    resumeScore: 0,
    avgScore: 0,
    interviews: 0,
    readiness: 0,
  });

  useEffect(() => {
    const targets = { resumeScore: 85, avgScore: 78, interviews: 12, readiness: 92 };
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedStats({
        resumeScore: Math.round(targets.resumeScore * progress),
        avgScore: Math.round(targets.avgScore * progress),
        interviews: Math.round(targets.interviews * progress),
        readiness: Math.round(targets.readiness * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      <Sidebar currentPage="/dashboard" />

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hello, Harsh 👋</h1>
              <p className="text-dark-400 mt-1">Ready to ace your next interview?</p>
            </div>
            <div className="flex items-center gap-2 text-dark-400">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{today}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Top Action Bar */}
          <div className="flex gap-4 mb-8">
            <Link to="/interview/setup" className="flex items-center gap-3 bg-accent-500 hover:bg-accent-600 px-6 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-500/25">
              <Plus className="w-5 h-5" />
              Start New Interview
            </Link>
            <button className="flex items-center gap-3 glass-card hover:border-white/20 px-6 py-4 rounded-xl font-medium text-lg transition-all hover:scale-105">
              <Upload className="w-5 h-5 text-accent-500" />
              Upload Resume
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={FileText}
              label="Resume Score"
              value={`${animatedStats.resumeScore}%`}
              trend="+12%"
              trendUp={true}
            />
            <StatCard
              icon={Target}
              label="Average Interview Score"
              value={`${animatedStats.avgScore}%`}
              trend="+5%"
              trendUp={true}
            />
            <StatCard
              icon={Mic}
              label="Interviews Completed"
              value={animatedStats.interviews.toString()}
              trend="+3"
              trendUp={true}
            />
            <StatCard
              icon={Award}
              label="Interview Readiness"
              value={`${animatedStats.readiness}%`}
              trend="+8%"
              trendUp={true}
            />
          </div>

          {/* AI Insights Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">AI Career Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <InsightCard
                icon={Star}
                title="Strongest Skill"
                value="Problem Solving"
                description="You excel at breaking down complex problems"
              />
              <InsightCard
                icon={AlertCircle}
                title="Weakest Skill"
                value="System Design"
                description="Focus on architecture patterns"
              />
              <InsightCard
                icon={Briefcase}
                title="Recommended Role"
                value="Frontend Engineer"
                description="Based on your skill profile"
              />
              <InsightCard
                icon={Zap}
                title="Focus This Week"
                value="React Hooks"
                description="Practice useEffect patterns"
              />
            </div>
          </div>

          {/* Progress Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Improvement Over Time</h3>
              <div className="flex items-end justify-between h-40 gap-2">
                {[35, 45, 52, 48, 65, 72, 78].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-gradient-to-t from-accent-500 to-emerald-400 rounded-t-lg transition-all duration-500"
                      style={{
                        height: `${height}%`,
                        animationDelay: `${i * 100}ms`,
                      }}
                    />
                    <span className="text-xs text-dark-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Radar */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Skill Distribution</h3>
              <div className="space-y-4">
                {[
                  { name: 'Technical', value: 85, color: 'bg-accent-500' },
                  { name: 'Communication', value: 72, color: 'bg-blue-500' },
                  { name: 'Problem Solving', value: 90, color: 'bg-emerald-500' },
                  { name: 'Leadership', value: 65, color: 'bg-amber-500' },
                  { name: 'System Design', value: 58, color: 'bg-rose-500' },
                ].map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-dark-400">{skill.name}</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full transition-all duration-1000`}
                        style={{
                          width: `${skill.value}%`,
                          animationDelay: `${i * 100}ms`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-10">{skill.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Interviews Table */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Interviews</h2>
              <button className="text-accent-500 hover:text-accent-400 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="glass-card rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-700">
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Role</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Difficulty</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Score</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-dark-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      role: 'Frontend Developer',
                      difficulty: 'Medium',
                      score: 85,
                      date: '2024-01-15',
                      status: 'Completed',
                    },
                    {
                      role: 'Full Stack Engineer',
                      difficulty: 'Hard',
                      score: 72,
                      date: '2024-01-14',
                      status: 'Completed',
                    },
                    {
                      role: 'React Developer',
                      difficulty: 'Easy',
                      score: 92,
                      date: '2024-01-13',
                      status: 'Completed',
                    },
                    {
                      role: 'Backend Developer',
                      difficulty: 'Medium',
                      score: 78,
                      date: '2024-01-12',
                      status: 'Completed',
                    },
                  ].map((interview, i) => (
                    <tr key={i} className="border-b border-dark-800 last:border-0 hover:bg-dark-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                            <Briefcase className="w-4 h-4 text-accent-500" />
                          </div>
                          <span className="font-medium">{interview.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            interview.difficulty === 'Easy'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : interview.difficulty === 'Medium'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {interview.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-dark-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent-500 rounded-full"
                              style={{ width: `${interview.score}%` }}
                            />
                          </div>
                          <span className="text-sm">{interview.score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-dark-400 text-sm">{interview.date}</td>
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-1 text-emerald-400 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          {interview.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommended Practice */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recommended Practice</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'React', icon: '⚛️', progress: 75 },
                { name: 'SQL', icon: '🗄️', progress: 60 },
                { name: 'DSA', icon: '🧮', progress: 45 },
                { name: 'REST APIs', icon: '🔌', progress: 80 },
                { name: 'Communication', icon: '💬', progress: 55 },
              ].map((topic, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-4 hover-lift cursor-pointer group"
                >
                  <div className="text-2xl mb-2">{topic.icon}</div>
                  <h3 className="font-medium mb-2">{topic.name}</h3>
                  <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-500 rounded-full transition-all group-hover:bg-accent-400"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-dark-400 mt-2">{topic.progress}% practiced</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard
                icon={FileSearch}
                title="Resume Analysis"
                description="Get AI feedback on your resume"
              />
              <QuickActionCard
                icon={Mic}
                title="Start Interview"
                description="Practice with AI interviewer"
              />
              <QuickActionCard
                icon={History}
                title="Interview History"
                description="Review past sessions"
              />
              <QuickActionCard
                icon={Download}
                title="Download Reports"
                description="Export your progress"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  trendUp,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 hover-lift group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center group-hover:bg-accent-500/20 transition-colors group-hover:scale-110 transform duration-300">
          <Icon className="w-6 h-6 text-accent-500" />
        </div>
        <div className={`flex items-center gap-1 text-sm ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {trend}
        </div>
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <p className="text-dark-400 text-sm">{label}</p>
    </div>
  );
}

// Insight Card Component
function InsightCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="glass-card rounded-xl p-4 hover-lift group">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-accent-500/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-accent-500" />
        </div>
        <span className="text-sm text-dark-400">{title}</span>
      </div>
      <p className="font-semibold text-lg mb-1">{value}</p>
      <p className="text-xs text-dark-400">{description}</p>
    </div>
  );
}

// Quick Action Card Component
function QuickActionCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <button className="glass-card rounded-xl p-6 hover-lift text-left group transition-all">
      <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-500/20 group-hover:scale-110 transition-all">
        <Icon className="w-6 h-6 text-accent-500" />
      </div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-dark-400">{description}</p>
    </button>
  );
}
