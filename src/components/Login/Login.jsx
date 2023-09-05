import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde 'react-router-dom'
/* import style from "./Login.module.css"; */

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Iniciar Sesión</button>
        </div>
      </form>
      <div>
        {/* Agrega un enlace a la página de registro */}
        <Link to="/Registro">Registro</Link>
      </div>
    </div>
  );
}

export default Login;

//     const [isSignUp, setIsSignUp] = useState(false);
    
//     const toggleSignUp = () => {
//         setIsSignUp(!isSignUp);
//       };
//   return (
//     <div className={style.container} id="container">
//       <div className={`form-container ${isSignUp ? 'sign-up-container' : ''}`}>
//         <form action="#">
//           <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
//           <div className="social-container">
//             <button  className="social"><i className="fab fa-facebook-f"></i></button>
//             <button  className="social"><i className="fab fa-google-plus-g"></i></button>
//             <button  className="social"><i className="fab fa-linkedin-in"></i></button>
//           </div>
//           <span>Or use your email for {isSignUp ? 'registration' : 'sign in'}</span>
//           <input type="text" placeholder="Name" />
//           <input type="text" placeholder="Email" />
//           <input type="text" placeholder="Password" />
//           <button>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
//         </form>
//       </div>
//       <div className={`overlay-container ${isSignUp ? 'right-panel-active' : ''}`}>
//         <div className="overlay">
//           <div className="overlay-panel overlay-left">
//             <h1>Welcome Back!</h1>
//             <p>To keep connected with us please login with your personal info</p>
//             <button className="ghost" onClick={toggleSignUp}>Sign In</button>
//           </div>
//           <div className="overlay-panel overlay-right">
//             <h1>Hello, Friend!</h1>
//             <p>Enter your personal details and start your journey with us</p>
//             <button className="ghost" onClick={toggleSignUp}>Sign Up</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   