import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, Search, Lightbulb, AlertTriangle, Clock, 
  CheckCircle2, UserCheck, MessageSquare, CornerDownRight,
  PenTool, CheckCircle, Landmark, QrCode, Send, Loader2, ChevronDown, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SignatureModal from '../components/SignatureModal';
import RequestChangesModal from '../components/RequestChangesModal';

// Mocked Document Database
const MOCK_DOCUMENTS = [
  {
    id: "#INV-2024-0892",
    title: "2024 Academic Leadership Forum",
    subtitle: "Exploring the frontiers of research excellence and institutional growth in the modern digital landscape.",
    date: "October 24th, 2024",
    time: "09:00 AM - 04:30 PM",
    location: "Main Campus",
    room: "Room TBD (Pending)",
    rsvp: "events@notivo-institution.edu"
  },
  {
    id: "#INV-2024-0893",
    title: "Annual Board of Directors Meeting",
    subtitle: "A comprehensive review of Q3 performance and strategic roadmap planning for 2025.",
    date: "November 5th, 2024",
    time: "10:00 AM - 02:00 PM",
    location: "Executive Center",
    room: "Boardroom A",
    rsvp: "board@notivo-institution.edu"
  },
  {
    id: "#INV-2024-0894",
    title: "Departmental Research Symposium",
    subtitle: "Showcasing groundbreaking research from our doctoral candidates and faculty members.",
    date: "December 12th, 2024",
    time: "11:00 AM - 05:00 PM",
    location: "Science Building",
    room: "Auditorium B",
    rsvp: "research@notivo-institution.edu"
  }
];

const ReviewPanel = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // State for Document
  const [searchInput, setSearchInput] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const currentDoc = MOCK_DOCUMENTS[currentDocIndex];

  // State for Modals & Approval
  const [isSignatureModalOpen, setSignatureModalOpen] = useState(false);
  const [isRequestModalOpen, setRequestModalOpen] = useState(false);
  const [signatureData, setSignatureData] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  
  // State for AI Smart Scan
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  // State for Feedback
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackMessages, setFeedbackMessages] = useState([
    {
      id: 1,
      sender: "Staff: Mark Roberts",
      time: "10:30 AM",
      text: "HOD, I've drafted the annual conference invitation. Could you please check the guest list section?",
      isMe: false
    }
  ]);

  // Handle clicks outside search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Handlers ---

  const handleSearchSelect = (index) => {
    setCurrentDocIndex(index);
    setSearchInput("");
    setShowSearchDropdown(false);
    setSignatureData(null);
    setIsApproved(false);
    setHasScanned(false);
  };

  const handleSmartScan = () => {
    if (isScanning || hasScanned) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 2000);
  };

  const handleSignatureConfirm = (dataURL) => {
    setSignatureData(dataURL);
    setSignatureModalOpen(false);
  };

  const handleGrantPermission = () => {
    setIsApproved(true);
  };

  const handleRequestSubmit = (data) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setFeedbackMessages([...feedbackMessages, {
      id: Date.now(),
      sender: "HOD: Dr. Sarah",
      time: timeString,
      text: `CHANGES REQUESTED: ${data.message}`,
      isMe: true
    }]);
    setRequestModalOpen(false);
  };


  const submitFeedback = () => {
    if (feedbackInput.trim() !== "") {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setFeedbackMessages([...feedbackMessages, {
        id: Date.now(),
        sender: "HOD: Dr. Sarah",
        time: timeString,
        text: feedbackInput,
        isMe: true
      }]);
      setFeedbackInput("");
    }
  };

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => 
    doc.id.toLowerCase().includes(searchInput.toLowerCase()) || 
    doc.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[calc(100vh-10rem)] transition-all">
      
      {/* Top Header */}
      <div className="px-6 py-5 flex flex-col border-b border-gray-50 shrink-0 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Review Panel</h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide mt-0.5">Invitation ID: {currentDoc.id}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard/notifications')}
              className="text-gray-400 hover:text-orange-500 transition-colors outline-none relative p-1 hover:bg-gray-50 rounded-full"
            >
              <Bell size={18} />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            <div className="text-right flex flex-col items-end">
              <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">Institutional Access</span>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Session</span>
            </div>
          </div>
        </div>
        
        <div className="relative" ref={dropdownRef}>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            value={searchInput}
            onFocus={() => setShowSearchDropdown(true)}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setShowSearchDropdown(true);
            }}
            placeholder="Search and select an invitation..." 
            className="input-base pl-12 pr-10 py-2.5 bg-[#f4f7f9] border border-transparent rounded-lg text-sm focus:bg-white focus:border-orange-200 focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-gray-400"
          />
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />

          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc, idx) => {
                  const originalIndex = MOCK_DOCUMENTS.findIndex(d => d.id === doc.id);
                  return (
                    <button
                      key={doc.id}
                      onClick={() => handleSearchSelect(originalIndex)}
                      className="w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-xs font-bold text-gray-900 group-hover:text-orange-600">{doc.id}</div>
                        <div className="text-[10px] text-gray-500">{doc.title}</div>
                      </div>
                      {originalIndex === currentDocIndex && <CheckCircle size={14} className="text-orange-500" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-xs text-gray-400 italic text-center">No invitations found</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-[600px]">
        
        {/* Left Column */}
        <div className="w-[32%] min-w-[320px] max-w-[400px] bg-white border-r border-gray-50 flex flex-col shrink-0 overflow-hidden">
          <div className="overflow-y-auto flex-1 custom-scrollbar flex flex-col">
            
            {/* AI Content Analysis */}
            <div className="p-6 border-b border-gray-50 shrink-0">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-sm font-bold flex items-center gap-2 text-gray-800">
                  <Lightbulb size={16} className="text-orange-500" />
                  AI Content Analysis
                </h2>
                <button 
                  onClick={handleSmartScan}
                  disabled={isScanning || isApproved}
                  className={`text-[10px] font-bold flex items-center gap-1.5 px-2.5 py-1 rounded uppercase tracking-wider transition-colors ${
                    (hasScanned || isApproved) ? 'bg-gray-100 text-gray-400 cursor-default' : 'text-orange-500 bg-orange-50 hover:bg-orange-100'
                  }`}
                >
                  {isScanning && <Loader2 size={12} className="animate-spin" />}
                  {hasScanned ? 'Scanned' : 'Smart Scan'}
                </button>
              </div>
              
              <div className="space-y-3 min-h-[100px] relative">
                {!hasScanned && !isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                    <p className="text-xs text-gray-400 font-medium text-center px-4">
                      {isApproved ? 'Analysis complete for approved document' : 'Click Smart Scan to analyze document'}
                    </p>
                  </div>
                )}
                
                {isScanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-orange-50/30 rounded-xl border border-orange-100 gap-2 animate-pulse">
                    <Loader2 size={24} className="text-orange-400 animate-spin" />
                    <p className="text-xs font-bold text-orange-400">Analyzing document structure...</p>
                  </div>
                )}

                {hasScanned && (
                  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-3">
                    <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 hover:shadow-sm cursor-pointer transition-all">
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-xs font-bold text-red-800">Venue Specification</h3>
                          <p className="text-[11px] text-red-600 mt-1 leading-snug">Missing building name or specific room number. Only "Main Campus" detected.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50/50 border border-yellow-100 rounded-xl p-3.5 hover:shadow-sm cursor-pointer transition-all">
                      <div className="flex items-start gap-2.5">
                        <Clock size={16} className="text-yellow-600 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-xs font-bold text-yellow-800">Potential Schedule Conflict</h3>
                          <p className="text-[11px] text-yellow-700 mt-1 leading-snug">Another event (Workshop C) is scheduled in the adjacent hall at the same time.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50/50 border border-green-100 rounded-xl p-3.5 hover:shadow-sm cursor-pointer transition-all">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                        <div>
                          <h3 className="text-xs font-bold text-green-800">Format & Branding</h3>
                          <p className="text-[11px] text-green-700 mt-1 leading-snug">Institutional logo and color palette adhere to the standard guidelines.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback Thread */}
            <div className="p-6 flex-1 flex flex-col bg-white">
              <h2 className="text-sm font-bold flex items-center gap-2 text-gray-800 mb-6 shrink-0">
                <MessageSquare size={16} className="text-gray-400" />
                Feedback Thread
              </h2>
              
              <div className="flex-1 flex flex-col gap-5 overflow-y-auto mb-4 pr-2 custom-scrollbar">
                {feedbackMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col gap-1.5 w-full animate-in fade-in duration-300 ${msg.isMe ? 'items-end self-end' : ''}`}>
                    <span className="text-[10px] font-semibold text-gray-400">
                      {msg.isMe ? (
                        <><span className="font-normal text-gray-300 mr-1">{msg.time}</span> {msg.sender}</>
                      ) : (
                        <>{msg.sender} <span className="font-normal text-gray-300 ml-1">{msg.time}</span></>
                      )}
                    </span>
                    <div className={`text-xs p-3.5 rounded-2xl w-[90%] leading-relaxed ${
                      msg.isMe 
                        ? 'bg-orange-500 text-white rounded-tr-sm shadow-sm' 
                        : 'bg-[#f4f7f9] text-gray-700 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto border-t border-gray-100 pt-4 shrink-0 relative flex items-center">
                <input 
                  type="text" 
                  disabled={isApproved}
                  placeholder={isApproved ? "Thread locked" : "Type your feedback..."}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitFeedback()}
                  className="w-full text-xs text-gray-700 outline-none placeholder:text-gray-400 py-3 pr-10 bg-gray-50 rounded-xl px-4 focus:bg-white focus:ring-2 focus:ring-orange-100 focus:border-orange-200 border border-transparent transition-all disabled:opacity-50"
                />
                <button 
                  onClick={submitFeedback}
                  disabled={isApproved}
                  className="absolute right-2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors active:scale-95 disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Document Viewer */}
        <div className="flex-1 bg-[#eef1f5] relative overflow-hidden flex flex-col">
          
          <div className="flex-1 overflow-y-auto custom-scrollbar pt-8 pb-32 px-8 flex justify-center items-start relative">
            
            {/* The Document */}
            <div className={`w-full max-w-[650px] min-h-[850px] bg-white rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.06)] p-12 md:p-16 relative flex flex-col animate-in slide-in-from-bottom-8 duration-500 fade-in transition-all`}>
              
              <div className="flex justify-between items-start mb-20 shrink-0">
                <div className="w-12 h-12 bg-orange-50 rounded flex items-center justify-center text-orange-500 shrink-0">
                  <Landmark size={24} strokeWidth={2.5} />
                </div>
                <div className="text-[8px] font-bold text-gray-400 tracking-widest uppercase text-right pt-2">
                  Institutional Event - Internal Circulation
                </div>
              </div>
              
              <div className="text-center mb-16 shrink-0">
                <h4 className="text-xs font-bold text-orange-500 tracking-widest uppercase mb-4">
                  Formal Invitation
                </h4>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-8">
                  {currentDoc.title}
                </h2>
                <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-8"></div>
                <p className="text-gray-500 text-sm md:text-base italic px-8 leading-relaxed font-serif">
                  "{currentDoc.subtitle}"
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 text-left mb-auto px-4 shrink-0">
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Date & Time</h5>
                  <p className="font-bold text-gray-900 text-sm">{currentDoc.date}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{currentDoc.time}</p>
                </div>
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location</h5>
                  <p className="font-bold text-gray-900 text-sm">{currentDoc.location}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{currentDoc.room}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-24 shrink-0 px-4">
                <div>
                  <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">RSVP Request</h5>
                  <p className="text-[10px] text-gray-400">{currentDoc.rsvp}</p>
                  
                  <div className="mt-8 h-16 flex items-end">
                    {signatureData && (
                      <div className="relative animate-in zoom-in duration-500">
                        <img src={signatureData} alt="HOD Signature" className="h-16 object-contain -ml-4 pointer-events-none" />
                        <div className="absolute bottom-1 left-0 text-[6px] font-bold text-orange-500 uppercase tracking-widest border-t border-orange-200 pt-1 w-24">
                          {isApproved ? 'HOD APPROVED' : 'HOD SIGNED'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`w-14 h-14 bg-gray-100 rounded flex flex-col items-center justify-center border border-gray-200 transition-all duration-500 ${isApproved ? 'opacity-100 text-gray-800 border-orange-200 bg-orange-50/50 scale-105 shadow-lg shadow-orange-500/10' : 'opacity-30 text-gray-400'}`}>
                  <div className="text-[6px] font-bold mb-1">EVENT</div>
                  <QrCode size={20} className={isApproved ? "text-orange-500" : ""} />
                </div>
              </div>

              {isApproved && (
                <div className="absolute inset-0 border-[6px] border-green-500/20 rounded-sm pointer-events-none animate-in fade-in duration-1000"></div>
              )}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.03)] z-20">
            <div className="flex gap-3 items-center">
              <button 
                onClick={() => setRequestModalOpen(true)}
                disabled={isApproved}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm outline-none ${isApproved ? 'opacity-50 cursor-not-allowed bg-gray-50 border border-gray-200 text-gray-400' : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
              >
                <CornerDownRight size={16} className={isApproved ? "text-gray-300" : "text-gray-400"} />
                Request Changes
              </button>
              
              <button 
                onClick={() => setSignatureModalOpen(true)}
                disabled={isApproved}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm outline-none ${
                  isApproved ? 'opacity-50 cursor-not-allowed bg-gray-50 border border-gray-200 text-gray-400' :
                  signatureData 
                    ? 'bg-green-50 border border-green-200 text-green-700 hover:bg-green-100' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {signatureData ? (
                  <><CheckCircle2 size={16} className="text-green-500" /> Signed</>
                ) : (
                  <><PenTool size={16} className="text-gray-400" /> Sign</>
                )}
              </button>
            </div>
            
            <button 
              onClick={handleGrantPermission}
              disabled={!signatureData || isApproved}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-all outline-none ${
                isApproved
                  ? 'bg-green-500 cursor-default shadow-md shadow-green-500/20'
                  : signatureData
                    ? 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 active:scale-95' 
                    : 'bg-gray-300 cursor-not-allowed opacity-50'
              }`}
            >
              <CheckCircle size={18} />
              {isApproved ? 'Permission Granted' : 'Grant Permission'}
            </button>
          </div>

        </div>

      </div>

      <SignatureModal 
        isOpen={isSignatureModalOpen} 
        onClose={() => setSignatureModalOpen(false)} 
        onConfirm={handleSignatureConfirm} 
      />

      <RequestChangesModal 
        isOpen={isRequestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        onSubmit={handleRequestSubmit}
      />

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
      `}} />
    </div>
  );
};

export default ReviewPanel;
