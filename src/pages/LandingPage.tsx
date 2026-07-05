import { Link } from 'react-router-dom';
import {
  Brain,
  Zap,
  Shield,
  ArrowRight,
  Play,
  FileSearch,
  MessageSquare,
  BarChart2,
  ThumbsUp,
  FileText,
  TrendingUp,
  Upload,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Star,
  Quote,
  Github,
  Mail,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="w-8 h-8 text-accent-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold">InterviewIQ AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-dark-300 hover:text-white transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all" />
            </a>
            <a href="#features" className="text-dark-300 hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all" />
            </a>
            <a href="#how-it-works" className="text-dark-300 hover:text-white transition-colors relative group">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all" />
            </a>
            <a href="#faq" className="text-dark-300 hover:text-white transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all" />
            </a>
            <a href="#contact" className="text-dark-300 hover:text-white transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-500 group-hover:w-full transition-all" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="hidden sm:block text-dark-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="bg-accent-500 hover:bg-accent-600 px-5 py-2.5 rounded-lg font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent-500/25"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              {/* Floating AI Shapes */}
              <div className="absolute -top-8 -left-8 w-16 h-16 animate-float opacity-60">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-accent-500/20 to-transparent border border-accent-500/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-accent-500" />
                </div>
              </div>
              <div className="absolute top-20 -right-4 w-12 h-12 animate-float-delayed opacity-40">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent-500/30 to-transparent border border-accent-500/20" />
              </div>
              <div className="absolute bottom-20 -left-4 w-10 h-10 animate-float opacity-30">
                <div className="w-full h-full rounded-lg bg-accent-500/20 border border-accent-500/10 rotate-12" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 animate-fade-in">
                <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
                <span className="text-sm text-dark-300">AI-Powered Interview Preparation</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in-up">
                Land Your Dream Job
                <br />
                <span className="text-gradient">with AI Coaching</span>
              </h1>

              <p className="text-lg sm:text-xl text-dark-400 max-w-xl mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                Practice with our intelligent AI interviewer, receive real-time feedback,
                and master your interview skills with personalized coaching.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <Link
                  to="/login"
                  className="group flex items-center gap-2 bg-accent-500 hover:bg-accent-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-accent-hover"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <button className="group flex items-center gap-2 glass-card hover:border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105">
                  <Play className="w-5 h-5 text-accent-500" />
                  Try Demo
                </button>
              </div>
            </div>

            {/* Right - Dashboard Mockup */}
            <div className="relative lg:pl-8">
              <div className="relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-accent-500/20 blur-3xl rounded-3xl transform scale-90" />

                {/* Dashboard Mockup */}
                <div className="relative glass-card rounded-2xl overflow-hidden border border-dark-700 shadow-2xl">
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-700 bg-dark-900/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 text-center text-xs text-dark-500">InterviewIQ Dashboard</div>
                  </div>

                  {/* Content */}
                  <div className="p-6 bg-dark-900/30">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-sm text-dark-400">Welcome back</div>
                        <div className="text-xl font-semibold">Practice Session</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent-500 animate-pulse" />
                        <span className="text-sm text-accent-500">AI Active</span>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
                        <div className="text-2xl font-bold text-accent-500">95%</div>
                        <div className="text-xs text-dark-400">Score</div>
                      </div>
                      <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-xs text-dark-400">Sessions</div>
                      </div>
                      <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700">
                        <div className="text-2xl font-bold">85+</div>
                        <div className="text-xs text-dark-400">Questions</div>
                      </div>
                    </div>

                    {/* Question Card */}
                    <div className="bg-dark-800/50 rounded-xl p-4 border border-dark-700 mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="w-4 h-4 text-accent-500" />
                        </div>
                        <div>
                          <div className="text-sm text-dark-400 mb-1">Current Question</div>
                          <div className="text-sm">Tell me about a time you led a team through a challenging project...</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-dark-400 mb-2">
                        <span>Interview Progress</span>
                        <span>75%</span>
                      </div>
                      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-accent-500 to-emerald-400 rounded-full" />
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-accent-500 hover:bg-accent-600 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                      <Zap className="w-4 h-4" />
                      Continue Interview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="section-stats" className="py-20 border-y border-dark-800/50">
        <div className={`max-w-7xl mx-auto px-6 ${visibleElements.has('section-stats') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Mock Interviews', icon: MessageSquare },
              { value: '95%', label: 'Success Rate', icon: TrendingUp },
              { value: '50+', label: 'Job Roles', icon: Briefcase, iconFn: true },
              { value: '24/7', label: 'AI Coach', icon: Brain },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-accent-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div id="section-features" className={`text-center mb-16 ${visibleElements.has('section-features') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-sm text-dark-300">AI Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-gradient"> Succeed</span>
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to prepare you for any interview
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileSearch,
                title: 'Resume Analysis',
                desc: 'AI scans your resume and creates tailored interview questions based on your experience',
              },
              {
                icon: MessageSquare,
                title: 'Adaptive Interviews',
                desc: 'Dynamic questions that adapt to your responses for realistic interview practice',
              },
              {
                icon: BarChart2,
                title: 'AI Feedback',
                desc: 'Instant, detailed feedback on your answers with actionable improvements',
              },
              {
                icon: ThumbsUp,
                title: 'Hiring Recommendation',
                desc: 'AI predicts your interview success likelihood and suggests focus areas',
              },
              {
                icon: FileText,
                title: 'PDF Reports',
                desc: 'Download comprehensive reports tracking your progress over time',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                desc: 'Monitor your improvement with detailed analytics and insights',
              },
            ].map((feature, i) => (
              <div
                key={i}
                id={`section-feature-${i}`}
                className={`glass-card rounded-2xl p-6 hover-lift group cursor-pointer ${
                  visibleElements.has(`section-feature-${i}`) ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-accent-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-500/20 transition-colors group-hover:scale-110 transform duration-300">
                  <feature.icon className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-dark-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div id="section-timeline" className={`text-center mb-16 ${visibleElements.has('section-timeline') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How It
              <span className="text-gradient"> Works</span>
            </h2>
            <p className="text-dark-400">Get interview-ready in four simple steps</p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-500/50 via-accent-500/30 to-transparent" />

            <div className="space-y-12 lg:space-y-0">
              {[
                {
                  icon: Upload,
                  title: 'Upload Resume',
                  desc: 'Upload your resume and let our AI understand your background',
                },
                {
                  icon: Sparkles,
                  title: 'AI Generates Questions',
                  desc: 'Receive tailored questions specific to your target role and experience',
                },
                {
                  icon: MessageSquare,
                  title: 'Complete Interview',
                  desc: 'Practice with our AI interviewer in a realistic simulation',
                },
                {
                  icon: FileText,
                  title: 'Receive Detailed Report',
                  desc: 'Get comprehensive feedback and actionable improvement tips',
                },
              ].map((step, i) => (
                <div
                  key={i}
                  id={`section-step-${i}`}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center ${
                    i % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-dark-900 border-2 border-accent-500 rounded-full items-center justify-center z-10">
                    <span className="font-bold text-accent-500">{i + 1}</span>
                  </div>

                  {/* Content */}
                  <div
                    className={`${i % 2 === 1 ? 'lg:order-2 lg:text-left' : ''} ${
                      visibleElements.has(`section-step-${i}`) ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <div className={`glass-card rounded-2xl p-8 ${i % 2 === 1 ? 'lg:ml-16' : 'lg:mr-16'} hover-lift`}>
                      <div className="w-14 h-14 bg-accent-500/10 rounded-xl flex items-center justify-center mb-6">
                        <step.icon className="w-7 h-7 text-accent-500" />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-medium text-accent-500">Step {i + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-dark-400">{step.desc}</p>
                    </div>
                  </div>

                  {/* Mobile number */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-accent-500/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-accent-500">{i + 1}</span>
                    </div>
                    <div className="flex-1 h-px bg-dark-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="section-testimonials" className="py-24">
        <div className={`max-w-7xl mx-auto px-6 ${visibleElements.has('section-testimonials') ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by
              <span className="text-gradient"> Professionals</span>
            </h2>
            <p className="text-dark-400">See what our users have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Software Engineer at Google',
                content: 'InterviewIQ helped me prepare for my dream job. The AI feedback was incredibly detailed and helped me improve my weak areas.',
                rating: 5,
              },
              {
                name: 'Michael Roberts',
                role: 'Product Manager at Stripe',
                content: 'The adaptive interview feature is genius. It felt like a real interview and the practice gave me so much confidence.',
                rating: 5,
              },
              {
                name: 'Emily Thompson',
                role: 'UX Designer at Airbnb',
                content: 'I landed my role after practicing with InterviewIQ for just 2 weeks. The detailed reports showed me exactly what to improve.',
                rating: 5,
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                id={`section-testimonial-${i}`}
                className={`glass-card rounded-2xl p-6 hover-lift ${
                  visibleElements.has(`section-testimonial-${i}`) ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-accent-500/30 mb-2" />
                <p className="text-dark-300 mb-6">{testimonial.content}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <span className="text-sm font-medium text-accent-500">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-dark-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-dark-900/50">
        <div className="max-w-3xl mx-auto px-6">
          <div id="section-faq" className={`text-center mb-16 ${visibleElements.has('section-faq') ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked
              <span className="text-gradient"> Questions</span>
            </h2>
            <p className="text-dark-400">Everything you need to know about InterviewIQ AI</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does the AI interview work?',
                a: 'Our AI uses advanced natural language processing to simulate realistic interview scenarios. It adapts questions based on your responses, provides real-time feedback, and helps you improve with each session.',
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use enterprise-grade encryption for all your data. Your practice sessions, resumes, and personal information are never shared with third parties.',
              },
              {
                q: 'Can I practice for specific job roles?',
                a: 'Yes! We support 50+ job roles across technology, finance, healthcare, marketing, and more. Simply select your target role and get role-specific questions.',
              },
              {
                q: 'Is InterviewIQ AI free to use?',
                a: 'Yes. This prototype is completely free to use for interview practice and demonstrations. Practice as much as you like!',
              },
              {
                q: 'How accurate is the AI feedback?',
                a: 'Our AI feedback is based on analysis of thousands of successful interviews and HR best practices. Users report a 95% improvement in their interview performance.',
              },
            ].map((item, i) => (
              <div
                key={i}
                id={`section-faq-item-${i}`}
                className={`glass-card rounded-xl overflow-hidden ${
                  visibleElements.has(`section-faq-item-${i}`) ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-dark-400 transition-transform flex-shrink-0 ${
                      activeFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeFaq === i ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-dark-400">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="section-cta" className={`py-24 ${visibleElements.has('section-cta') ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative glass-card rounded-3xl p-12 text-center overflow-hidden">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/10 via-transparent to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Start Your Interview Journey
              </h2>
              <p className="text-dark-400 mb-8 max-w-xl mx-auto">
                Join 10,000+ professionals who've landed their dream jobs with InterviewIQ AI
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 glow-accent-hover"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 glass-card hover:border-white/20 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105"
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <Brain className="w-8 h-8 text-accent-500" />
                <span className="text-xl font-semibold">InterviewIQ AI</span>
              </Link>
              <p className="text-dark-400 max-w-sm mb-6">
                AI-powered interview preparation platform helping professionals land their dream jobs.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="w-5 h-5 text-dark-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-lg flex items-center justify-center transition-colors">
                  <Linkedin className="w-5 h-5 text-dark-400" />
                </a>
                <a href="#" className="w-10 h-10 bg-dark-800 hover:bg-dark-700 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="w-5 h-5 text-dark-400" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-dark-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">
              © 2024 InterviewIQ AI. All rights reserved.
            </p>
            <a
              href="mailto:hello@interviewiq.ai"
              className="flex items-center gap-2 text-dark-400 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              hello@interviewiq.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Briefcase icon component
function Briefcase({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
