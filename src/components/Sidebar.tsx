import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Brain,
  LayoutDashboard,
  Mic,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface SidebarProps {
  currentPage?: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Could not sign out:', error.message);
    return;
  }

  navigate('/login');
};

  const isActive = (path: string) => {
    if (currentPage) return currentPage === path;
    return location.pathname === path;
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/interview/setup', icon: Mic, label: 'Practice' },
    { path: '/my-resumes', icon: FileText, label: 'My Resumes' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col fixed h-full">
      <div className="p-6 border-b border-dark-800">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-accent-500" />
          <span className="text-xl font-semibold">InterviewIQ</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path) || (item.path === '/interview/setup' && location.pathname.startsWith('/interview'))
                    ? 'bg-dark-800 text-white'
                    : 'text-dark-400 hover:text-white hover:bg-dark-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-dark-800">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 w-full text-dark-400 hover:text-white hover:bg-dark-800 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
