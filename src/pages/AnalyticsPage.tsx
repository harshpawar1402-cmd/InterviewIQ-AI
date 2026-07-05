import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Brain,
  BarChart3,
  Calendar,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');

  // Mock data
  const weeklyScores = [65, 72, 68, 75, 82, 78, 85];
  const improvementData = [
    { name: 'Problem Solving', before: 65, after: 85, change: '+20%' },
    { name: 'Technical Skills', before: 70, after: 82, change: '+12%' },
    { name: 'Communication', before: 58, after: 75, change: '+17%' },
    { name: 'System Design', before: 45, after: 55, change: '+10%' },
  ];

  const skillRadarData = [
    { name: 'Technical', value: 85 },
    { name: 'Communication', value: 72 },
    { name: 'Problem Solving', value: 90 },
    { name: 'Leadership', value: 65 },
    { name: 'System Design', value: 58 },
  ];

  const recentPerformance = [
    { date: 'Jan 15', topic: 'React Hooks', score: 85, timeSpent: '32 min' },
    { date: 'Jan 14', topic: 'System Design', score: 72, timeSpent: '45 min' },
    { date: 'Jan 13', topic: 'Data Structures', score: 78, timeSpent: '28 min' },
    { date: 'Jan 12', topic: 'Behavioral', score: 82, timeSpent: '25 min' },
    { date: 'Jan 11', topic: 'REST APIs', score: 92, timeSpent: '20 min' },
  ];

  const aiInsights = [
    {
      type: 'success',
      title: 'Strong Performance',
      description: 'Your technical interviews have improved by 15% this month.',
    },
    {
      type: 'warning',
      title: 'Focus Area',
      description: 'System Design scores are below average. Consider practicing architecture patterns.',
    },
    {
      type: 'tip',
      title: 'Practice Tip',
      description: 'Practice mock interviews on Wednesday evenings for best results based on your schedule.',
    },
    {
      type: 'success',
      title: 'Milestone Reached',
      description: "You've completed 50 interview sessions. Keep up the great work!",
    },
  ];

  const overallStats = {
    totalInterviews: 127,
    averageScore: 78,
    improvement: '+12%',
    streakDays: 14,
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      <Sidebar currentPage="/analytics" />

      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-dark-400 mt-1">Track your interview performance and improvement</p>
            </div>
            <div className="flex items-center gap-2 bg-dark-800 rounded-lg p-1">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${
                    timeRange === range
                      ? 'bg-accent-500 text-white'
                      : 'text-dark-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent-500" />
                </div>
                <span className="text-emerald-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +12%
                </span>
              </div>
              <p className="text-3xl font-bold">{overallStats.totalInterviews}</p>
              <p className="text-dark-400 text-sm mt-1">Total Interviews</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-emerald-400 text-sm flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +5%
                </span>
              </div>
              <p className="text-3xl font-bold">{overallStats.averageScore}%</p>
              <p className="text-dark-400 text-sm mt-1">Average Score</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-3xl font-bold">{overallStats.improvement}</p>
              <p className="text-dark-400 text-sm mt-1">Monthly Improvement</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-3xl font-bold">{overallStats.streakDays}</p>
              <p className="text-dark-400 text-sm mt-1">Day Streak</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interview Score Trends */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Interview Score Trends</h3>
              <div className="flex items-end justify-between h-48 gap-2">
                {weeklyScores.map((score, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative w-full group">
                      <div
                        className="w-full bg-gradient-to-t from-accent-500 to-emerald-400 rounded-t-lg transition-all hover:from-accent-400 hover:to-emerald-300 cursor-pointer"
                        style={{ height: `${score * 2}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-700 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {score}%
                      </div>
                    </div>
                    <span className="text-xs text-dark-400">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Radar Placeholder */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Skill Radar</h3>
              <div className="space-y-4">
                {skillRadarData.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-dark-400">{skill.name}</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-full transition-all duration-1000"
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

          {/* Resume Improvement & Recent Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Resume Improvement */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Resume Improvement</h3>
              <div className="space-y-4">
                {improvementData.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-32 text-sm text-dark-400 truncate">{item.name}</span>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden relative">
                        <div
                          className="h-full bg-dark-600 rounded-full absolute"
                          style={{ width: `${item.before}%` }}
                        />
                        <div
                          className="h-full bg-gradient-to-r from-accent-500 to-emerald-400 rounded-full transition-all"
                          style={{ width: `${item.after}%` }}
                        />
                      </div>
                      <span className="text-xs text-emerald-400 w-12">{item.change}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Performance */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Recent Performance</h3>
              <div className="space-y-3">
                {recentPerformance.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-accent-500" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.topic}</p>
                        <p className="text-xs text-dark-400">{item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="font-semibold">{item.score}%</p>
                        <p className="text-xs text-dark-400">{item.timeSpent}</p>
                      </div>
                      {item.score >= 80 ? (
                        <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-accent-500" />
              <h3 className="text-lg font-semibold">AI Insights</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiInsights.map((insight, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl ${
                    insight.type === 'success'
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : insight.type === 'warning'
                      ? 'bg-amber-500/10 border border-amber-500/20'
                      : 'bg-accent-500/10 border border-accent-500/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {insight.type === 'success' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : insight.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    ) : (
                      <Zap className="w-5 h-5 text-accent-400 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-medium mb-1">{insight.title}</h4>
                      <p className="text-sm text-dark-400">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
