import React, { useState } from 'react';
import { X, Send, AlertCircle, CheckSquare, Square } from 'lucide-react';

const RequestChangesModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [issues, setIssues] = useState({
    venue: false,
    schedule: false,
    format: false,
    contact: false
  });

  if (!isOpen) return null;

  const toggleIssue = (key) => setIssues({...issues, [key]: !issues[key]});

  const handleSubmit = () => {
    if (message.trim() === '') {
      alert("Please enter a specific change request message.");
      return;
    }
    onSubmit({ message, issues });
    setMessage('');
    setIssues({ venue: false, schedule: false, format: false, contact: false });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#f8f9fa] w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between relative border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-bold text-gray-900 tracking-wide flex items-center gap-2">
            <AlertCircle size={16} className="text-orange-500" />
            Request Specific Changes
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-colors outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Change Request Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="E.g., Please update the specific room number for the plenary session as flagged by the AI."
              className="w-full h-32 bg-white border border-gray-200 rounded-xl p-4 text-sm focus:border-orange-300 focus:ring-2 focus:ring-orange-100 outline-none resize-none placeholder:text-gray-400 transition-all shadow-sm"
            ></textarea>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Link to AI Scan Issues (Optional)</label>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => toggleIssue('venue')}
                className={`flex items-start gap-2 text-left p-3 rounded-xl border transition-all outline-none ${issues.venue ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="mt-0.5 text-orange-500">
                  {issues.venue ? <CheckSquare size={16} /> : <Square size={16} className="text-gray-300" />}
                </div>
                <span className="text-xs font-semibold text-gray-700">Venue Specification</span>
              </button>

              <button 
                onClick={() => toggleIssue('schedule')}
                className={`flex items-start gap-2 text-left p-3 rounded-xl border transition-all outline-none ${issues.schedule ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="mt-0.5 text-orange-500">
                  {issues.schedule ? <CheckSquare size={16} /> : <Square size={16} className="text-gray-300" />}
                </div>
                <span className="text-xs font-semibold text-gray-700">Schedule Conflict</span>
              </button>

              <button 
                onClick={() => toggleIssue('format')}
                className={`flex items-start gap-2 text-left p-3 rounded-xl border transition-all outline-none ${issues.format ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="mt-0.5 text-orange-500">
                  {issues.format ? <CheckSquare size={16} /> : <Square size={16} className="text-gray-300" />}
                </div>
                <span className="text-xs font-semibold text-gray-700">Format & Branding</span>
              </button>

              <button 
                onClick={() => toggleIssue('contact')}
                className={`flex items-start gap-2 text-left p-3 rounded-xl border transition-all outline-none ${issues.contact ? 'bg-orange-50 border-orange-200' : 'bg-white border-gray-200 hover:border-gray-300'}`}
              >
                <div className="mt-0.5 text-orange-500">
                  {issues.contact ? <CheckSquare size={16} /> : <Square size={16} className="text-gray-300" />}
                </div>
                <span className="text-xs font-semibold text-gray-700">Contact Details</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button 
              onClick={onClose}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-xl py-3.5 font-bold text-sm transition-all active:scale-[0.98] outline-none"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 bg-gray-900 hover:bg-black text-white rounded-xl py-3.5 flex items-center justify-center gap-2 font-bold text-sm transition-all shadow-md active:scale-[0.98] outline-none"
            >
              <Send size={16} />
              Submit Request
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RequestChangesModal;
