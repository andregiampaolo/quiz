import { Link } from 'react-router-dom';
import './style.css';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';


const Header = (props) => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  }

  return (
    <header id="header-wrapper">
      <Link id="header-logo-link" to="/dashboard">
        <img src="/img/logo.png" alt="Logo Blanked" className="header-logo" />
        <h2 className="header-logo-text">Blanked</h2>
      </Link>
      <h1 className="header-title">{props.title}</h1>
      <button id="btn-logout" className="btn" onClick={handleLogout}>Logout</button>
    </header>
  );
}

export default Header