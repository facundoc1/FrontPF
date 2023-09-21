import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getUserProfile } from '../../Redux/actions/actions_profile';
import { getUserIdFromToken } from '../../Redux/actions/actions_auth';
import { logout, clearAccessToken, clearRefreshToken } from '../../Redux/actions/actions_login';
import { handleActiveUser } from '../../Redux/actions/actions_softDelete'; 

const UserProfile = () => {
  const dispatch = useDispatch();
  const userId = getUserIdFromToken();
  const history = useHistory();
  const userData = useSelector((state) => state.profile.userData);
  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    clearAccessToken();
    clearRefreshToken();
    history.push('/');
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    setIsAdmin(userData && userData.isAdmin);
    setIsActive(userData && userData.active);
  }, [userData]);
  const toggleUserStatus = () => {
    if (isAdmin) {
      const newStatus = !isActive;

      handleActiveUser(userId, newStatus) 
        .then(() => {
          setIsActive(newStatus);
        })
        .catch((error) => {
          console.error('Error al cambiar el estado del usuario:', error);
        });
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!userData) {
    return <div>No se encontraron datos del usuario.</div>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>Nombre de Usuario: {userData.username}</p>
      <p>Nombre: {userData.firstName}</p>
      <p>Apellido: {userData.lastName}</p>
      <p>Fecha de Nacimiento: {userData.birthdate}</p>
      <p>Email: {userData.email}</p>
      <p>Quiere Notificaciones: {userData.wantsNotifications ? 'Sí' : 'No'}</p>
      <p>Es Vendedor: {userData.isSeller ? 'Sí' : 'No'}</p>
      {userData.isSeller && (
        <p>Nombre de la Tienda: {userData.storeName}</p>
      )}
      <h3>Direcciones de Envío:</h3>
      {userData.shippingAddresses.map((address) => (
        <div key={address.id}>
          <p>Dirección: {address.addressLine1}</p>
          <p>Complemento: {address.addressLine2}</p>
          <p>Ciudad: {address.city}</p>
          <p>Código Postal: {address.postalCode}</p>
          <p>País: {address.country}</p>
        </div>
      ))}
      <div>
        {isAdmin && (
          <div>
            <label>
              Estado del Usuario: {isActive ? 'Activo' : 'Inactivo'}
              <button onClick={toggleUserStatus}>
                {isActive ? 'Desactivar Usuario' : 'Activar Usuario'}
              </button>
            </label>
          </div>
        )}
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      {isAdmin ? (
        <Link to="/admin">Dashboard de Admin</Link>
      ) : null}
    </div>
  );
};

export default UserProfile;