import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import CardProduct from '../Cards/CardProduct'; 
import styles from './DashboardAdmin.module.css'; 
import { useSelector } from 'react-redux';
import { getAllUserProfiles } from '../../Redux/actions/actions_profile';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const allProducts = useSelector((state) => state.products.products);
  const inactiveProducts = allProducts.filter((product) => !product.active);
  const [userProfiles, setUserProfiles] = useState([]);
  const isAdmin = true; 

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profiles = await getAllUserProfiles();
        setUserProfiles(profiles);
      } catch (error) {
        console.error('Error al obtener perfiles de usuario:', error);
      }
    };
    fetchUserProfiles();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => setSelectedSection('publicaciones')}>
              Publicaciones
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('usuarios')}>
              Usuarios
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('reviews')}>
              Reviews
            </button>
          </li>
        </ul>
      </nav>

      {selectedSection === 'publicaciones' && (
        <div>
          <h3>Publicaciones Activas</h3>
          <div className={styles.horizontalList}>
            {allProducts.map((product) => (
              <div key={product.id} className={styles.horizontalItem}>
                <Link to={`/product/${product.id}`}>
                  <p>{product.title}</p>
                </Link>
              </div>
            ))}
          </div>
          <h3>Publicaciones Inactivas</h3>
          {inactiveProducts.length > 0 ? (
            <div className={styles.horizontalList}>
              {inactiveProducts.map((product) => (
                <div key={product.id} className={styles.horizontalItem}>
                  <Link to={`/product/${product.id}`}>
                    <p>{product.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No hay productos inactivos</p>
          )}
        </div>
      )}

{selectedSection === 'usuarios' && (
        <div>
          <h3>Usuarios Activos</h3>
          {/* Mostrar nombres de usuario y direcciones de correo electrónico */}
          {userProfiles.map((profile) => (
            <div key={profile.id}>
              <h4>Usuario</h4>
              <p>Nombre de Usuario: <Link to={`/userProfile/${profile.id}`}>{profile.username}</Link></p>
              <p>Email: {profile.email}</p>
            </div>
          ))}
          {userProfiles.length === 0 && <p>No hay usuarios activos.</p>}
        </div>
      )}

      {selectedSection === 'reviews' && (
        <div>
          <h3>Reviews Activas</h3>
          {/* Agrega el contenido para reviews activos aquí */}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
