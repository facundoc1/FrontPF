// import React, { useState } from 'react';
// import './Login.module.css'; 
// import styles from './Login.module.css';

// function Login() {
//   const [isSignIn, setIsSignIn] = useState(true);

//   const toggleSignInUp = () => {
//     setIsSignIn(!isSignIn);
//   };
//   const redirectToGoogleSignIn = () => {
//     const redirectUrl = 'TU_URL_DE_REDIRECCION';
//     const clientId = 'TU_CLIENT_ID';
//     const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
//     window.location.href = googleSignInUrl;
//   };
//   const redirectToFacebookSignIn = () => {
//     const redirectUrl = 'TU_URL_DE_REDIRECCION';
//     const appId = 'TU_APP_ID';
//     const facebookSignInUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUrl}&scope=email`;
//     window.location.href = facebookSignInUrl;
//   };

//   return (
//   <div className={styles.container}>
//     <div className={`login-container ${isSignIn ? '' : 'active'}`}>
//       <div className="left-panel">
//         {isSignIn ? (
          
//           <div className="panel-content">
//             <h2>Sign In</h2>
//             <div className={styles.buttonContainer}>
//               <button className={`google ${styles.google}`} onClick={redirectToGoogleSignIn}>
//                 <span>Login with Google</span>
//               </button>
//               <button className={`facebook ${styles.facebook}`} onClick={redirectToFacebookSignIn}>
//                 <span>Login with Facebook</span>
//               </button>
//             </div>
//             <p>Or use your account</p>
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button className={styles.Sign}>Sign In</button>
//           </div>
//         ) : (
          
//           <div className="panel-content">
//             <h2>Create Account</h2>
//             <div className={styles.buttonContainer}>
//               <button className={`google ${styles.google}`} onClick={redirectToGoogleSignIn}>
//                 <span>Login with Google</span>
//               </button>
//               <button className={`facebook ${styles.facebook}`} onClick={redirectToFacebookSignIn}>
//                 <span>Login with Facebook</span>
//               </button>
//             </div>
//             <p>Or use your email for registration</p>
//             <input type="text" placeholder="Name" />
//             <input type="email" placeholder="Email" />
//             <input type="password" placeholder="Password" />
//             <button className={styles.Sign}>Sign Up</button>
//           </div>
//         )}
//       </div>
//       <div className="right-panel">
//         {isSignIn ? (
          
//           <div className="panel-content">
//             <h2>Hello, Friend!</h2>
//             <p>Enter your personal details and start your journey with us</p>
//             <button className={styles.Sign} onClick={toggleSignInUp}>
//               Sign Up
//             </button>
//           </div>
//         ) : (
          
//           <div className="panel-content">
//             <h2>Welcome back!</h2>
//             <p>To keep connected with us please login with your personal info</p>
//             <button className={styles.Sign} onClick={toggleSignInUp}>
//               Sign In
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import style from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const redirectToGoogleSignIn = () => {
        const redirectUrl = 'http://localhost:3000';
        const clientId = '8005685121-lc08e1doe31irr0ut4slblqt03qskv6s.apps.googleusercontent.com';
        const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
        window.location.href = googleSignInUrl;
      };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    setFormData({ username: '', password: '' });
  };

  return (
    <div className={style.master}>
    <div className={style.container}>
    <div>
      <h1>Sign In</h1>
      <button className={`google ${style.google}`} onClick={redirectToGoogleSignIn}>
        <span>Login with Google</span>
      </button>
      <form onSubmit={handleSubmit}>
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
        {/* Agrega un enlace a la página de registro */}
        <button className={style.SignUp}><Link to="/Registro">Sign up</Link></button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Login;