import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Filter, ChevronDown, Check, 
  Pause, X, Download, Share2, CheckCircle2, 
  Clock, FileText, LayoutDashboard, FileUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExportModule = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const filters = {
    type: ['All Types', 'Circulars', 'Invitations'],
    date: ['All Time', 'Today', 'This Week', 'This Month', 'Custom'],
    status: ['All Statuses', 'Approved', 'Pending', 'Sent', 'Draft']
  };

  const [selectedFilters, setSelectedFilters] = useState({
    type: 'Type',
    date: 'Date Range',
    status: 'Status'
  });

  const documents = [
    { id: '#INV-8821', type: 'INVITATION', title: 'Annual Strategy Forum 2024', dept: 'Operations', date: 'Oct 12, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8794', type: 'INVITATION', title: 'Q4 Shareholder Briefing', dept: 'Finance', date: 'Oct 10, 2023', status: 'Under Review', statusColor: 'blue' },
    { id: '#INV-8752', type: 'INVITATION', title: 'New Policy Orientation', dept: 'Legal', date: 'Oct 08, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8710', type: 'INVITATION', title: 'Marketing Campaign Launch', dept: 'Marketing', date: 'Oct 05, 2023', status: 'Needs Revision', statusColor: 'red' },
    { id: '#INV-8692', type: 'INVITATION', title: 'Supply Chain Audit 2023', dept: 'Operations', date: 'Oct 01, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8691', type: 'INVITATION', title: 'Q3 Financial Review', dept: 'Finance', date: 'Sep 28, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8688', type: 'INVITATION', title: 'Campus Security Update', dept: 'Administration', date: 'Sep 25, 2023', status: 'Under Review', statusColor: 'blue' },
    { id: '#INV-8685', type: 'INVITATION', title: 'IT Infrastructure Upgrade', dept: 'IT Services', date: 'Sep 22, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8680', type: 'INVITATION', title: 'Staff Training Seminar', dept: 'HR', date: 'Sep 20, 2023', status: 'Needs Revision', statusColor: 'red' },
    { id: '#INV-8675', type: 'INVITATION', title: 'Library Resource Expansion', dept: 'Library', date: 'Sep 18, 2023', status: 'Approved', statusColor: 'green' },
    { id: '#INV-8672', type: 'INVITATION', title: 'Laboratory Equipment Procurement', dept: 'Science R&D', date: 'Sep 15, 2023', status: 'Pending Review', statusColor: 'yellow' },
    { id: '#INV-8668', type: 'INVITATION', title: 'Student Welfare Program', dept: 'Student Affairs', date: 'Sep 12, 2023', status: 'Under Review', statusColor: 'blue' }
  ];

  const filteredDocuments = React.useMemo(() => {
    return documents.filter(doc => {
      // Search query
      const matchSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.id && doc.id.toString().toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Type filter
      const matchType = selectedFilters.type === 'Type' || selectedFilters.type === 'All Types' || 
                        (selectedFilters.type === 'Circulars' && doc.type === 'CIRCULAR') ||
                        (selectedFilters.type === 'Invitations' && doc.type === 'INVITATION');

      // Status filter
      const matchStatus = selectedFilters.status === 'Status' || selectedFilters.status === 'All Statuses' ||
                          doc.status.toLowerCase() === selectedFilters.status.toLowerCase() ||
                          (selectedFilters.status === 'Pending' && doc.status === 'Pending Review');

      // Date filter (basic mock for now)
      const matchDate = selectedFilters.date === 'Date Range' || selectedFilters.date === 'All Time' || true;

      return matchSearch && matchType && matchStatus && matchDate;
    });
  }, [searchQuery, selectedFilters, documents]);

  const handleExportStart = () => {
    if (selectedItems.length === 0) return;
    setStep(2);
    setProgress(0);
    setIsPaused(false);
  };

  useEffect(() => {
    if (step === 2 && !isPaused) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setStep(3);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [step, isPaused]);

  // Step 1: Selection
  const renderStep1 = () => (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in flex flex-col h-full">
      <div className="p-6 border-b border-gray-50 bg-[#fcfdfd] relative z-20">
         <div className="relative mb-4">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
            </div>
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Circulars or Invitations" 
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none font-medium shadow-sm"
            />
         </div>
         <div className="flex items-center gap-3 flex-wrap">
             <div className="relative">
                 <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                 >
                    {selectedFilters.type} <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'type' && (
                     <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                         {filters.type.map(opt => (
                             <button 
                                key={opt}
                                onClick={() => { setSelectedFilters({...selectedFilters, type: opt}); setActiveDropdown(null); }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                             >
                                 {opt}
                             </button>
                         ))}
                     </div>
                 )}
             </div>

             <div className="relative">
                 <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'date' ? null : 'date')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                 >
                    {selectedFilters.date} <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'date' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'date' && (
                     <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                         {filters.date.map(opt => (
                             <button 
                                key={opt}
                                onClick={() => { setSelectedFilters({...selectedFilters, date: opt}); setActiveDropdown(null); }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                             >
                                 {opt}
                             </button>
                         ))}
                     </div>
                 )}
             </div>

             <div className="relative">
                 <button 
                    onClick={() => setActiveDropdown(activeDropdown === 'status' ? null : 'status')}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                 >
                    {selectedFilters.status} <ChevronDown size={14} className={`transition-transform ${activeDropdown === 'status' ? 'rotate-180' : ''}`} />
                 </button>
                 {activeDropdown === 'status' && (
                     <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                         {filters.status.map(opt => (
                             <button 
                                key={opt}
                                onClick={() => { setSelectedFilters({...selectedFilters, status: opt}); setActiveDropdown(null); }}
                                className="w-full text-left px-4 py-2 text-xs font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                             >
                                 {opt}
                             </button>
                         ))}
                     </div>
                 )}
             </div>
         </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto max-h-[700px]">
          <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                      type="checkbox" 
                      checked={filteredDocuments.length > 0 && selectedItems.length === filteredDocuments.length}
                      onChange={(e) => {
                          if (e.target.checked) {
                              setSelectedItems(filteredDocuments.map(d => d.title));
                          } else {
                              setSelectedItems([]);
                          }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-xs font-bold text-gray-500">Select All</span>
              </label>
              <span className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase">Total: {filteredDocuments.length} Files</span>
          </div>

          <div className="space-y-4">
              {['CIRCULARS', 'INVITATIONS'].map((group) => {
                  const groupDocs = filteredDocuments.filter(d => group.startsWith(d.type));
                  if (groupDocs.length === 0) return null;
                  return (
                  <div key={group} className="space-y-4">
                      <h4 className="text-[10px] font-extrabold text-gray-400 tracking-widest uppercase mb-2">{group}</h4>
                      {groupDocs.map((doc) => (
                          <div key={doc.id} className="flex items-start gap-4 p-4 border border-gray-50 rounded-2xl hover:bg-blue-50/30 transition-all group">
                              <input 
                                type="checkbox" 
                                checked={selectedItems.includes(doc.title)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedItems([...selectedItems, doc.title]);
                                    } else {
                                        setSelectedItems(selectedItems.filter(t => t !== doc.title));
                                    }
                                }} 
                                className="mt-1 w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500 cursor-pointer" 
                              />
                              <div className="flex-1">
                                  <h5 className="text-sm font-bold text-gray-800">{doc.title}</h5>
                                  <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400 font-medium">
                                      <span>{doc.type.charAt(0) + doc.type.slice(1).toLowerCase()}</span>
                                      <span>•</span>
                                      <span>{doc.date}</span>
                                  </div>
                                  <div className="mt-2 flex items-center justify-between">
                                      <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                          doc.statusColor === 'green' ? 'bg-green-50 text-green-600' : 
                                          doc.statusColor === 'yellow' ? 'bg-yellow-50 text-yellow-600' :
                                          doc.statusColor === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
                                      }`}>
                                          {doc.status}
                                      </span>
                                      <FileText size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              )})}
          </div>
      </div>

      <div className="p-6 border-t border-gray-50 bg-white">
          <div className="bg-[#1a1f36] rounded-2xl p-4 flex items-center justify-between">
              <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Selected Files</p>
                  <h3 className="text-white font-bold text-lg">{selectedItems.length} Items</h3>
              </div>
              <button 
                onClick={handleExportStart}
                disabled={selectedItems.length === 0}
                className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${selectedItems.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-[#f97316] hover:bg-[#ea580c] text-white shadow-orange-900/20'}`}
              >
                  <FileUp size={18} />
                  <span>Export</span>
              </button>
          </div>
      </div>
    </div>
  );

  // Step 2: Exporting
  const renderStep2 = () => {
    const currentFileIndex = Math.min(Math.floor((progress / 100) * selectedItems.length), selectedItems.length - 1);
    const currentFileName = selectedItems.length > 0 ? selectedItems[currentFileIndex] + ".pdf" : "Processing...";
    const filesCompleted = Math.floor((progress / 100) * selectedItems.length);
    const timeLeftSeconds = Math.max(1, Math.ceil(((100 - progress) / 5) * 0.1));

    return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden animate-scale-in flex flex-col items-center justify-center p-12 min-h-[500px] relative">
        <div className="absolute inset-0 bg-gray-900/5 backdrop-blur-[2px]"></div>
        
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-gray-100 w-full max-w-md relative z-10 animate-fade-in">
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                    <FileUp size={32} />
                </div>
                <h2 className="text-xl font-extrabold text-[#1a1f36] uppercase tracking-wider mb-8">Exporting Files</h2>
                
                <div className="w-full text-left mb-2">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-400 font-medium">Processing...</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-gray-800 italic truncate max-w-[200px]">{currentFileName}</span>
                        <span className="text-xl font-black text-orange-500">{progress}%</span>
                    </div>
                </div>

                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-12">
                    <div 
                        className="h-full bg-[#f97316] rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="w-full flex items-center justify-between mb-8 pb-8 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <Check size={14} className="text-gray-300" />
                        <span className="text-xs font-bold text-gray-400 italic">{filesCompleted} of {selectedItems.length} Files completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={14} className="text-gray-300" />
                        <span className="text-xs font-bold text-gray-400 italic">{timeLeftSeconds} seconds left</span>
                    </div>
                </div>

                <div className="w-full grid grid-cols-1 gap-3">
                    <button 
                        onClick={() => setIsPaused(!isPaused)}
                        className={`w-full py-4 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${isPaused ? 'bg-blue-500 hover:bg-blue-600' : 'bg-[#f97316] hover:bg-[#ea580c]'}`}
                    >
                        {isPaused ? <Check size={18} /> : <Pause size={18} />}
                        <span>{isPaused ? 'Resume Export' : 'Pause Export'}</span>
                    </button>
                    <button 
                        onClick={() => setStep(1)}
                        className="w-full py-4 text-gray-500 font-bold hover:text-gray-800 transition-all"
                    >
                        Cancel Export
                    </button>
                </div>
                
                <p className="mt-8 text-[9px] font-extrabold text-gray-300 tracking-[0.2em] uppercase">Notivo Secure System - 256-Bit Encrypted</p>
            </div>
        </div>
    </div>
  )};

  // Step 3: Success
  const renderStep3 = () => {
    const totalSize = (selectedItems.length * 2.4).toFixed(1);
    const generatedDate = new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in flex flex-col items-center justify-center p-12 min-h-[500px]">
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-sm shadow-green-100 animate-bounce">
            <Check size={40} strokeWidth={3} />
        </div>
        
        <div className="text-center mb-12">
            <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-3">Process Complete</p>
            <h2 className="text-3xl font-black text-[#1a1f36] leading-tight mb-4">Export Completed <br/>Successfully</h2>
            <p className="text-sm text-gray-400 font-medium max-w-xs mx-auto">Your analytics report is ready for download and offline use.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-12">
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1 border border-gray-100">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                   <FileText size={10} /> File Size
                </span>
                <span className="text-base font-black text-gray-800">{totalSize} MB</span>
            </div>
            <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-1 border border-gray-100">
                <span className="text-[9px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                   <Clock size={10} /> Generated
                </span>
                <span className="text-base font-black text-gray-800">{generatedDate}</span>
            </div>
        </div>

        <div className="w-full max-w-sm space-y-4 mb-4">
            <button className="w-full py-4 bg-[#f97316] text-white rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-[#ea580c] transition-all shadow-lg shadow-orange-900/10">
                <Download size={20} />
                <span>Download File</span>
            </button>
            <button className="w-full py-4 bg-white text-gray-700 border border-gray-100 rounded-2xl font-extrabold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
                <Share2 size={20} />
                <span>Share via Link</span>
            </button>
        </div>
    </div>
  )};

  return (
    <div className="pb-10 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <button 
          onClick={() => {
              if (step === 1) navigate('/dashboard/analytics');
              else if (step === 3) setStep(1);
              else setStep(step - 1);
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
        >
          <ArrowLeft size={18} />
          <div className="flex flex-col items-start leading-tight">
            <h1 className="text-xl font-extrabold text-[#1a1f36]">
                {step === 1 ? 'Export Module' : step === 2 ? 'Export Data' : 'Document Export'}
            </h1>
            <p className="text-xs font-medium text-gray-400 italic">NOTIVO Secure System</p>
          </div>
        </button>
      </div>

      <div className="max-w-5xl mx-auto h-full">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
      </div>

      {/* Mobile-style bottom nav indicators (as per image) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-2 md:hidden flex justify-around">
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <LayoutDashboard size={18} />
            </div>
            <span className="text-[9px] font-bold">Dashboard</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-orange-500">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <CheckCircle2 size={18} />
            </div>
            <span className="text-[9px] font-bold">Analytics</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-gray-400">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <FileText size={18} />
            </div>
            <span className="text-[9px] font-bold">Reports</span>
          </div>
      </div>
    </div>
  );
};

export default ExportModule;
