import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { loginSuccess } from '../../Redux/actions/actions_login'; 
import { setAccessToken, setRefreshToken } from '../../Redux/actions/actions_auth';  
import style from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const history = useHistory();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const userData = response.data;
        dispatch(loginSuccess(userData));

        setAccessToken(userData.accessToken);
        setRefreshToken(userData.refreshToken);
        console.log(localStorage);
        
        history.push('/');
      } else {
      }
    } catch (error) {
      console.error('Error al iniciar sesión localmente:', error);
    }
  };

  const handleGoogleLogin = () => {
    const redirectUrl = 'http://localhost:3000';
    const clientId = '8005685121-lc08e1doe31irr0ut4slblqt03qskv6s.apps.googleusercontent.com';
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
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder='Email'
                value={formData.email}
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
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <label htmlFor="rememberMe">Recordarme</label>
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
