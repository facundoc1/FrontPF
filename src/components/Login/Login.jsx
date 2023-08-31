import React from 'react';
import { useState } from 'react';
import style from "./Login.module.css"

const Login = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    
    const toggleSignUp = () => {
        setIsSignUp(!isSignUp);
      };
  return (
    <div className={style.container} id="container">
      <div className={`form-container ${isSignUp ? 'sign-up-container' : ''}`}>
        <form action="#">
          <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>Or use your email for {isSignUp ? 'registration' : 'sign in'}</span>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <button>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>
      </div>
      <div className={`overlay-container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={toggleSignUp}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button className="ghost" onClick={toggleSignUp}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login