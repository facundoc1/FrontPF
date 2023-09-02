import React, { useState } from 'react';
import './Login.module.css'; // Importa tus estilos CSS
import styles from './Login.module.css';

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInUp = () => {
    setIsSignIn(!isSignIn);
  };
  const redirectToGoogleSignIn = () => {
    const redirectUrl = 'TU_URL_DE_REDIRECCION';
    const clientId = 'TU_CLIENT_ID';
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
    window.location.href = googleSignInUrl;
  };
  const redirectToFacebookSignIn = () => {
    const redirectUrl = 'TU_URL_DE_REDIRECCION';
    const appId = 'TU_APP_ID';
    const facebookSignInUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&scope=email`;
    window.location.href = facebookSignInUrl;
  };

  return (
    <div className={`login-container ${isSignIn ? '' : 'active'}`}>
      <div className="left-panel">
        {isSignIn ? (
          // Estado "Sign In"
          <div className="panel-content">
            <h2>Sign In</h2>
            <div className="button-container">
              <button className={`google ${styles.google}`} onClick={redirectToGoogleSignIn}>
                <span>Login with Google</span>
              </button>
              <button className={`facebook ${styles.facebook}`} onClick={redirectToFacebookSignIn}>
                <span>Login with Facebook</span>
              </button>
            </div>
            <p>Or use your account</p>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className={styles.Sign}>Sign In</button>
          </div>
        ) : (
          // Estado "Sign Up"
          <div className="panel-content">
            <h2>Create Account</h2>
            <div className="button-container">
              <button className={`google ${styles.google}`} onClick={redirectToGoogleSignIn}>
                <span>Login with Google</span>
              </button>
              <button className={`facebook ${styles.facebook}`} onClick={redirectToFacebookSignIn}>
                <span>Login with Facebook</span>
              </button>
            </div>
            <p>Or use your email for registration</p>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className={styles.Sign}>Sign Up</button>
          </div>
        )}
      </div>
      <div className="right-panel">
        {isSignIn ? (
          // Estado "Sign In"
          <div className="panel-content">
            <h2>Hello, Friend!</h2>
            <p>Enter your personal details and start your journey with us</p>
            <button className={styles.Sign} onClick={toggleSignInUp}>
              Sign Up
            </button>
          </div>
        ) : (
          // Estado "Sign Up"
          <div className="panel-content">
            <h2>Welcome back!</h2>
            <p>To keep connected with us please login with your personal info</p>
            <button className={styles.Sign} onClick={toggleSignInUp}>
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;