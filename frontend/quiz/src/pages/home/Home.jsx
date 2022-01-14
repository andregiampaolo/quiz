import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../../components/logo/Logo'
import './style.css';
import { Link } from 'react-router-dom';


const HomePage = () => {

  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <Logo />
      <div id="wrapper-action" className="content-center">
        {authenticated ? navigate("/dashboard")
          : (
            <div>
              <Link className="btn" to="/login">Login</Link>
              <Link className="btn" to="/sign-up">Sign-up</Link>
            </div>
          )
        }
      </div>
      <div id="wrapper-text" className="content-center">
        <p>Welcome to Blanked, where your mind goes blanked sometimes!<br />
          There is no problem when this happens, it's important to make mistakes in order to learn.<br />
          Here you'll find some questions to test your knowledge.
        </p>
        <p>Have fun learning with us!</p>
      </div>
    </div >
  );
}

export default HomePage