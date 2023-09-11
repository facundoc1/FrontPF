import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import style from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocalLogin = async () => {
    try {
      const response = await fetch('/api/local-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        history.push('/home');
      } else {
      }
    } catch (error) {
      console.error('Error al iniciar sesión localmente:', error);
    }
  };

  const handleGoogleLogin = () => {
    const redirectUrl = 'http://localhost:3000';
    const clientId = 'your-client-id';
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
    window.location.href = googleSignInUrl;
  };

  return (
    <div className={style.master}>
      <div className={style.container}>
        <div>
          <h1>Sign In</h1>
          <button className={`google ${style.google}`} onClick={handleGoogleLogin}>
            <span>Login with Google</span>
          </button>
          <form onSubmit={handleLocalLogin}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder='Name'
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button className={style.Sign} type="submit">Sign in</button>
            </div>
          </form>
          <br></br>
          <div>
            <h3>If you don't have an account yet</h3>
          </div>
          <div>
            <button className={style.SignUp}><Link to="/Registro">Sign up</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
