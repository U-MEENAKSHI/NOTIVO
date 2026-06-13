import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import ProfilePanel from './ProfilePanel';

const Layout = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile picture state
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('hod_profile_pic') || null;
  });

  const handleProfilePicChange = (base64Image) => {
    setProfilePic(base64Image);
    if (base64Image) {
      localStorage.setItem('hod_profile_pic', base64Image);
    } else {
      localStorage.removeItem('hod_profile_pic');
    }
  };

  const isAuthenticated = !!localStorage.getItem('hod_token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      <Header 
        toggleProfile={() => setIsProfileOpen(!isProfileOpen)} 
        profilePic={profilePic} 
      />
      
      <div className="flex flex-1 pt-16">
        {/* Main Content Area */}
        <main className={`flex-1 transition-all duration-300 ${isProfileOpen ? 'lg:mr-80' : ''}`}>
          <div className="w-full max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Profile Sidebar */}
      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profilePic={profilePic}
        onProfilePicChange={handleProfilePicChange}
      />
      
      {/* Profile Overlay (Mobile only) */}
      {isProfileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsProfileOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Layout;

