import React, { useState } from 'react';
import { createUser } from '../../services/api';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';
import './style.css';

const SignUpPage = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errosForm, setErrosForm] = useState([]);
  const [isUserCreated, setIsUserCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(email, username, password).then((result) => {
      setIsUserCreated(true);
      setErrosForm([]);
    }).catch((error) => {
      setErrosForm(JSON.parse(error.request.response));
    });
  }

  return (
    <div id="sing-in-page">
      <Logo />
      {isUserCreated ?
        (
          <div className="content-center">
            <img id="congratulation-icon" src="/img/congratulation.png" alt="Congratulation Icon" className="text-center" />
            <h1 className="title text-center">congratulations you just registered, log in and enjoy</h1>
            <Link className="btn" to="/login">Login</Link>
          </div>
        )
        :
        <div className="content-center">
          <h1 className="title text-center">Sign-up</h1>
          <form className="form content-center" action="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">email</label>
              <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="username">username</label>
              <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="password">password</label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div>
              {Object.keys(errosForm).map((field) => (<li>{errosForm[field].join(', ')}</li>))}
            </div>
            <div className="actions">
              <button type="submit" className="btn">Sign-up</button>
            </div>
          </form>
          <Link className="content-center home-link" to="/">Home</Link>
        </div>
      }
    </div>
  )
}

export default SignUpPage