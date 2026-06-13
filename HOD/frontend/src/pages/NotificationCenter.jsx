import React, { useState, useMemo } from 'react';
import { Search, Bell, AlertCircle, Mail, BarChart2, Users, Clock, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'urgent',
    category: 'Admin',
    title: 'Final approval for Convocation 2024',
    description: 'Sign-off required for the guest list and venue arrangements.',
    time: '2 hours ago',
    tag: 'Administrative',
    isUnread: true,
    icon: <AlertCircle size={20} className="text-red-500" />
  },
  {
    id: 2,
    type: 'general',
    category: 'Invitation Alerts',
    title: 'New Faculty Invitation Accepted',
    description: 'Dr. Aris Thorne has accepted the invitation for the Physics department.',
    time: '5 hours ago',
    tag: 'System',
    isUnread: false,
    icon: <Mail size={18} className="text-blue-500" />
  },
  {
    id: 3,
    type: 'general',
    category: 'Admin',
    title: 'Monthly Analytics Report Ready',
    description: 'The performance report for May 2024 has been generated.',
    time: 'Yesterday',
    tag: 'Reports',
    isUnread: false,
    icon: <BarChart2 size={18} className="text-gray-400" />
  },
  {
    id: 4,
    type: 'general',
    category: 'Invitation Alerts',
    title: 'Pending Invitation Alert',
    description: "3 guest lecturers haven't responded to the upcoming seminar invites.",
    time: '2 days ago',
    tag: 'Invitations',
    isUnread: true,
    icon: <Users size={18} className="text-orange-500" />
  }
];

const NotificationCenter = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredNotifications = useMemo(() => {
    return MOCK_NOTIFICATIONS.filter(notif => {
      const matchesSearch = notif.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           notif.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || notif.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const urgentNotifications = filteredNotifications.filter(n => n.type === 'urgent');
  const generalNotifications = filteredNotifications.filter(n => n.type === 'general');

  const handleAction = () => {
    navigate('/dashboard/reviews');
  };

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[80vh]">
      
      {/* Top Bar */}
      <div className="px-8 py-5 flex items-center justify-between border-b border-gray-50 shrink-0 bg-gray-50/30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/reviews')}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 hover:bg-gray-50 rounded-full"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="flex items-center gap-2 text-orange-600 font-bold tracking-tight">
            <Bell size={20} strokeWidth={2.5} />
            Notification Center
          </div>
        </div>

        <div className="flex items-center gap-6 text-gray-500">
          <div className="text-right flex flex-col items-end">
            <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">Institutional Access</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Connected</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar max-w-4xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Notification Center</h1>
          <p className="text-sm text-gray-500 font-medium">Manage institutional alerts and system tasks.</p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4 mb-10">
          <div className="relative flex-1 max-w-2xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400 shadow-sm"
            />
          </div>
          
          <div className="flex gap-2">
            {['All', 'Admin', 'Invitation Alerts'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  activeCategory === cat 
                    ? 'bg-orange-500 text-white shadow-orange-500/20' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Urgent Alerts Section */}
        {urgentNotifications.length > 0 && (
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-[10px] font-black text-red-600 tracking-widest uppercase mb-4 flex items-center gap-2">
              <span className="text-red-600 text-lg leading-none mt-[-2px]">!</span>
              Urgent Action Required
            </h3>
            
            <div className="space-y-4">
              {urgentNotifications.map(notif => (
                <div key={notif.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                  
                  <div className="flex items-center gap-5 pl-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center shrink-0 border border-red-100 group-hover:scale-110 transition-transform">
                      {notif.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        {notif.title}
                        {notif.isUnread && <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{notif.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-semibold text-gray-400">{notif.time}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] font-semibold text-gray-400">{notif.tag}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAction}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-red-600/20 active:scale-95"
                  >
                    Recheck
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* General Updates Section */}
        {generalNotifications.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-[10px] font-black text-gray-500 tracking-widest uppercase mb-4 flex items-center gap-2">
              <Clock size={12} strokeWidth={3} className="text-gray-400" />
              General Updates
            </h3>
            
            <div className="space-y-3">
              {generalNotifications.map(notif => (
                <div 
                  key={notif.id} 
                  className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
                      notif.title.includes('Pending') ? 'bg-orange-50' : 'bg-[#f4f7f9]'
                    }`}>
                      {notif.icon}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                        {notif.title}
                        {notif.isUnread && <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">{notif.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-semibold text-gray-400">{notif.time}</span>
                        <span className="text-[10px] text-gray-300">•</span>
                        <span className="text-[10px] font-semibold text-gray-400">{notif.tag}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleAction}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all border border-transparent ${
                    notif.title.includes('Pending') 
                      ? 'bg-orange-50 hover:bg-orange-100 text-orange-600 hover:border-orange-200' 
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:border-gray-200'
                  }`}>
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-in fade-in duration-500">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No notifications found matching your criteria.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-xs text-orange-500 font-bold mt-2 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
      `}} />
    </div>
  );
};

export default NotificationCenter;
