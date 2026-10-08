import "./App.css";

function App() {
  const portals = [
    {
      id: "admin",
      title: "Admin Portal",
      description: "Manage invitation templates, user permissions, and global system configurations.",
      url: "https://notivo-p2yh-mu.vercel.app/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      )
    },
    {
      id: "hod",
      title: "HOD Portal",
      description: "Departmental invitation tracking, event coordination, and recipient management.",
      url: "https://notivo-xe5q.vercel.app/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="container">
      <header className="header">
        <h1>NOTIVO</h1>
        <p>Digital Invitation Management System</p>
      </header>

      <main className="portal-grid">
        {portals.map((portal) => (
          <div
            key={portal.id}
            className="portal-card"
            onClick={() => window.location.href = portal.url}
          >
            <div className="icon-wrapper">
              {portal.icon}
            </div>
            <h2>{portal.title}</h2>
            <p>{portal.description}</p>
            <button className="enter-button">
              Launch Portal
            </button>
          </div>
        ))}
      </main>

      <footer style={{ marginTop: "4rem", opacity: 0.6, fontSize: "0.9rem" }}>
        <p>&copy; 2026 NOTIVO. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;