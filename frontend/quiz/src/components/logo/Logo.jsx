import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div id="wrapper-logo">
      <Link className="content-center logo-link" to="/">
        <img src="/img/logo.png" alt="Logo Blanked" className="logo" />
        <h2 className="logo-text">Blanked</h2>
      </Link>
    </div>
  );
}

export default Logo