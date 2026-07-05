import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

type InterviewRecord = {
  id: string;
  startedAt: string;
  completedAt: string | null;
  role: string;
  difficulty: string;
  interviewType: string;
  questions: any[];
  responses: SavedResponse[];
  overallScore: number | null;
  communicationScore: number | null;
  technicalScore: number | null;
  confidenceScore: number | null;
  problemSolvingScore: number | null;
};

function getScoreStatus(score: number): { label: string; color: string } {
  if (score >= 75) return { label: 'Strong', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  if (score >= 55) return { label: 'Improving', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
  return { label: 'Needs Practice', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
}

function loadInterviewHistory(): InterviewRecord[] {
  try {
    const rawHistory = localStorage.getItem('interviewiq_interview_history');
    if (!rawHistory) return [];
    const history = JSON.parse(rawHistory);
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

function calculateStats(interviews: InterviewRecord[]) {
  const completedInterviews = interviews.filter(i => i.completedAt !== null);
  
  if (completedInterviews.length === 0) {
    return {
      totalInterviews: 0,
      averageScore: 0,
      bestScore: 0,
      latestScore: 0,
      averageCommunication: 0,
      averageTechnical: 0,
      averageConfidence: 0,
      averageProblemSolving: 0,
    };
  }

  const scores = completedInterviews.map(i => i.overallScore || 0);
  const communications = completedInterviews.map(i => i.communicationScore || 0);
  const technicals = completedInterviews.map(i => i.technicalScore || 0);
  const confidences = completedInterviews.map(i => i.confidenceScore || 0);
  const problemSolvings = completedInterviews.map(i => i.problemSolvingScore || 0);

  return {
    totalInterviews: completedInterviews.length,
    averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    bestScore: Math.max(...scores),
    latestScore: scores[scores.length - 1],
    averageCommunication: Math.round(communications.reduce((a, b) => a + b, 0) / communications.length),
    averageTechnical: Math.round(technicals.reduce((a, b) => a + b, 0) / technicals.length),
    averageConfidence: Math.round(confidences.reduce((a, b) => a + b, 0) / confidences.length),
    averageProblemSolving: Math.round(problemSolvings.reduce((a, b) => a + b, 0) / problemSolvings.length),
  };
}

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('week');
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    latestScore: 0,
    averageCommunication: 0,
    averageTechnical: 0,
    averageConfidence: 0,
    averageProblemSolving: 0,
  });

  useEffect(() => {
    const loadedInterviews = loadInterviewHistory();
    setInterviews(loadedInterviews);
    const calculatedStats = calculateStats(loadedInterviews);
    setStats(calculatedStats);
  }, []);

  const completedInterviews = interviews.filter(i => i.completedAt !== null);
  
  const interviewScores = completedInterviews.map(i => i.overallScore || 0);

  const recentInterviewHistory = completedInterviews
    .sort((a, b) => new Date(b.completedAt || '').getTime() - new Date(a.completedAt || '').getTime())
    .slice(0, 10)
    .map((interview, index) => {
      const completedDate = interview.completedAt ? new Date(interview.completedAt) : null;
      return {
        interviewNumber: completedInterviews.length - index,
        role: interview.role,
        difficulty: interview.difficulty,
        date: completedDate?.toLocaleDateString() || 'N/A',
        score: interview.overallScore || 0,
      };
    });

  const skillRadarData = [
    { name: 'Communication', value: stats.averageCommunication },
    { name: 'Technical', value: stats.averageTechnical },
    { name: 'Confidence', value: stats.averageConfidence },
    { name: 'Problem Solving', value: stats.averageProblemSolving },
  ];

  const bestCategory = skillRadarData.reduce((best, current) =>
    current.value > best.value ? current : best
  );

  const focusArea = skillRadarData.reduce((lowest, current) =>
    current.value < lowest.value ? current : lowest
  );

  const latestInterview = completedInterviews.length > 0 
    ? completedInterviews[completedInterviews.length - 1]
    : null;
  const latestFeedback = latestInterview?.responses?.length > 0
    ? (latestInterview?.responses ?? [])[(latestInterview?.responses ?? []).length - 1]?.evaluation?.feedback
    : null;
  const latestTip = latestInterview?.responses?.length > 0
    ? (latestInterview?.responses ?? [])[(latestInterview?.responses ?? []).length - 1]?.evaluation?.improvementTip
    : null;

  const aiInsights = [
    ...(stats.totalInterviews > 0
      ? [
          {
            type: stats.averageScore >= 75 ? 'success' : 'warning',
            title: stats.averageScore >= 75 ? 'Strong Performance' : 'Room for Improvement',
            description:
              stats.averageScore >= 75
                ? `Your average score is ${stats.averageScore}%. You're demonstrating solid interview readiness.`
                : `Your average score is ${stats.averageScore}%. Keep practicing to boost your confidence and scores.`,
          },
          {
            type: 'success',
            title: 'Your Strongest Area',
            description: `${bestCategory.name} is your strongest area with an average of ${bestCategory.value}%.`,
          },
          {
            type: 'warning',
            title: 'Focus Area',
            description: `${focusArea.name} needs improvement. Currently averaging ${focusArea.value}%. Consider extra practice here.`,
          },
        ]
      : []),
    {
      type: 'tip',
      title: 'Latest Insight',
      description: latestFeedback || 'Complete your first interview to receive personalized feedback.',
    },
    {
      type: 'success',
      title: 'Next Step',
      description: latestTip || 'Use the STAR method (Situation, Task, Action, Result) to structure your answers more effectively.',
    },
  ];

  const overallStats = {
    totalInterviews: stats.totalInterviews,
    averageScore: stats.averageScore,
    bestScore: stats.bestScore,
    latestScore: stats.latestScore,
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
                {overallStats.totalInterviews > 0 && (
                  <span className="text-emerald-400 text-sm flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-3xl font-bold">{overallStats.totalInterviews}</p>
              <p className="text-dark-400 text-sm mt-1">Interviews Completed</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                {overallStats.totalInterviews > 0 && (
                  <span className="text-sm font-medium">avg</span>
                )}
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
              <p className="text-3xl font-bold">{overallStats.bestScore}%</p>
              <p className="text-dark-400 text-sm mt-1">Best Score</p>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-3xl font-bold">{overallStats.latestScore}%</p>
              <p className="text-dark-400 text-sm mt-1">Latest Score</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Interview Score Trends */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Interview Score Trends</h3>
              {interviewScores.length > 0 ? (
                <div className="flex items-end justify-between h-48 gap-2">
                  {interviewScores.map((score, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="relative w-full group">
                        <div
                          className="w-full bg-gradient-to-t from-accent-500 to-emerald-400 rounded-t-lg transition-all hover:from-accent-400 hover:to-emerald-300 cursor-pointer"
                          style={{ height: `${Math.max(20, score * 2)}px` }}
                        />
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-dark-700 px-2 py-1 rounded text-xs opacity-0 group:hover:opacity-100 transition-opacity whitespace-nowrap">
                          {score}%
                        </div>
                      </div>
                      <span className="text-xs text-dark-400">I{i + 1}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                    <p className="text-dark-400 text-sm mb-4">No interview data yet</p>
                    <button
                      onClick={() => navigate('/interview/setup')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500 hover:bg-accent-600 rounded-lg font-medium transition-colors"
                    >
                      Start Interview
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Skill Radar Placeholder */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Skill Breakdown</h3>
              {completedInterviews.length > 0 ? (
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
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <div className="text-center">
                    <Target className="w-12 h-12 text-dark-600 mx-auto mb-3" />
                    <p className="text-dark-400 text-sm">Complete interviews to see your skill breakdown</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Resume Improvement & Recent Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Average Category Scores */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Average Category Scores</h3>
              {completedInterviews.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-40 text-sm text-dark-400">Communication</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${stats.averageCommunication}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{stats.averageCommunication}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-40 text-sm text-dark-400">Technical Knowledge</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent-500 rounded-full"
                        style={{ width: `${stats.averageTechnical}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{stats.averageTechnical}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-40 text-sm text-dark-400">Confidence</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${stats.averageConfidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{stats.averageConfidence}%</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-40 text-sm text-dark-400">Problem Solving</span>
                    <div className="flex-1 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${stats.averageProblemSolving}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12">{stats.averageProblemSolving}%</span>
                  </div>
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center">
                  <p className="text-dark-400 text-sm">Complete an interview to see your category scores</p>
                </div>
              )}
            </div>

            {/* Recent Performance */}
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-6">Recent Interview History</h3>
              {recentInterviewHistory.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {recentInterviewHistory.map((item, i) => {
                    const statusInfo = getScoreStatus(item.score);
                    return (
                      <div
                        key={i}
                        className="p-4 bg-dark-800/50 rounded-lg border border-dark-700/50 hover:border-dark-600 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                              <Brain className="w-4 h-4 text-accent-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm">Interview {item.interviewNumber}</p>
                              <p className="text-xs text-dark-400">{item.role} • {item.difficulty}</p>
                            </div>
                          </div>
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${statusInfo.color}`}>
                            {statusInfo.label}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-dark-400">Score:</span>
                            <span className="font-semibold text-accent-400">{item.score}%</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-dark-400">Date:</span>
                            <span className="font-medium text-emerald-400">{item.date}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="h-32 flex items-center justify-center">
                  <div className="text-center">
                    <Calendar className="w-10 h-10 text-dark-600 mx-auto mb-2" />
                    <p className="text-dark-400 text-sm">No completed interviews yet</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-accent-500" />
              <h3 className="text-lg font-semibold">AI Insights</h3>
            </div>
            {completedInterviews.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="w-14 h-14 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400 mb-6">Complete your first interview to unlock AI-powered insights and personalized recommendations.</p>
                <button
                  onClick={() => navigate('/interview/setup')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent-500 hover:bg-accent-600 rounded-lg font-medium transition-colors"
                >
                  Start Your First Interview
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
