import React, { createContext, useContext, useState, useEffect } from 'react';

// Context that holds the user's role ('admin' | 'hod')
const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  // Initialise role from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('user_role');
    if (stored) setRole(stored);
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
    if (newRole) {
      localStorage.setItem('user_role', newRole);
    } else {
      localStorage.removeItem('user_role');
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole: updateRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => useContext(RoleContext);
