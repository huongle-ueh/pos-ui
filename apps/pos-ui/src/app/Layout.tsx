// Layout.js
import React from 'react';
import './Layout.css';

function Layout({ children, user }: { children: React.ReactNode; user: any }) {
    const capitalizeFirstLetter = (username: string): string => {
        return username.charAt(0).toUpperCase() + username.slice(1);
    };
    const loggedUser = user || JSON.parse(localStorage.getItem('user') || 'null');
  return (
    <div className="layout">
      <div className="header">
        <img src="assets/logo.png" alt="Logo" className="logo" />
        <div className="user-info">
          {loggedUser ? (
            <p>Welcome, {capitalizeFirstLetter(loggedUser.name)}!</p>
          ) : null}
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}

export default Layout;
