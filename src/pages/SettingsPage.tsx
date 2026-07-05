import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Bell,
  Palette,
  Info,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  Mail,
  Smartphone,
  Globe,
  Brain,
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    achievements: true,
    weeklyReport: true,
  });
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Mock profile data
  const profile = {
    name: 'Harsh Sharma',
    email: 'harsh@example.com',
    joinedDate: 'January 2024',
    interviewsCompleted: 127,
    averageScore: 78,
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white flex">
      <Sidebar currentPage="/settings" />

      <main className="flex-1 ml-64 overflow-auto">
        {/* Header */}
        <header className="bg-dark-900 border-b border-dark-800 px-8 py-6">
          <div>
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-dark-400 mt-1">Manage your account and preferences</p>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 max-w-3xl">
          {/* Profile Information */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-accent-500" />
              <h2 className="text-lg font-semibold">Profile Information</h2>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-500 to-emerald-400 flex items-center justify-center text-2xl font-bold">
                  {profile.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{profile.name}</h3>
                  <p className="text-dark-400">{profile.email}</p>
                  <p className="text-sm text-dark-500 mt-1">Member since {profile.joinedDate}</p>

                  <div className="flex gap-6 mt-4">
                    <div>
                      <p className="text-2xl font-bold">{profile.interviewsCompleted}</p>
                      <p className="text-xs text-dark-400">Interviews</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-400">{profile.averageScore}%</p>
                      <p className="text-xs text-dark-400">Avg Score</p>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </section>

          {/* Change Password */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-accent-500" />
              <h2 className="text-lg font-semibold">Change Password</h2>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Password & Security</p>
                  <p className="text-sm text-dark-400">Update your password and security settings</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 rounded-lg text-sm transition-colors">
                  <Shield className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-5 h-5 text-accent-500" />
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
            </div>
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-dark-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-dark-400">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.email ? 'bg-accent-500' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-dark-400" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-dark-400">Get notified on your device</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.push ? 'bg-accent-500' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.push ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-dark-400" />
                  <div>
                    <p className="font-medium">Achievement Alerts</p>
                    <p className="text-sm text-dark-400">Get notified about milestones</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, achievements: !notifications.achievements })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.achievements ? 'bg-accent-500' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.achievements ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-dark-400" />
                  <div>
                    <p className="font-medium">Weekly Report</p>
                    <p className="text-sm text-dark-400">Receive your progress summary</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, weeklyReport: !notifications.weeklyReport })}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    notifications.weeklyReport ? 'bg-accent-500' : 'bg-dark-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      notifications.weeklyReport ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Theme Preference */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-accent-500" />
              <h2 className="text-lg font-semibold">Theme Preference</h2>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex gap-4">
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'bg-accent-500/20 border-2 border-accent-500'
                      : 'bg-dark-800 border-2 border-transparent hover:border-dark-600'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-dark-400">Easy on your eyes</p>
                  </div>
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl transition-all ${
                    theme === 'light'
                      ? 'bg-accent-500/20 border-2 border-accent-500'
                      : 'bg-dark-800 border-2 border-transparent hover:border-dark-600'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Light Mode</p>
                    <p className="text-sm text-dark-400">Bright and clean</p>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {/* About InterviewIQ AI */}
          <section className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-accent-500" />
              <h2 className="text-lg font-semibold">About InterviewIQ AI</h2>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-accent-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">InterviewIQ AI</h3>
                  <p className="text-sm text-dark-400 mt-1">
                    InterviewIQ is an AI-powered interview preparation platform designed to help you
                    excel in your job interviews. Practice with realistic scenarios, get instant feedback,
                    and track your progress over time.
                  </p>
                  <div className="flex gap-4 mt-4 text-sm text-dark-400">
                    <span>Version 2.1.0</span>
                    <span>|</span>
                    <span>© 2024 InterviewIQ</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-6 border-t border-dark-700">
                <a href="#" className="text-sm text-accent-500 hover:text-accent-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-accent-500 hover:text-accent-400 transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-accent-500 hover:text-accent-400 transition-colors">
                  Contact Support
                </a>
              </div>
            </div>
          </section>

          {/* Sign Out */}
          <section>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between p-4 glass-card rounded-xl hover:border-rose-500/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-rose-400" />
                <div className="text-left">
                  <p className="font-medium text-rose-400">Sign Out</p>
                  <p className="text-sm text-dark-400">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-dark-400 group-hover:text-rose-400 transition-colors" />
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
