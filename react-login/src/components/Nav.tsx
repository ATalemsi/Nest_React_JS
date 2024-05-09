import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';

const Nav = () => {
  const [redirect, setRedirect] = useState(false);
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      if (response.ok) {
        localStorage.removeItem('access_token');
        setRedirect(true);
      } else {
        
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  if (redirect) {
    return <NavLink to="/login" />
  }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link active" aria-current="page" onClick={handleLogout} >Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};


export default Nav;