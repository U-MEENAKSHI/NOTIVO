import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Landmark, User, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ toggleProfile, profilePic, toggleSidebar }) => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const load = () => {
      const stored = JSON.parse(localStorage.getItem('hod_notifications') || '[]');
      setNotifCount(stored.length);
    };
    load();
    window.addEventListener('focus', load);
    return () => window.removeEventListener('focus', load);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('hod_token');
    localStorage.removeItem('user_role');
    window.location.href = '/login';
  };

  const hodLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'System Reports', path: '/dashboard/analytics' },
    { name: 'Review Panel', path: '/dashboard/reviews' },
  ];

  const navLinks = hodLinks;

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 h-16 w-full fixed top-0 z-50 transition-all duration-300">
      {/* Left side: Logo & Mobile Menu */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-xl md:hidden transition-all"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center space-x-2.5 group cursor-pointer">
          <div className="bg-brand-600 dark:bg-brand-500 p-1.5 rounded-lg text-white transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-500/20">
            <Landmark size={20} strokeWidth={2.5} />
          </div>
          <span className="font-black text-slate-900 dark:text-white text-xl uppercase tracking-tighter">Notivo</span>
        </div>
      </div>

      {/* Center: Navigation (Desktop only) */}
      <nav className="hidden md:flex space-x-2 items-center h-full">
        {navLinks.map((item) => (
          <NavLink 
            key={item.name}
            to={item.path} 
            end={item.path === '/dashboard'}
            className={({ isActive }) => 
              `px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? 'text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/40' 
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-3 md:space-x-5">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="theme-toggle scale-90 md:scale-100"
          title={isDark ? "Light Mode" : "Dark Mode"}
        >
          <div className="knob">
            <Sun size={14} className="icon-sun text-amber-500" />
            <Moon size={14} className="icon-moon text-indigo-500" />
          </div>
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/dashboard/notifications')}
          className="relative p-2.5 text-slate-400 dark:text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-800 rounded-xl transition-all outline-none"
        >
          <Bell size={20} />
          {notifCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-sm">
              {notifCount > 9 ? '9+' : notifCount}
            </span>
          )}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all outline-none"
          title="Sign Out"
        >
          <LogOut size={20} />
        </button>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

        {/* Profile */}
        <button 
          onClick={toggleProfile}
          className="group flex items-center space-x-3 focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm group-hover:shadow-md ring-1 ring-slate-200 dark:ring-slate-700 transition-all transform group-hover:scale-105 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={18} className="text-slate-400 dark:text-slate-500" />
            )}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Authenticated</p>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-none">
              HOD Access
            </p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;

