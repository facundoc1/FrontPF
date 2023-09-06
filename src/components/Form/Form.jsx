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
    birthdate: null,
  });

  const redirectToGoogleSignIn = () => {
    const redirectUrl = 'http://localhost:3000';
    const clientId = '8005685121-lc08e1doe31irr0ut4slblqt03qskv6s.apps.googleusercontent.com';
    const googleSignInUrl = `https://accounts.google.com/o/oauth2/auth?redirect_uri=${redirectUrl}&response_type=code&client_id=${clientId}&scope=openid%20profile%20email`;
    window.location.href = googleSignInUrl;
  };

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const updatedErrors = { ...errors };

    switch (fieldName) {
      case 'username':
        if (value === '') {
          updatedErrors.username = 'El nombre de usuario es obligatorio.';
        } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
          updatedErrors.username = 'El nombre de usuario no debe contener espacios ni caracteres especiales.';
        } else {
          updatedErrors.username = ''; 
        }
        break;
      case 'password':
        if (value === '') {
          updatedErrors.password = 'La contraseña es obligatoria.';
        } else if (
          !/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(value) ||
          value.length < 8
        ) {
          updatedErrors.password =
            'La contraseña debe contener al menos una mayúscula, un número, un carácter especial y tener al menos 8 caracteres.';
        } else {
          updatedErrors.password = ''; 
        }
        break;
      case 'confirmPassword':
        if (value !== formData.password) {
          updatedErrors.confirmPassword = 'Las contraseñas no coinciden.';
        } else {
          updatedErrors.confirmPassword = ''; 
        }
        break;
      case 'email':
        if (value === '') {
          updatedErrors.email = 'El correo electrónico es obligatorio.';
        } else if (
          !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
        ) {
          updatedErrors.email = 'El correo electrónico no es válido.';
        } else {
          updatedErrors.email = ''; 
        }
        break;
      case 'birthdate':
        if (!value || getAge(value) < 18) {
          updatedErrors.birthdate = 'Debes ser mayor de 18 años para registrarte.';
        } else {
          updatedErrors.birthdate = ''; 
        }
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };
  const maxDate = new Date();
  const handleDateChange = (date) => {
    setFormData({ ...formData, birthdate: date });

    validateField('birthdate', date);
  };

  const getAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    alert('Registro exitoso');
  };

  const validateForm = () => {
    const updatedErrors = { ...errors };

    if (formData.username === '') {
      updatedErrors.username = 'El nombre de usuario es obligatorio.';
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      updatedErrors.username = 'El nombre de usuario no debe contener espacios ni caracteres especiales.';
    }

    if (formData.password === '') {
      updatedErrors.password = 'La contraseña es obligatoria.';
    } else if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(formData.password) ||
      formData.password.length < 8
    ) {
      updatedErrors.password =
        'La contraseña debe contener al menos una mayúscula, un número, un carácter especial y tener al menos 8 caracteres.';
    }

    if (formData.confirmPassword !== formData.password) {
      updatedErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    if (formData.email === '') {
      updatedErrors.email = 'El correo electrónico es obligatorio.';
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(formData.email)
    ) {
      updatedErrors.email = 'El correo electrónico no es válido.';
    }

    if (!formData.birthdate || getAge(formData.birthdate) < 18) {
      updatedErrors.birthdate = 'Debes ser mayor de 18 años para registrarte.';
    }
    
    for (const errorKey in updatedErrors) {
      if (updatedErrors[errorKey]) {
        setErrors(updatedErrors);
        return false;
      }
    }

    return true;
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
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required
              />
              {errors.username && <div className={style.error}>{errors.username}</div>}
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
              {errors.password && <div className={style.error}>{errors.password}</div>}
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
              {errors.confirmPassword && <div className={style.error}>{errors.confirmPassword}</div>}
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
              {errors.email && <div className={style.error}>{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="birthdate">Birthdate:</label>
              <DatePicker
                className=''
                selected={formData.birthdate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                showMonthDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                isClearable
                required
                maxDate={maxDate}
              />
              {errors.birthdate && <div className={style.error}>{errors.birthdate}</div>}
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
