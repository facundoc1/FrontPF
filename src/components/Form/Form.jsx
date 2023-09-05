import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    birthdate: null,
  });

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
    <div>
      <h2>Registro de Usuario</h2>
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
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthdate">Fecha de Nacimiento:</label>
          <DatePicker
            selected={formData.birthdate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable
            placeholderText="Seleccionar fecha"
            required
          />
        </div>
        <div>
          <button type="submit">Registrarse</button>
        </div>
      </form>
      <div>
        <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
}

export default RegistrationForm;

