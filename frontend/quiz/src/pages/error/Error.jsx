import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo'

const ErrorPage = () => {

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/")
  }

  return (
    <div className="content-center">
      <Logo />
      <h1 className="sub-title">Sorry we can't found this page</h1>
      <button className="btn" onClick={handleHome}>Home</button>
    </div>
  );
}

export default ErrorPage