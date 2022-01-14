import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import Logo from '../../components/logo/Logo';
import { Link } from 'react-router-dom';


const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password).then((result) => {
    }).catch((error) => {
      setInvalidUser(true)
    });;
  }

  return (
    <div id="login-page">
      <Logo />
      <h1 className="title text-center">Login</h1>
      {(invalidUser) ? <div className="text-center form-error">Incorrect user or password</div> : ''}
      <form className="form content-center" action="form" onSubmit={handleSubmit} >
        <div className="field">
          <label htmlFor="username">username</label>
          <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="actions">
          <button type="submit" className="btn">Login</button>
        </div>
      </form>
      <Link className="content-center home-link" to="/">Home</Link>
    </div>
  )
}

export default LoginPage