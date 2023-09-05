import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import style from "./Form.module.css";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthdate: "",
  });

  const redirectToGoogleSignIn = () => {
    const redirectUrl = 'TU_URL_DE_REDIRECCION';
    const clientId = 'TU_CLIENT_ID';
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
    window.location.href = googleSignInUrl;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === '') {
      alert('El nombre de usuario es obligatorio.');
      return;
    }

    if (formData.password === '') {
      alert('La contraseña es obligatoria.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    if (formData.email === '') {
      alert('El correo electrónico es obligatorio.');
      return;
    }

    if (formData.birthdate === null) {
      alert('La fecha de nacimiento es obligatoria.');
      return;
    }

    alert('Registro exitoso');
  };

  return (
    <div className={style.master}>
    <div className={style.container}>
    <div>
      <h1>Create Account</h1>
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
            placeholder='Create a Password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Your Email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            name='birthdate'
            value={formData.birthdate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable
            required
          />
        </div>
        <div>
          <button className={style.Sign} type="submit">Sign up</button>
        </div>
      </form>
      <br></br>
      <div>
        <h3>If you already have an account</h3>
      </div>
      <div>
      <button className={style.SignIn}><Link to="/login">Sign in</Link></button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default RegistrationForm;