import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import {
  analyzeResumeText,
  generatePersonalizedInterviewQuestions,
  type ResumeAnalysis,
} from '../services/geminiService';

// Role-specific question banks
interface RoleQuestions {
  [key: string]: {
    [key: string]: string[];
  };
}

const ROLE_QUESTION_BANKS: RoleQuestions = {
  frontend: {
    technical: [
      'Explain the difference between React functional and class components.',
      'How do you handle state management in a large React application?',
      'What is the Virtual DOM and how does it improve performance?',
      'Describe CSS Grid vs Flexbox and when you would use each.',
      'How do you optimize the performance of a React application?',
      'Explain lazy loading and code splitting in React.',
      'What are React Hooks and why are they useful?',
      'How do you handle form validation in React?',
      'Explain the concept of controlled vs uncontrolled components.',
      'What is the purpose of useEffect and how do you use it?',
      'How would you implement responsive design for mobile devices?',
      'Describe your experience with CSS preprocessors like SASS or LESS.',
      'How do you debug a React application?',
      'What are the benefits of using TypeScript in a React project?',
      'Explain the shadow DOM and its use cases.',
    ],
    behavioral: [
      'Tell me about a time you had to learn a new framework or library quickly.',
      'Describe a challenging UI bug you encountered and how you fixed it.',
      'How do you approach working with design teams on UI implementation?',
      'Tell me about a time you improved the user experience of an application.',
      'Describe your approach to writing maintainable and readable code.',
      'How do you handle feedback on your code during code reviews?',
      'Tell me about a time you had to optimize a slow-performing component.',
    ],
    'system-design': [
      'How would you design a scalable single-page application architecture?',
      'Describe your approach to organizing a large React codebase.',
      'How would you implement a component library for a large organization?',
      'Explain how you would structure state management for a complex application.',
    ],
  },
  backend: {
    technical: [
      'Explain RESTful API design principles.',
      'What is the difference between SQL and NoSQL databases?',
      'How do you handle authentication and authorization in a backend service?',
      'Describe microservices architecture and its benefits.',
      'How do you implement caching strategies in a backend application?',
      'Explain database indexing and its impact on query performance.',
      'What are the SOLID principles and how do you apply them?',
      'Describe API rate limiting and how you would implement it.',
      'How do you handle transactions and data consistency in a distributed system?',
      'Explain the difference between synchronous and asynchronous processing.',
      'How would you design a messaging queue system?',
      'Describe your experience with ORM frameworks.',
      'How do you implement pagination efficiently?',
      'What is the purpose of database normalization?',
      'Explain load balancing and its types.',
    ],
    behavioral: [
      'Tell me about a time you had to debug a production issue.',
      'Describe a complex backend feature you designed and implemented.',
      'How do you approach scaling a backend system that is growing in traffic?',
      'Tell me about your experience working with databases.',
      'Describe a time you had to refactor legacy code.',
      'How do you document your APIs for other developers?',
      'Tell me about a time you had to optimize database queries.',
    ],
    'system-design': [
      'How would you design a URL shortening service?',
      'Design a real-time notification system.',
      'How would you design a highly scalable chat application?',
      'Describe how you would architect a content delivery system.',
    ],
  },
  fullstack: {
    technical: [
      'Describe your approach to building a full-stack web application.',
      'How do you handle communication between frontend and backend?',
      'Explain your experience with both frontend and backend technologies.',
      'How do you ensure data consistency between frontend and backend?',
      'Describe your experience with API design and implementation.',
      'How do you manage state across frontend and backend?',
      'Explain your approach to testing in a full-stack application.',
      'How would you implement real-time features in a full-stack app?',
      'Describe your experience with deployment and DevOps.',
      'How do you handle security concerns in a full-stack application?',
    ],
    behavioral: [
      'Tell me about your most complex full-stack project.',
      'How do you prioritize work on frontend vs backend tasks?',
      'Describe a time you had to collaborate between frontend and backend teams.',
      'How do you stay updated with technologies across both frontend and backend?',
      'Tell me about a time you had to make architectural decisions.',
    ],
    'system-design': [
      'Design a scalable e-commerce platform.',
      'How would you architect a multi-tenant SaaS application?',
      'Design a real-time collaboration tool like Google Docs.',
    ],
  },
  data: {
    technical: [
      'Explain the difference between structured and unstructured data.',
      'How do you write efficient SQL queries?',
      'Describe your experience with data visualization tools.',
      'What is the difference between OLTP and OLAP?',
      'Explain normalization and denormalization in databases.',
      'How would you handle missing or corrupt data in a dataset?',
      'Describe ETL processes and tools you have used.',
      'How do you identify outliers in a dataset?',
      'Explain aggregation functions and when to use them.',
      'What is the purpose of window functions in SQL?',
      'Describe your experience with Python for data analysis.',
      'How would you approach exploratory data analysis?',
      'Explain time-series data and how you would analyze it.',
      'Describe your experience with data warehousing.',
      'How do you handle performance optimization in complex queries?',
    ],
    behavioral: [
      'Tell me about a time you discovered valuable insights from data.',
      'How do you present complex data findings to non-technical stakeholders?',
      'Describe a time you had to work with messy or incomplete data.',
      'How do you approach validating data quality?',
      'Tell me about a time you improved a business process through data analysis.',
    ],
  },
  ml: {
    technical: [
      'Explain the difference between supervised and unsupervised learning.',
      'Describe your experience with TensorFlow or PyTorch.',
      'How do you prevent overfitting in machine learning models?',
      'Explain cross-validation and why it is important.',
      'What is the purpose of feature engineering?',
      'Describe different activation functions and their use cases.',
      'How do you handle imbalanced datasets?',
      'Explain the difference between classification and regression.',
      'What is the curse of dimensionality?',
      'Describe your experience with deep learning architectures.',
      'How would you approach a new machine learning problem?',
      'Explain gradient descent and backpropagation.',
      'What are hyperparameters and how do you tune them?',
      'Describe your experience with model evaluation metrics.',
      'How do you handle missing data in machine learning?',
    ],
    behavioral: [
      'Tell me about a machine learning project you worked on.',
      'Describe a time you had to explain model results to business stakeholders.',
      'How do you approach deploying a machine learning model to production?',
      'Tell me about challenges you faced when building ML models.',
      'Describe how you stay updated with new ML techniques.',
    ],
  },
  devops: {
    technical: [
      'Explain Docker and how containerization works.',
      'Describe your experience with Kubernetes orchestration.',
      'How would you set up a CI/CD pipeline?',
      'Explain Infrastructure as Code and its benefits.',
      'Describe your experience with monitoring and logging.',
      'How do you implement automated testing in a CI/CD pipeline?',
      'Explain blue-green deployment and canary releases.',
      'How would you set up auto-scaling for an application?',
      'Describe your experience with cloud platforms.',
      'How do you handle secrets and environment variables?',
      'Explain load balancing and its types.',
      'Describe your experience with configuration management tools.',
      'How would you implement disaster recovery?',
      'Explain the importance of idempotency in infrastructure.',
      'How do you optimize infrastructure costs?',
    ],
    behavioral: [
      'Tell me about a time you improved deployment efficiency.',
      'Describe a critical production incident and how you handled it.',
      'How do you approach automating manual processes?',
      'Tell me about your experience on-call for production systems.',
      'How do you collaborate with development teams on deployment?',
    ],
  },
  design: {
    technical: [
      'Describe your experience with Figma and design tools.',
      'How do you approach responsive design for different screen sizes?',
      'Explain your process for creating wireframes and prototypes.',
      'How do you ensure accessibility in your designs?',
      'Describe your experience with design systems.',
      'How do you handle design feedback and iterations?',
      'Explain your approach to information architecture.',
      'How do you balance aesthetics with functionality?',
      'Describe your experience with user testing.',
      'How would you improve the user experience of an existing application?',
      'Explain the importance of typography in UI design.',
      'How do you approach color theory in design?',
      'Describe your experience with mobile app design.',
      'How do you ensure consistency across a product?',
      'Explain micro-interactions and their role in UX.',
    ],
    behavioral: [
      'Tell me about a design project you are proud of.',
      'How do you approach user research and feedback?',
      'Describe a time you had to advocate for a design decision.',
      'Tell me about your experience collaborating with engineers.',
      'How do you stay current with design trends and best practices?',
    ],
  },
  security: {
    technical: [
      'Explain the OWASP Top 10 vulnerabilities.',
      'Describe SQL injection and how to prevent it.',
      'How would you conduct a security audit of an application?',
      'Explain encryption vs hashing and their use cases.',
      'Describe your experience with penetration testing.',
      'How do you implement secure authentication systems?',
      'Explain network security concepts like firewalls and VPNs.',
      'How would you handle a security breach?',
      'Describe your experience with security scanning tools.',
      'How do you ensure secure API design?',
      'Explain certificate-based authentication.',
      'Describe your experience with vulnerability assessment.',
      'How do you implement secure password storage?',
      'Explain zero-trust security architecture.',
      'How would you design a secure data transmission system?',
    ],
    behavioral: [
      'Tell me about a security vulnerability you discovered and fixed.',
      'How do you approach security in your development process?',
      'Describe your experience working on security compliance projects.',
      'How do you stay updated with security threats and best practices?',
      'Tell me about a time you had to balance security with usability.',
    ],
  },
  software: {
    technical: [
      'Explain the SOLID principles.',
      'Describe design patterns you use regularly.',
      'How do you approach writing testable code?',
      'Explain the difference between unit and integration tests.',
      'How do you handle version control and Git workflows?',
      'Describe your experience with debugging techniques.',
      'How do you approach refactoring legacy code?',
      'Explain the importance of code review.',
      'How do you handle technical debt?',
      'Describe your experience with different programming paradigms.',
      'How do you optimize code for performance?',
      'Explain the concept of modularity in software design.',
      'How would you approach learning a new programming language?',
      'Describe your experience with build tools and package managers.',
      'How do you ensure code quality and maintainability?',
    ],
    behavioral: [
      'Tell me about a complex problem you solved.',
      'Describe your approach to learning new technologies.',
      'How do you handle tight deadlines?',
      'Tell me about a time you had to explain technical concepts to non-technical people.',
      'How do you collaborate with other developers?',
      'Describe a time you had to debug a difficult issue.',
      'How do you approach code reviews?',
    ],
  },
  marketing: {
    technical: [
      'Explain your experience with marketing automation tools.',
      'How do you approach SEO and keyword research?',
      'Describe your experience with analytics platforms.',
      'How do you measure campaign ROI?',
      'Explain A/B testing and its implementation.',
      'Describe your experience with social media marketing.',
      'How would you create a content marketing strategy?',
      'Explain marketing funnel optimization.',
      'Describe your experience with CRM systems.',
      'How do you approach email marketing campaigns?',
      'Explain customer segmentation and personalization.',
      'How do you use data to inform marketing decisions?',
      'Describe your experience with paid advertising platforms.',
      'How would you build a brand awareness campaign?',
      'Explain customer journey mapping.',
    ],
    behavioral: [
      'Tell me about a successful marketing campaign you led.',
      'How do you approach market research?',
      'Describe a time you had to pivot your marketing strategy.',
      'How do you measure success in marketing initiatives?',
      'Tell me about your experience with cross-functional collaboration.',
      'How do you stay updated with marketing trends?',
    ],
  },
};

function generateRoleSpecificQuestions(
  role: string,
  interviewType: string,
  questionCount: number
): Array<{ id: number; question: string; focus: string }> {
  const roleQuestions = ROLE_QUESTION_BANKS[role] || ROLE_QUESTION_BANKS['software'];
  
  // Get questions for the selected interview type, or mix types if not available
  let selectedQuestions: string[] = [];
  
  if (interviewType === 'mixed') {
    // Mix different types of questions
    const allQuestions = Object.values(roleQuestions).flat();
    selectedQuestions = allQuestions;
  } else if (roleQuestions[interviewType]) {
    selectedQuestions = roleQuestions[interviewType];
  } else {
    // Fall back to technical questions if type not found
    selectedQuestions = roleQuestions['technical'] || Object.values(roleQuestions)[0] || [];
  }
  
  // Generate questions by cycling through available questions to reach desired count
  const generatedQuestions: Array<{ id: number; question: string; focus: string }> = [];
  const usedIndices = new Set<number>();
  
  for (let i = 0; i < questionCount; i++) {
    const questionIndex = i % selectedQuestions.length;
    
    // If we've cycled through all questions, just use them again
    if (i >= selectedQuestions.length) {
      usedIndices.clear();
    }
    
    const question = selectedQuestions[questionIndex];
    generatedQuestions.push({
      id: i + 1,
      question,
      focus: `${interviewType === 'mixed' ? 'Mixed' : interviewType.charAt(0).toUpperCase() + interviewType.slice(1)} - ${role.replace(/([A-Z])/g, ' $1').trim()}`,
    });
  }
  
  return generatedQuestions;
}

export default function ResumeAnalysisPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [resumeText, setResumeText] = useState('');
const [aiAnalysis, setAiAnalysis] = useState<ResumeAnalysis | null>(null);
const [analysisError, setAnalysisError] = useState('');
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
  const displayedAnalysis = aiAnalysis ?? mockAnalysis;

const suggestedSkills = displayedAnalysis.missingSkills.map((name, index) => ({
  name,
  priority: index < 2 ? 'High' : 'Medium',
}));

const expectedDifficulty =
  displayedAnalysis.readiness >= 80
    ? 'Hard'
    : displayedAnalysis.readiness >= 60
      ? 'Medium'
      : 'Easy';

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

  const saveResumeToStorage = (analysis: ResumeAnalysis) => {
  const savedResumes = JSON.parse(localStorage.getItem('interviewiq_saved_resumes') || '[]');
  
  const title = uploadedFile ? uploadedFile.name : 'Pasted Resume';
  const sourceType = uploadedFile ? 'uploaded' : 'pasted';
  const timestamp = new Date().toISOString();
  
  // Check if resume with same title already exists
  const existingIndex = savedResumes.findIndex((r: any) => r.title === title);
  
  const newRecord = {
    id: existingIndex >= 0 ? savedResumes[existingIndex].id : Date.now(),
    title,
    createdAt: existingIndex >= 0 ? savedResumes[existingIndex].createdAt : timestamp,
    updatedAt: timestamp,
    score: analysis.score,
    readiness: analysis.readiness,
    skills: analysis.skills,
    experience: analysis.experience,
    education: analysis.education,
    recommendedRoles: analysis.recommendedRoles,
    sourceType,
  };
  
  if (existingIndex >= 0) {
    savedResumes[existingIndex] = newRecord;
  } else {
    savedResumes.push(newRecord);
  }
  
  localStorage.setItem('interviewiq_saved_resumes', JSON.stringify(savedResumes));
};

const handleRealAnalysis = async () => {
  if (resumeText.trim().length < 80) {
    setAnalysisError(
      'Please paste at least a short resume or project description before analyzing.'
    );
    return;
  }

  setAnalysisError('');
  setIsAnalyzing(true);
  setAnalysisComplete(false);

  try {
    const result = await analyzeResumeText(resumeText);

    setAiAnalysis(result);
    saveResumeToStorage(result);
    setAnalysisComplete(true);
  } catch (error) {
  console.error('Gemini analysis fallback:', error);

  const fallbackAnalysis: ResumeAnalysis = {
    score: 78,
    skills: [
      'Search Engine Optimization (SEO)',
      'Google Ads',
      'Meta Ads',
      'Google Analytics',
      'SEMrush',
      'Content Strategy',
      'Campaign Optimization',
      'ROI Tracking',
      'Copywriting',
      'Data Analysis',
    ],
    projects: 3,
    experience:
      'Over 5 years of experience in digital marketing, SEO, campaign optimization, and lead generation.',
    education:
      'Bachelor of Business Administration (BBA), University of Mumbai. Specialization: Marketing.',
    missingSkills: [
      'Marketing automation',
      'Advanced A/B testing',
      'CRM analytics',
      'Data visualization',
      'Product marketing',
    ],
    readiness: 80,
    recommendedRoles: [
      'Digital Marketing Manager',
      'SEO Manager',
      'Marketing Analyst',
    ],
    strengths: [
      'Strong SEO and campaign optimization experience',
      'Clear evidence of measurable marketing impact',
      'Experience with analytics and conversion improvement',
      'Leadership experience with content creators',
    ],
    weaknesses: [
      'Add more campaign budget and revenue metrics',
      'Include industry certifications',
      'Mention automation or CRM workflow experience',
    ],
    summary:
      'Your resume shows strong practical marketing experience with measurable impact in SEO, campaign optimization, lead generation, and analytics.',
    interviewTopics: [
      'SEO strategy and website audits',
      'Campaign performance optimization',
      'Google Analytics and ROI tracking',
      'Lead generation strategy',
      'Content marketing and conversion improvement',
      'Team collaboration and leadership',
    ],
  };

  setAiAnalysis(fallbackAnalysis);
  saveResumeToStorage(fallbackAnalysis);
  setAnalysisComplete(true);

  setAnalysisError(
    'Gemini free-tier quota is temporarily exhausted. Demo analysis is being shown so you can continue the interview flow.'
  );
  } finally {
    setIsAnalyzing(false);
  }
};
const handleGeneratePersonalizedInterview = async () => {
  if (!aiAnalysis) {
    setAnalysisError(
      'Please run Live AI Resume Analysis before generating personalized questions.'
    );
    return;
  }

  setAnalysisError('');
  setIsAnalyzing(true);

  try {
    const questions = await generatePersonalizedInterviewQuestions(
      aiAnalysis,
      'Software Engineer',
      'Medium',
      'Mixed',
      10
    );
    sessionStorage.removeItem('interviewiq_responses');
    sessionStorage.setItem(
      'interviewiq_questions',
      JSON.stringify(questions)
    );

    sessionStorage.setItem(
      'interviewiq_resume_analysis',
      JSON.stringify(aiAnalysis)
    );

    navigate('/interview');
  } catch (error) {
  const fallbackQuestions = [
    {
      id: 1,
      question:
        'Can you walk me through your most significant project or professional achievement and explain the impact it created?',
      focus: 'Project experience and communication',
    },
    {
      id: 2,
      question:
        'Describe a challenging problem you faced in your work or studies. How did you approach solving it?',
      focus: 'Problem solving',
    },
    {
      id: 3,
      question:
        'Which skill from your resume are you most confident about, and how have you used it in a practical situation?',
      focus: 'Technical or domain knowledge',
    },
    {
      id: 4,
      question:
        'How do you measure whether your work has been successful?',
      focus: 'Analytical thinking and results orientation',
    },
    {
      id: 5,
      question:
        'Tell me about a time you had to learn something new quickly to complete a task.',
      focus: 'Adaptability and learning',
    },
    {
      id: 6,
      question:
        'How would you explain one of your key skills to a non-technical stakeholder or manager?',
      focus: 'Communication',
    },
    {
      id: 7,
      question:
        'Describe a time you worked with others to achieve a goal. What was your contribution?',
      focus: 'Collaboration',
    },
    {
      id: 8,
      question:
        'What would you improve if you could revisit one of your projects or campaigns?',
      focus: 'Reflection and continuous improvement',
    },
    {
      id: 9,
      question:
        'What are your career goals for the next two to three years?',
      focus: 'Career motivation',
    },
    {
      id: 10,
      question:
        'Why do you believe you would be a strong fit for this role?',
      focus: 'Role fit and confidence',
    },
  ];

  sessionStorage.setItem(
    'interviewiq_questions',
    JSON.stringify(fallbackQuestions)
  );

  sessionStorage.setItem(
    'interviewiq_resume_analysis',
    JSON.stringify(aiAnalysis)
  );

  setAnalysisError(
    'Gemini question generation is temporarily unavailable. Starting the interview with intelligent demo questions.'
  );

  navigate('/interview');
} finally {
    setIsAnalyzing(false);
  }
};
  const handleFileUpload = (file: File) => {
  setUploadedFile(file);
  setAnalysisComplete(false);
  setAiAnalysis(null);

  setAnalysisError(
    'For the live AI demo, paste the resume text below and select Analyze with AI.'
  );
};

const handleSkipResumeAnalysis = () => {
  try {
    const setupConfig = JSON.parse(sessionStorage.getItem('interviewiq_setup_config') || '{}');
    
    // Generate unique interview ID
    let interviewId: string;
    try {
      interviewId = crypto.randomUUID();
    } catch {
      interviewId = `interview-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    
    // Generate role-specific questions first
    const questions = setupConfig.role
      ? generateRoleSpecificQuestions(
          setupConfig.role,
          setupConfig.interviewType || 'mixed',
          setupConfig.questionCount || 10
        )
      : [];
    
    // Create and save new interview record to localStorage history
    const newInterview = {
      id: interviewId,
      startedAt: new Date().toISOString(),
      completedAt: null,
      role: setupConfig.role || 'Software Engineer',
      difficulty: setupConfig.difficulty || 'Medium',
      interviewType: setupConfig.interviewType || 'Mixed',
      questions: questions,
      responses: [],
      overallScore: null,
      communicationScore: null,
      technicalScore: null,
      confidenceScore: null,
      problemSolvingScore: null,
    };
    
    // Save active interview ID to sessionStorage
    sessionStorage.setItem('interviewiq_active_interview_id', interviewId);
    
    // Get existing history or start new
    let history = [];
    try {
      const existingHistory = localStorage.getItem('interviewiq_interview_history');
      history = existingHistory ? JSON.parse(existingHistory) : [];
    } catch {
      history = [];
    }
    
    // Add new interview to history
    history.push(newInterview);
    localStorage.setItem('interviewiq_interview_history', JSON.stringify(history));
    
    // Save questions to sessionStorage for the current interview
    sessionStorage.setItem('interviewiq_questions', JSON.stringify(questions));
    
    // Clear active interview responses for the new session
    sessionStorage.removeItem('interviewiq_responses');
    
    navigate('/interview');
  } catch (error) {
    console.error('Error skipping resume analysis:', error);
    navigate('/interview');
  }
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-3">Resume Analysis</h1>
          <p className="text-dark-400 max-w-2xl mx-auto">
            Upload your resume to receive AI-powered analysis and generate personalized interview questions.
          </p>
        </div>

        {/* Input Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Resume Card */}
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

            {/* Live AI Resume Analysis Card */}
            <div className="glass-card rounded-2xl p-6 flex flex-col">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/15 text-accent-400">
                  <Sparkles className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">Live AI Resume Analysis</h3>
                  <p className="text-sm text-dark-400">
                    Paste resume text to receive real Gemini-powered feedback.
                  </p>
                </div>
              </div>

              <textarea
                value={resumeText}
                onChange={(event) => setResumeText(event.target.value)}
                placeholder="Paste your resume text here, including skills, education, projects, internships, and achievements..."
                className="h-48 resize-none rounded-xl border border-dark-700 bg-dark-950 p-4 text-sm text-white outline-none transition-colors placeholder:text-dark-500 focus:border-accent-500"
              />

              {analysisError && (
                <p className="mt-3 text-sm text-amber-400">{analysisError}</p>
              )}

              <button
                type="button"
                onClick={handleRealAnalysis}
                disabled={isAnalyzing}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 font-medium text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 w-fit"
              >
                <Sparkles className="h-4 w-4" />
                {isAnalyzing ? 'Gemini is analyzing...' : 'Analyze with AI'}
              </button>
            </div>
          </div>
        </section>

        {/* Analysis Results Section */}
        {analysisComplete && (
          <section>
            {/* Section Title */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-2">AI Resume Insights</h2>
              <p className="text-dark-400">Personalized feedback generated from your resume.</p>
            </div>

            {/* Summary Card */}
            <div className="glass-card rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Resume Score */}
                <div className="flex flex-col items-center md:items-start">
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
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - displayedAnalysis.score / 100)}`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{displayedAnalysis.score}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-dark-400">Overall score based on</p>
                      <p className="text-sm text-dark-400">skills, experience & formatting</p>
                      <p className="mt-2 text-emerald-400 font-medium">Good Resume!</p>
                    </div>
                  </div>
                </div>

                {/* AI Interview Readiness */}
                <div className="bg-gradient-to-r from-accent-500/10 to-emerald-500/10 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-accent-500" />
                      <span className="text-sm font-semibold text-dark-300">AI Interview Readiness</span>
                    </div>
                    <p className="text-3xl font-bold mb-4">{displayedAnalysis.readiness}%</p>
                  </div>
                  <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent-500 to-emerald-400 rounded-full"
                      style={{ width: `${displayedAnalysis.readiness}%` }}
                    />
                  </div>
                </div>

                {/* AI Summary */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-accent-500" />
                    AI Summary
                  </h4>
                  <p className="text-sm text-dark-300 leading-relaxed">
                    Your resume demonstrates strong technical skills and relevant experience. Focus on adding quantifiable metrics and industry-specific certifications to improve competitiveness.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Skills Detected */}
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Code className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-semibold text-dark-300">Skills Detected</span>
                </div>
                <p className="text-3xl font-bold mb-3">{displayedAnalysis.skills.length}</p>
                <div className="flex flex-wrap gap-1">
                  {displayedAnalysis.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs bg-dark-800 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                  {displayedAnalysis.skills.length > 3 && (
                    <span className="text-xs bg-dark-800 px-2 py-1 rounded">
                      +{displayedAnalysis.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Projects Found */}
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-semibold text-dark-300">Projects Found</span>
                </div>
                <p className="text-3xl font-bold">{displayedAnalysis.projects}</p>
              </div>

              {/* Experience Level */}
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-semibold text-dark-300">Experience Level</span>
                </div>
                <p className="text-sm font-semibold max-h-20 overflow-y-auto">{displayedAnalysis.experience}</p>
              </div>

              {/* Education */}
              <div className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-accent-500" />
                  <span className="text-sm font-semibold text-dark-300">Education</span>
                </div>
                <p className="text-sm font-semibold max-h-20 overflow-y-auto">{displayedAnalysis.education}</p>
              </div>
            </div>

            {/* Missing Skills & Recommended Roles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Missing Skills */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold text-dark-300">Missing Skills</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {displayedAnalysis.missingSkills.map((skill) => (
                    <span key={skill} className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recommended Roles */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-dark-300">Recommended Roles</span>
                </div>
                <div className="space-y-2">
                  {displayedAnalysis.recommendedRoles.map((role) => (
                    <div key={role} className="flex items-center gap-2 text-sm text-dark-300">
                      <ChevronRight className="w-4 h-4 text-accent-500" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strengths & Areas to Improve */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Strengths */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-semibold text-dark-300">Strengths</span>
                </div>
                <ul className="space-y-2">
                  <li className="text-sm text-dark-300">Strong technical foundation with diverse skill set</li>
                  <li className="text-sm text-dark-300">Clear career progression and project experience</li>
                  <li className="text-sm text-dark-300">Well-organized resume format</li>
                </ul>
              </div>

              {/* Areas to Improve */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-semibold text-dark-300">Areas to Improve</span>
                </div>
                <ul className="space-y-2">
                  <li className="text-sm text-dark-300">Add quantified metrics to achievements</li>
                  <li className="text-sm text-dark-300">Include industry-relevant certifications</li>
                  <li className="text-sm text-dark-300">Expand on technologies and frameworks used</li>
                </ul>
              </div>
            </div>

            {/* Suggested Skills & Interview Difficulty */}
            <div className="glass-card rounded-xl p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Suggested Skills */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-accent-500" />
                    <span className="text-sm font-semibold text-dark-300">Suggested Skills to Learn</span>
                  </div>
                  <div className="space-y-3">
                    {suggestedSkills.map((skill) => (
                      <div key={skill.name} className="flex items-center justify-between">
                        <span className="text-sm text-dark-300">{skill.name}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
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
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-semibold text-dark-300">Expected Interview Difficulty</span>
                  </div>
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-dark-800/50 rounded-xl">
                    <span className="inline-block px-6 py-2 bg-amber-500/20 text-amber-400 rounded-full text-lg font-bold mb-2">
                      {expectedDifficulty}
                    </span>
                    <p className="text-xs text-dark-400 text-center">
                      Based on your experience level and skill readiness
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleGeneratePersonalizedInterview}
            disabled={isAnalyzing || !aiAnalysis}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-8 py-3 font-medium text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 w-full sm:w-auto justify-center"
          >
            <Zap className="h-5 w-5" />
            {isAnalyzing
              ? 'Generating Personalized Questions...'
              : 'Generate Personalized Interview'}
          </button>
          <Link
            to="/interview"
            onClick={(e) => {
              e.preventDefault();
              handleSkipResumeAnalysis();
            }}
            className="flex items-center justify-center gap-2 glass-card hover:border-white/20 px-8 py-3 rounded-xl font-medium transition-all w-full sm:w-auto cursor-pointer"
          >
            Skip Resume Analysis
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
