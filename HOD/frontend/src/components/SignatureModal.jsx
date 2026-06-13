import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { X, ShieldCheck, Trash2, Info, Landmark, AlertCircle, PenTool, Upload, ImageIcon } from 'lucide-react';

const SignatureModal = ({ isOpen, onClose, onConfirm }) => {
  const sigCanvas = useRef(null);
  const fileInputRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'upload'
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');

  if (!isOpen) return null;

  const handleClear = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setErrorMsg('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please upload an image file (PNG, JPG, etc.).');
      return;
    }
    setErrorMsg('');
    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setUploadedPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    try {
      if (activeTab === 'draw') {
        if (sigCanvas.current) {
          const dataURL = sigCanvas.current.getCanvas().toDataURL('image/png');
          setErrorMsg('');
          onConfirm(dataURL);
        }
      } else {
        if (!uploadedPreview) {
          setErrorMsg('Please upload a signature image first.');
          return;
        }
        setErrorMsg('');
        onConfirm(uploadedPreview);
      }
    } catch (e) {
      setErrorMsg('Error capturing signature. Please try again.');
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#f8f9fa] w-full max-w-sm rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-center relative border-b border-gray-100 shrink-0">
          <button 
            onClick={onClose}
            className="absolute left-6 text-gray-400 hover:text-gray-700 transition-colors outline-none"
          >
            <X size={20} />
          </button>
          <h2 className="text-sm font-bold text-gray-900 tracking-wide">Institutional Authorization</h2>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[85vh] custom-scrollbar">
          <div className="text-center shrink-0">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">HOD Digital Signature</h1>
            <p className="text-xs text-gray-500 leading-relaxed px-2 font-medium">
              Provide your official signature to authorize this invitation.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 rounded-2xl p-1 gap-1 shrink-0">
            <button
              onClick={() => switchTab('draw')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'draw'
                  ? 'bg-white text-orange-600 shadow-sm shadow-orange-100'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PenTool size={14} />
              Draw Signature
            </button>
            <button
              onClick={() => switchTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-orange-600 shadow-sm shadow-orange-100'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Upload size={14} />
              Upload Image
            </button>
          </div>

          {/* Draw Tab */}
          {activeTab === 'draw' && (
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative shrink-0 animate-in fade-in duration-200">
              <div className={`border-2 border-dashed ${errorMsg ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-[#fafbfc]'} rounded-2xl relative overflow-hidden h-[180px] flex items-center justify-center group transition-colors`}>
                
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <SignatureCanvas 
                    ref={sigCanvas}
                    penColor="#0f172a"
                    canvasProps={{ width: 334, height: 176, className: 'cursor-crosshair w-full h-full' }}
                    onBegin={() => setErrorMsg('')}
                  />
                </div>
                
                <div className="absolute flex flex-col items-center justify-center pointer-events-none opacity-40 text-gray-500 z-0 group-hover:opacity-20 transition-opacity">
                  <PenTool size={20} className="mb-2" />
                  <span className="text-sm font-bold tracking-wide text-gray-700">Signature Canvas</span>
                  <span className="text-[10px] mt-1 font-semibold text-gray-500">Draw your official signature here</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-3 relative z-20">
                <div className="text-[10px] font-bold text-red-500 flex items-center gap-1 min-h-[16px]">
                  {errorMsg && <><AlertCircle size={12} /> {errorMsg}</>}
                </div>
                <button 
                  onClick={handleClear}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors outline-none"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative shrink-0 animate-in fade-in duration-200">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {uploadedPreview ? (
                <div className="relative">
                  <div className="h-[180px] rounded-2xl border-2 border-orange-200 bg-orange-50/30 flex items-center justify-center overflow-hidden">
                    <img
                      src={uploadedPreview}
                      alt="Uploaded signature"
                      className="max-h-[160px] max-w-full object-contain"
                    />
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-[10px] text-gray-500 font-semibold truncate max-w-[180px]">{uploadedFileName}</p>
                    <button
                      onClick={() => { setUploadedPreview(null); setUploadedFileName(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition-colors outline-none"
                    >
                      <Trash2 size={12} />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-[180px] rounded-2xl border-2 border-dashed border-gray-200 bg-[#fafbfc] hover:border-orange-300 hover:bg-orange-50/30 flex flex-col items-center justify-center gap-3 transition-all group"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <ImageIcon size={22} className="text-orange-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Click to browse</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 font-medium">PNG, JPG, SVG supported</p>
                  </div>
                </button>
              )}

              {errorMsg && (
                <p className="text-[10px] font-bold text-red-500 flex items-center gap-1 mt-2">
                  <AlertCircle size={12} /> {errorMsg}
                </p>
              )}
            </div>
          )}

          {/* Alert */}
          <div className="bg-[#fdf4e9] border border-[#fce3c7] rounded-xl p-4 flex gap-3 shrink-0">
            <Info size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-orange-900/80 leading-relaxed font-semibold">
              By signing, you are officially approving this invitation for distribution. This action will be logged and timestamped in the institutional audit trail.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5 mt-2 shrink-0">
            <button 
              onClick={handleConfirm}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] outline-none"
            >
              <ShieldCheck size={18} />
              Confirm &amp; Sign
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl py-3.5 font-bold text-sm transition-all active:scale-[0.98] outline-none"
            >
              Cancel
            </button>
          </div>
          
          <div className="text-center mt-4 border-t border-gray-200/50 pt-5 shrink-0">
            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
              <Landmark size={12} className="text-gray-300" />
              NOTIVO Institutional System
            </div>
            <p className="text-[9px] text-gray-400 font-medium">© 2024 Institutional Authorization Management.</p>
            <p className="text-[9px] text-gray-400 font-medium mt-0.5">All rights reserved.</p>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default SignatureModal;
