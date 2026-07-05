import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  Briefcase,
  GraduationCap,
  AlertTriangle,
  Sparkles,
  Lightbulb,
  BarChart3,
  Code,
  Users,
  Clock,
  ChevronRight,
  Zap,
} from 'lucide-react';

export default function ResumeAnalysisPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock analysis data
  const mockAnalysis = {
    score: 78,
    skills: [
      'JavaScript', 'React', 'Node.js', 'TypeScript', 'Python',
      'SQL', 'Git', 'REST APIs', 'Agile', 'Problem Solving'
    ],
    projects: 4,
    experience: 'Mid-Level (3-5 years)',
    education: "Bachelor's in Computer Science",
    missingSkills: ['Docker', 'Kubernetes', 'GraphQL', 'AWS', 'System Design'],
    readiness: 72,
    recommendedRoles: [
      'Frontend Developer',
      'Full Stack Developer',
      'Software Engineer',
    ],
    suggestedSkills: [
      { name: 'Docker', priority: 'High' },
      { name: 'AWS', priority: 'High' },
      { name: 'GraphQL', priority: 'Medium' },
      { name: 'System Design', priority: 'Medium' },
    ],
    expectedDifficulty: 'Medium',
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="border-b border-dark-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-accent-500" />
            <span className="text-xl font-semibold">InterviewIQ</span>
          </Link>
          <Link to="/dashboard" className="text-dark-400 hover:text-white transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-3">Resume Analysis</h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Upload your resume to receive AI-powered analysis and generate personalized interview questions.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Upload Area */}
          <div className="lg:w-1/2">
            {/* Upload Card */}
            <div
              className={`glass-card rounded-2xl p-8 transition-all ${
                isDragging ? 'ring-2 ring-accent-500 bg-accent-500/5' : ''
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!uploadedFile ? (
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-800 flex items-center justify-center">
                    <Upload className="w-10 h-10 text-accent-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
                  <p className="text-dark-400 mb-6">Drag & Drop Here</p>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-accent-500 hover:bg-accent-600 rounded-xl font-medium transition-colors"
                  >
                    Browse Files
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-dark-400">
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      PDF
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      DOCX
                    </span>
                  </div>
                  <p className="mt-3 text-xs text-dark-500">Maximum size: 5 MB</p>
                </div>
              ) : (
                <div className="text-center">
                  {/* File Uploaded State */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                    {isAnalyzing ? (
                      <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                    ) : analysisComplete ? (
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    ) : (
                      <FileText className="w-10 h-10 text-emerald-400" />
                    )}
                  </div>

                  <h3 className="text-xl font-semibold mb-2">
                    {isAnalyzing ? 'Analyzing Resume...' : analysisComplete ? 'Analysis Complete!' : 'File Uploaded'}
                  </h3>

                  <div className="bg-dark-800/50 rounded-xl p-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-accent-500" />
                        <div className="text-left">
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-xs text-dark-400">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setUploadedFile(null);
                          setAnalysisComplete(false);
                        }}
                        className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-dark-400" />
                      </button>
                    </div>
                  </div>

                  {isAnalyzing && (
                    <div className="mt-6">
                      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full bg-accent-500 rounded-full animate-pulse w-2/3" />
                      </div>
                      <p className="text-sm text-dark-400 mt-2">Extracting skills and experience...</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Upload Tips */}
            {!uploadedFile && (
              <div className="mt-6 glass-card rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium mb-1">Tips for better analysis</p>
                    <ul className="text-xs text-dark-400 space-y-1">
                      <li>Use a clear, well-structured resume format</li>
                      <li>Include specific technologies and tools</li>
                      <li>Quantify your achievements where possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Analysis Results */}
          <div className="lg:w-1/2">
            {analysisComplete ? (
              <div className="space-y-6">
                {/* Resume Score Card */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-accent-500" />
                    Resume Score
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-dark-800"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-accent-500"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - mockAnalysis.score / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{mockAnalysis.score}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Overall score based on</p>
                      <p className="text-sm text-dark-400">skills, experience & formatting</p>
                      <p className="mt-2 text-emerald-400 font-medium">Good Resume!</p>
                    </div>
                  </div>
                </div>

                {/* Analysis Details */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Skills Detected */}
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-dark-400">Skills Detected</span>
                    </div>
                    <p className="text-2xl font-bold">{mockAnalysis.skills.length}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {mockAnalysis.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="text-xs bg-dark-800 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      <span className="text-xs bg-dark-800 px-2 py-1 rounded">
                        +{mockAnalysis.skills.length - 4} more
                      </span>
                    </div>
                  </div>

                  {/* Projects Found */}
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-dark-400">Projects Found</span>
                    </div>
                    <p className="text-2xl font-bold">{mockAnalysis.projects}</p>
                  </div>

                  {/* Experience Level */}
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-dark-400">Experience Level</span>
                    </div>
                    <p className="text-sm font-semibold">{mockAnalysis.experience}</p>
                  </div>

                  {/* Education */}
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <GraduationCap className="w-4 h-4 text-accent-500" />
                      <span className="text-sm text-dark-400">Education</span>
                    </div>
                    <p className="text-sm font-semibold">{mockAnalysis.education}</p>
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="glass-card rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-dark-400">Missing Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockAnalysis.missingSkills.map((skill) => (
                      <span key={skill} className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Interview Readiness */}
                <div className="glass-card rounded-xl p-4 bg-gradient-to-r from-accent-500/10 to-emerald-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-accent-500" />
                      <div>
                        <p className="text-sm text-dark-400">AI Interview Readiness</p>
                        <p className="text-xl font-bold">{mockAnalysis.readiness}%</p>
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-dark-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-500 to-emerald-400 rounded-full"
                        style={{ width: `${mockAnalysis.readiness}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Placeholder State */
              <div className="glass-card rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-dark-800 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-dark-600" />
                </div>
                <h3 className="font-semibold mb-2">No Resume Uploaded</h3>
                <p className="text-dark-400 text-sm">
                  Upload your resume to see AI-powered analysis and personalized recommendations.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recommendations Section */}
        {analysisComplete && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent-500" />
              Recommendations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Improve Resume */}
              <div className="glass-card rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h4 className="font-medium mb-2">Improve Resume</h4>
                <p className="text-xs text-dark-400 mb-3">
                  Add quantified achievements and specific metric outcomes.
                </p>
                <span className="text-xs text-blue-400 cursor-pointer hover:underline flex items-center gap-1">
                  View Tips <ChevronRight className="w-3 h-3" />
                </span>
              </div>

              {/* Recommended Job Roles */}
              <div className="glass-card rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                </div>
                <h4 className="font-medium mb-2">Recommended Roles</h4>
                <div className="space-y-1">
                  {mockAnalysis.recommendedRoles.map((role) => (
                    <p key={role} className="text-xs text-dark-300">{role}</p>
                  ))}
                </div>
              </div>

              {/* Suggested Skills */}
              <div className="glass-card rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center mb-3">
                  <TrendingUp className="w-5 h-5 text-accent-400" />
                </div>
                <h4 className="font-medium mb-2">Suggested Skills</h4>
                <div className="space-y-2">
                  {mockAnalysis.suggestedSkills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-xs text-dark-300">{skill.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        skill.priority === 'High'
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {skill.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expected Difficulty */}
              <div className="glass-card rounded-xl p-5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center mb-3">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-medium mb-2">Interview Difficulty</h4>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {mockAnalysis.expectedDifficulty}
                </span>
                <p className="text-xs text-dark-400 mt-2">
                  Based on your experience level
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Actions */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/interview"
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
              analysisComplete
                ? 'bg-accent-500 hover:bg-accent-600 hover:scale-105'
                : 'bg-dark-700 text-dark-500 cursor-not-allowed'
            }`}
          >
            <Zap className="w-5 h-5" />
            Generate Personalized Interview
          </Link>
          <Link
            to="/interview"
            className="flex items-center gap-2 glass-card hover:border-white/20 px-6 py-4 rounded-xl font-medium transition-all"
          >
            Skip Resume Analysis
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
