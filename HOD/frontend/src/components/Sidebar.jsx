import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, ClipboardList, BarChart3, Download, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const handleLogout = () => {
    localStorage.removeItem('hod_token');
    localStorage.removeItem('user_role');
    window.location.href = '/select-role';
  };

  const hodNavItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={22} /> },
    { name: 'System Reports', path: '/dashboard/analytics', icon: <BarChart3 size={22} /> },
    { name: 'Review Panel', path: '/dashboard/reviews', icon: <ClipboardList size={22} /> },
  ];

  const navItems = hodNavItems;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <aside className={`bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-800 flex flex-col h-screen fixed left-0 top-0 pt-4 md:pt-16 z-40 transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}>
        {/* Toggle Button for Desktop */}
        <button 
          onClick={onToggleCollapse}
          className="hidden md:flex absolute -right-3 top-20 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 w-6 h-6 rounded-full items-center justify-center shadow-md hover:text-brand-600 transition-colors z-50"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div className="flex items-center justify-between px-6 mb-8 md:hidden">
          <span className="font-black text-brand-600 text-xl uppercase tracking-tighter">Notivo</span>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto py-2 md:py-6 px-3 custom-scroll`}>
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => { if (window.innerWidth < 768) onClose(); }}
                end={item.path === '/dashboard'}
                title={isCollapsed ? item.name : ""}
                className={({ isActive }) =>
                  `flex items-center rounded-xl transition-all duration-200 group ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'} ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400 shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white'
                  }`
                }
              >
                <span className={`${isCollapsed ? '' : 'mr-3'} transition-all duration-300`}>{item.icon}</span>
                {!isCollapsed && <span className="text-sm font-bold tracking-tight whitespace-nowrap">{item.name}</span>}
              </NavLink>
            ))}
          </div>
        </div>

        <div className={`p-4 border-t border-gray-100 dark:border-slate-800 transition-all duration-300 ${isCollapsed ? 'items-center' : ''}`}>
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={`flex items-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center p-3 w-full' : 'w-full px-4 py-3'}`}
          >
            <LogOut size={20} className={`${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span className="text-sm font-bold uppercase tracking-wider">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
