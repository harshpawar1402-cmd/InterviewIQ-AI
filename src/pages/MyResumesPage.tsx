import { useState } from 'react';
import {
  FileText,
  Calendar,
  Eye,
  Trash2,
  Upload,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

interface Resume {
  id: number;
  name: string;
  score: number;
  uploadDate: string;
  skills: number;
  status: 'Analyzed' | 'Processing' | 'Pending';
}

export default function MyResumesPage() {
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const resumes: Resume[] = [
    {
      id: 1,
      name: 'Software Engineer Resume.pdf',
      score: 85,
      uploadDate: '2024-01-15',
      skills: 12,
      status: 'Analyzed',
    },
    {
      id: 2,
      name: 'Frontend Developer Resume.docx',
      score: 72,
      uploadDate: '2024-01-12',
      skills: 8,
      status: 'Analyzed',
    },
    {
      id: 3,
      name: 'Full Stack Resume.pdf',
      score: 78,
      uploadDate: '2024-01-10',
      skills: 10,
      status: 'Analyzed',
    },
    {
      id: 4,
      name: 'React Developer Resume.pdf',
      score: 92,
      uploadDate: '2024-01-08',
      skills: 14,
      status: 'Analyzed',
    },
    {
      id: 5,
      name: 'Backend Engineer Resume.pdf',
      score: 65,
      uploadDate: '2024-01-05',
      skills: 6,
      status: 'Processing',
    },
  ];

  const filteredResumes = resumes.filter((resume) =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedResumes = [...filteredResumes].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const totalResumes = resumes.length;
  const averageScore = Math.round(resumes.reduce((acc, r) => acc + r.score, 0) / resumes.length);
  const topScore = Math.max(...resumes.map((r) => r.score));

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      <Sidebar currentPage="/my-resumes" />

      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Resumes</h1>
              <p className="text-dark-400 mt-1">Manage and analyze your uploaded resumes</p>
            </div>
            <button className="flex items-center gap-2 bg-accent-500 hover:bg-accent-600 px-4 py-2 rounded-lg font-medium transition-colors">
              <Upload className="w-4 h-4" />
              Upload Resume
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card rounded-2xl p-6">
              <p className="text-dark-400 text-sm mb-2">Total Resumes</p>
              <p className="text-3xl font-bold">{totalResumes}</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="text-dark-400 text-sm mb-2">Average Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}%</p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <p className="text-dark-400 text-sm mb-2">Top Score</p>
              <p className={`text-3xl font-bold ${getScoreColor(topScore)}`}>{topScore}%</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="text"
                placeholder="Search resumes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:border-accent-500 transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-2 bg-dark-800 border border-dark-700 rounded-lg focus:outline-none focus:border-accent-500 appearance-none cursor-pointer transition-colors"
              >
                <option value="date">Upload Date</option>
                <option value="score">Score</option>
                <option value="name">Name</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 pointer-events-none" />
            </div>
          </div>

          {/* Resume Cards */}
          <div className="space-y-4">
            {sortedResumes.map((resume) => (
              <div
                key={resume.id}
                className="glass-card rounded-xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-accent-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{resume.name}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-dark-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {resume.uploadDate}
                        </span>
                        <span>{resume.skills} Skills</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs ${
                            resume.status === 'Analyzed'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : resume.status === 'Processing'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-dark-700 text-dark-400'
                          }`}
                        >
                          {resume.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Resume Score */}
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-dark-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getScoreBg(resume.score)} rounded-full transition-all`}
                          style={{ width: `${resume.score}%` }}
                        />
                      </div>
                      <span className={`font-semibold ${getScoreColor(resume.score)}`}>
                        {resume.score}%
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-dark-700 rounded-lg transition-colors group">
                        <Eye className="w-5 h-5 text-dark-400 group-hover:text-white" />
                      </button>
                      <button className="p-2 hover:bg-rose-500/20 rounded-lg transition-colors group">
                        <Trash2 className="w-5 h-5 text-dark-400 group-hover:text-rose-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedResumes.length === 0 && (
            <div className="glass-card rounded-xl p-12 text-center">
              <FileText className="w-12 h-12 text-dark-600 mx-auto mb-4" />
              <h3 className="font-medium mb-2">No resumes found</h3>
              <p className="text-dark-400 text-sm">
                Upload your first resume to get started with AI analysis.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
