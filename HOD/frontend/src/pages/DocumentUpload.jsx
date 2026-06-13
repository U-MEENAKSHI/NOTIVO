import React, { useState, useRef } from 'react';
import { ArrowLeft, CloudUpload, Info, Clock, ShieldCheck, Check, X, FileUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DocumentUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [category, setCategory] = useState('Circular');
  const [priority, setPriority] = useState('Normal');
  const [isDigitalSignature, setIsDigitalSignature] = useState(true);
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsUploading(true);
      setUploadProgress(0);
      
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
        }
      }, 150);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="animate-fade-in pb-10">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <button 
          onClick={() => navigate('/dashboard/analytics')}
          className="flex items-center gap-4 text-gray-500 hover:text-gray-900 transition-colors group outline-none"
        >
          <div className="p-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl group-hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <h1 className="text-2xl md:text-3xl font-black text-[#1a1f36] dark:text-white tracking-tight">Document Upload</h1>
            <p className="text-sm font-medium text-gray-400 dark:text-gray-500">NOTIVO Institutions Panel</p>
          </div>
        </button>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Status: Draft Mode</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Category Tabs */}
        <div className="p-6 pb-0 border-b border-gray-50">
            <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Document Category</label>
            <div className="flex bg-gray-50 p-1.5 rounded-xl w-fit mb-6">
                <button 
                onClick={() => setCategory('Circular')}
                className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${category === 'Circular' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                Circular
                </button>
                <button 
                onClick={() => setCategory('Invitation')}
                className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${category === 'Invitation' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                Invitation
                </button>
            </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {/* Title */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Document Title <span className="text-red-500">*</span></label>
                <input 
                    type="text" 
                    placeholder="e.g. Annual Symposium 2024"
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none font-medium text-gray-700"
                />
            </div>

            {/* Department */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Department</label>
                <input 
                    type="text" 
                    value="Computer Science"
                    readOnly
                    className="w-full px-4 py-3 bg-gray-100 border-none rounded-xl text-sm font-bold text-gray-500 cursor-not-allowed outline-none"
                />
            </div>

            {/* Effective Date */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Circular Effective Date</label>
                <div className="relative">
                    <input 
                        type="date" 
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none appearance-none"
                    />
                </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700">Priority Level</label>
                <div className="flex bg-gray-50 p-1 rounded-xl w-full">
                    {['Normal', 'Urgent', 'High'].map((p) => (
                        <button 
                            key={p}
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${priority === p ? 'bg-blue-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-gray-700">Description / Notes</label>
                <textarea 
                    rows="4"
                    placeholder="Provide additional context or instructions here..."
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-sm font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none resize-none"
                ></textarea>
            </div>

            {/* File Attachment */}
            <div className="md:col-span-2 space-y-2">
                <label className="block text-xs font-bold text-gray-700">File Attachment</label>
                
                {/* Hidden File Input */}
                <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                />

                <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-200 rounded-2xl p-8 bg-gray-50 flex flex-col items-center justify-center text-center group hover:border-blue-400 transition-all cursor-pointer"
                >
                    <div className="p-3 bg-white rounded-full text-blue-500 shadow-sm mb-3 group-hover:scale-110 transition-transform">
                        <CloudUpload size={24} />
                    </div>
                    <p className="text-xs font-bold text-gray-700">Drag & drop files or <span className="text-blue-600">browse</span></p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium italic">Supports PDF, DOC, DOCX (Max 10MB)</p>
                </div>
                
                {/* Upload Progress Preview */}
                {selectedFile && (
                    <div className="mt-4 p-4 bg-white border border-gray-100 rounded-xl flex items-center gap-4 relative overflow-hidden group animate-fade-in">
                        <div className={`p-2 rounded-lg ${uploadProgress === 100 ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>
                            {uploadProgress === 100 ? <Check size={16} /> : <FileUp size={16} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-bold text-gray-700 italic truncate max-w-[200px]">{selectedFile.name}</span>
                                <span className="text-[10px] font-extrabold text-blue-600">{uploadProgress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full transition-all duration-300 rounded-full ${uploadProgress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                    style={{ width: `${uploadProgress}%` }}
                                ></div>
                            </div>
                        </div>
                        <button 
                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="p-1 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Digital Signature */}
            <div className="md:col-span-2 flex items-center justify-between py-4 border-y border-gray-50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-800">Digital Signature</h4>
                        <p className="text-[10px] text-gray-400 font-medium italic">Add verified digital signature to the document footer</p>
                    </div>
                </div>
                <button 
                    onClick={() => setIsDigitalSignature(!isDigitalSignature)}
                    className={`w-12 h-6 rounded-full p-1 transition-all ${isDigitalSignature ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-all ${isDigitalSignature ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
            </div>

            {/* Actions */}
            <div className="md:col-span-2 flex items-center justify-between pt-4">
                <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1">
                    <Clock size={12} />
                    End-to-end encrypted upload
                </p>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-xl text-sm font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                        Save Draft
                    </button>
                    <button className="px-8 py-2.5 rounded-xl text-sm font-bold bg-[#1a1f36] text-white hover:bg-[#2d3350] transition-all flex items-center gap-2">
                        Upload & Notify
                        <ArrowLeft size={16} className="rotate-180" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
        <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                <Info size={16} />
            </div>
            <div>
                <h5 className="text-xs font-bold text-gray-800">Auto-Notification</h5>
                <p className="text-[10px] text-gray-400 font-medium">Relevant staff will be notified immediately after upload.</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-50 text-orange-500 rounded-lg">
                <Clock size={16} />
            </div>
            <div>
                <h5 className="text-xs font-bold text-gray-800">Version History</h5>
                <p className="text-[10px] text-gray-400 font-medium">The system maintains a full audit log of all document changes.</p>
            </div>
        </div>
        <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 text-green-500 rounded-lg">
                <ShieldCheck size={16} />
            </div>
            <div>
                <h5 className="text-xs font-bold text-gray-800">Compliance</h5>
                <p className="text-[10px] text-gray-400 font-medium">Documents follow institutional formatting guidelines.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
