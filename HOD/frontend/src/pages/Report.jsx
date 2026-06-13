import React from 'react';
import { Upload, Download, BarChart3, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-10 h-full flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#1a1f36] tracking-tight flex items-center gap-3">
          <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <BarChart3 size={24} />
          </span>
          System Reports
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Manage your system reports by selecting an action below.</p>
      </div>

      {/* Main Content Area - Centered Action Cards */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 min-h-[60vh]">
        
        {/* Upload Card */}
        <button 
          onClick={() => navigate('/dashboard/upload')}
          className="group relative flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-14 w-full max-w-[500px] aspect-square shadow-sm hover:shadow-2xl hover:shadow-orange-100 hover:border-orange-200 transition-all duration-500 hover:-translate-y-2 animate-[slideUp_0.4s_ease-out_forwards]"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-orange-50 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-orange-100 transition-transform duration-500">
            <Upload size={56} className="text-orange-500 group-hover:text-orange-600" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Upload Data</h3>
          <p className="text-gray-500 text-base md:text-lg font-medium max-w-[300px] leading-relaxed">
            Upload new documents and datasets into the system for processing.
          </p>
          
          <div className="absolute bottom-8 flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <span>Proceed to Upload</span> <ChevronRight size={18} />
          </div>
        </button>

        {/* Export Card */}
        <button 
          onClick={() => navigate('/dashboard/export')}
          className="group relative flex flex-col items-center justify-center text-center bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-14 w-full max-w-[500px] aspect-square shadow-sm hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-200 transition-all duration-500 hover:-translate-y-2 animate-[slideUp_0.5s_ease-out_forwards]"
          style={{ animationDelay: '0.1s', opacity: 0 }}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-100 transition-transform duration-500">
            <Download size={56} className="text-blue-500 group-hover:text-blue-600" />
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">Export Reports</h3>
          <p className="text-gray-500 text-base md:text-lg font-medium max-w-[300px] leading-relaxed">
            Download analytical reports and extracted system data to your device.
          </p>
          
          <div className="absolute bottom-8 flex items-center gap-2 text-blue-500 font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <span>Proceed to Export</span> <ChevronRight size={18} />
          </div>
        </button>

      </div>
    </div>
  );
};

export default Report;
