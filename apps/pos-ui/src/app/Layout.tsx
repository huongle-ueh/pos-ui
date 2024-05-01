// Layout.js
import React from 'react';
import './Layout.css';

function Layout({ children, user }: { children: React.ReactNode; user: any }) {
  return (
    <div className="layout">
      <div className="header">
        <img src="assets/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          {user ? (
            <p>Welcome, {user.name}!</p>
          ) : null}
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
