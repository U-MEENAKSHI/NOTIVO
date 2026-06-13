import React, { useState, useMemo } from 'react';
import { 
  ClipboardList, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  ArrowRight,
  Clock,
  Bell,
  SlidersHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mocked static data
  const initialReviews = [
    { id: '#INV-8821', title: 'Annual Strategy Forum 2024', dept: 'Operations', date: 'Oct 12, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8794', title: 'Q4 Shareholder Briefing', dept: 'Finance', date: 'Oct 10, 2023', status: 'Under Review', statusColor: 'blue' },
    { id: '#INV-8752', title: 'New Policy Orientation', dept: 'Legal', date: 'Oct 08, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8710', title: 'Marketing Campaign Launch', dept: 'Marketing', date: 'Oct 05, 2023', status: 'Needs Revision', statusColor: 'red' },
    { id: '#INV-8692', title: 'Supply Chain Audit 2023', dept: 'Operations', date: 'Oct 01, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8691', title: 'Q3 Financial Review', dept: 'Finance', date: 'Sep 28, 2023', status: 'Approved', statusColor: 'green' },
  ];

  const [allReviews] = useState(initialReviews);

  // Derived stat counts
  const pendingCount = allReviews.filter(r => r.status === 'Pending Review').length;
  const activeCount  = allReviews.filter(r => r.status === 'Under Review').length;
  const alertCount   = allReviews.filter(r => r.status === 'Needs Revision').length;
  const approvedCount = allReviews.filter(r => r.status === 'Approved').length;
  const approvalRate = allReviews.length > 0
    ? Math.round((approvedCount / allReviews.length) * 100)
    : 0;

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive dropdown options
  const statuses = ['All Statuses', ...new Set(allReviews.map(r => r.status))];

  // Filtering Logic
  const filteredReviews = useMemo(() => {
    return allReviews.filter(review => {
      const matchSearch = searchQuery === '' || 
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        review.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === 'All Statuses' || review.status === selectedStatus;
      return matchSearch && matchStatus;
    });
  }, [searchQuery, selectedStatus, allReviews]);

  // Derived Pagination
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredReviews.length);
  const currentReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (statusColor, text) => {
    switch(statusColor) {
      case 'yellow': return <span className="bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-1.5"></span>{text}</span>;
      case 'blue': return <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>{text}</span>;
      case 'green': return <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>{text}</span>;
      case 'red': return <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center w-max"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>{text}</span>;
      default: return null;
    }
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">Department Oversight</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium">Manage department reviews, templates, and administrative alerts.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">Live Monitoring</span>
        </div>
      </div>

      {/* Top Row: Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Pending Reviews', count: pendingCount, icon: <ClipboardList size={24} />, color: 'orange', trend: '+3 today' },
          { label: 'Active Templates', count: activeCount, icon: <FileText size={24} />, color: 'blue', trend: '85% usage' },
          { label: 'Admin Alerts', count: alertCount, icon: <AlertCircle size={24} />, color: 'red', trend: 'High Priority' },
          { label: 'Approval Rate', count: `${approvalRate}%`, icon: <CheckCircle2 size={24} />, color: 'green', trend: '+2% trend', sub: `${approvedCount} approved` }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-2xl`}>
                {stat.icon}
              </div>
              <span className={`text-[10px] font-black text-${stat.color}-600 dark:text-${stat.color}-400 bg-${stat.color}-50 dark:bg-${stat.color}-900/30 px-2.5 py-1 rounded-lg uppercase tracking-wider`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{stat.label}</h3>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-black text-gray-900 dark:text-white transition-colors">{stat.count}</p>
              {stat.sub && <span className="text-[10px] font-bold text-gray-400 mb-1">{stat.sub}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Main Section: Full-Width Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col min-h-[500px] transition-colors">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#fcfdfd] dark:bg-slate-900/50">
          <h2 className="text-sm font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase tracking-widest">
            <ClipboardList size={18} className="text-brand-600 dark:text-brand-400" />
            Invitation Overview
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3 flex-1 max-w-2xl justify-end">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search by title or ID..." 
                className="input-base pl-12 h-11 transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-sm px-4 shadow-sm shrink-0 transition-colors">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <select 
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
                className="appearance-none bg-transparent outline-none py-2.5 pr-6 truncate text-sm font-bold text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {statuses.map((s, i) => <option key={i} value={s} className="bg-white dark:bg-slate-900">{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#fcfdfd] dark:bg-slate-900/80 text-[10px] uppercase font-black text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <tr>
                <th className="px-6 py-5 tracking-widest">Invitation ID</th>
                <th className="px-6 py-5 tracking-widest">Title & Department</th>
                <th className="px-6 py-5 tracking-widest">Submission Date</th>
                <th className="px-6 py-5 tracking-widest text-center">Status</th>
                <th className="px-6 py-5 tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800 transition-colors">
              {currentReviews.length > 0 ? (
                currentReviews.map((inv, index) => {
                  const badgeStyles = {
                    'Approved':       'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30',
                    'Pending Review': 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30',
                    'Under Review':   'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30',
                    'Needs Revision': 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30',
                  };
                  return (
                    <tr key={index} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-5 font-bold text-gray-400 dark:text-gray-600 text-[10px] tracking-widest transition-colors">{inv.id}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-gray-100 text-sm group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{inv.title}</span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase mt-0.5">{inv.dept}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-500 dark:text-gray-400 font-semibold text-xs transition-colors">{inv.date}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center text-[9px] font-black px-3 py-1.5 rounded-lg border uppercase tracking-widest transition-colors ${badgeStyles[inv.status] || 'bg-gray-100 text-gray-600'}`}>
                            {inv.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => navigate('/dashboard/reviews')}
                          className="inline-flex items-center justify-center h-10 w-10 rounded-2xl text-gray-400 dark:text-gray-600 border border-transparent hover:border-brand-200 dark:hover:border-brand-900 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-300"
                        >
                          <ArrowRight size={20} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-20 text-center">
                    <Search size={48} className="mx-auto text-gray-200 dark:text-gray-800 mb-6" />
                    <p className="text-xs font-black text-gray-400 dark:text-gray-600 uppercase tracking-[0.2em]">No matching records found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer: Pagination */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between bg-[#fcfdfd] dark:bg-slate-900/50 mt-auto transition-colors">
          <div className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
            Displaying <span className="text-gray-900 dark:text-white transition-colors">{startIndex + 1} - {endIndex}</span> of {filteredReviews.length} records
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 border rounded-xl text-xs font-black uppercase tracking-wider transition-all ${currentPage === 1 ? 'text-gray-300 bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-800 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 active:scale-95 shadow-sm'}`}
            >
              Prev
            </button>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 border rounded-xl text-xs font-black uppercase tracking-wider transition-all ${currentPage === totalPages ? 'text-gray-300 bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-800 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 active:scale-95 shadow-sm'}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
      `}} />
    </div>
  );
};

export default Dashboard;
