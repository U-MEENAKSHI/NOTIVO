import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, User, Briefcase, Calendar, BarChart2, LayoutDashboard, Camera, Upload, Eye, X, FileText } from 'lucide-react';

const ProfilePanel = ({ isOpen, onClose, profilePic, onProfilePicChange }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onProfilePicChange(ev.target.result);
      setMenuOpen(false);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleRemovePic = (e) => {
    e.stopPropagation();
    onProfilePicChange(null);
    setIsZoomed(false);
    setMenuOpen(false);
  };

  const handleUpload = () => {
    setMenuOpen(false);
    fileInputRef.current?.click();
  };

  const handlePreview = () => {
    setMenuOpen(false);
    setIsZoomed(true);
  };

  return (
    <>
      <div className={`fixed inset-y-0 right-0 w-80 bg-white border-l border-gray-100 shadow-2xl transform transition-transform duration-300 ease-in-out z-30 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* Header */}
        <div className="p-4 flex items-center border-b border-gray-100">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 mr-2">
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-bold text-gray-800">HOD Profile</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Profile Card */}
          <div className="p-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-16 bg-blue-50"></div>
              <div className="px-4 pb-4 relative">

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  id="profile-pic-upload"
                />

                {/* Profile Picture + Dropdown Menu */}
                <div className="absolute -top-8 left-4" ref={menuRef}>
                  {/* Avatar Button */}
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-sm focus:outline-none relative group"
                    title="Click to upload or preview"
                  >
                    {profilePic ? (
                      <img
                        src={profilePic}
                        alt="HOD Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <User size={18} className="text-gray-400" />
                      </div>
                    )}
                    {/* Subtle dark overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div className="absolute top-[72px] left-0 w-36 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fade-in">
                      {/* Upload */}
                      <button
                        onClick={handleUpload}
                        className="w-full flex items-center space-x-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        <Upload size={14} className="flex-shrink-0" />
                        <span>Upload</span>
                      </button>

                      <div className="border-t border-gray-100" />

                      {/* Preview — disabled with tooltip when no photo */}
                      <button
                        onClick={profilePic ? handlePreview : undefined}
                        disabled={!profilePic}
                        title={!profilePic ? 'No photo uploaded yet' : 'Preview profile photo'}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                          profilePic
                            ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            : 'text-gray-300 cursor-not-allowed'
                        }`}
                      >
                        <Eye size={14} className="flex-shrink-0" />
                        <span>Preview</span>
                      </button>

                      {/* Remove — only visible when photo exists */}
                      {profilePic && (
                        <>
                          <div className="border-t border-gray-100" />
                          <button
                            onClick={handleRemovePic}
                            className="w-full flex items-center space-x-2.5 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <X size={14} className="flex-shrink-0" />
                            <span>Remove</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-12">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">HOD</h3>
                  <p className="text-blue-600 text-sm font-medium">Head of Department</p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="bg-gray-50 p-2 rounded-lg flex items-center">
                    <div className="text-blue-500 mr-2"><User size={14} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Department</p>
                      <p className="text-xs font-medium text-gray-800">Computer Science &amp; Engineering</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="bg-gray-50 p-2 rounded-lg flex-1 flex items-center">
                      <div className="text-blue-500 mr-2"><Calendar size={14} /></div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Joined</p>
                        <p className="text-xs font-medium text-gray-800">Jan 15, 2018</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg flex-1 flex items-center">
                      <div className="text-blue-500 mr-2"><Briefcase size={14} /></div>
                      <div>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Experience</p>
                        <p className="text-xs font-medium text-gray-800">15 Years</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Graph & Hierarchy */}
          <div className="px-4 pb-4">
            <h4 className="font-bold text-gray-800 text-sm mb-3">Flow Graph &amp; Hierarchy</h4>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">

              <div className="mb-6">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Reporting Hierarchy</p>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 text-blue-700 text-xs font-medium py-1.5 px-6 rounded-md w-full text-center">Administration</div>
                  <div className="text-gray-300 my-1"><ArrowLeft size={14} className="transform -rotate-90" /></div>
                  <div className="bg-blue-600 text-white text-xs font-medium py-1.5 px-6 rounded-md w-full text-center shadow-sm">HOD</div>
                  <div className="text-gray-300 my-1"><ArrowLeft size={14} className="transform -rotate-90" /></div>
                  <div className="bg-gray-50 text-gray-600 text-xs font-medium py-1.5 px-6 rounded-md w-full text-center border border-gray-100">Department Staff</div>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-3">Departmental Workflow</p>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold mr-3 flex-shrink-0">1</div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">Submission</h5>
                      <p className="text-[10px] text-gray-500 leading-tight">Staff prepares and submits reports/requests</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold mr-3 flex-shrink-0">2</div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">Review &amp; Approval</h5>
                      <p className="text-[10px] text-gray-500 leading-tight">HOD validates content and grants authorization</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center text-[10px] font-bold mr-3 flex-shrink-0">3</div>
                    <div>
                      <h5 className="text-xs font-bold text-gray-800">Final Distribution</h5>
                      <p className="text-[10px] text-gray-500 leading-tight">Approved documents distributed to Admin/Staff</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="border-t border-gray-100 p-3 bg-white flex justify-between px-6">
          <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
            <LayoutDashboard size={18} />
            <span className="text-[8px] mt-1 font-medium">Dashboard</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
            <BarChart2 size={18} />
            <span className="text-[8px] mt-1 font-medium">Analytics</span>
          </button>
          <button className="flex flex-col items-center text-blue-600">
            <User size={18} />
            <span className="text-[8px] mt-1 font-medium">Profile</span>
          </button>
          <button className="flex flex-col items-center text-gray-400 hover:text-gray-600">
            <FileText size={18} />
            <span className="text-[8px] mt-1 font-medium">Review Panel</span>
          </button>
        </div>

      </div>

      {/* Picture Zoom / Preview Modal */}
      {isZoomed && profilePic && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsZoomed(false)}
        >
          <div
            className="relative max-w-2xl w-full h-auto flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 p-2 focus:outline-none"
            >
              <X size={32} />
            </button>
            <img
              src={profilePic}
              alt="Profile Preview"
              className="rounded-2xl shadow-2xl max-h-[80vh] object-contain border-4 border-white/10"
            />
            {/* Change photo from inside preview */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
                fileInputRef.current?.click();
              }}
              className="mt-4 flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors backdrop-blur-sm"
            >
              <Camera size={14} />
              <span>Change Photo</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePanel;
