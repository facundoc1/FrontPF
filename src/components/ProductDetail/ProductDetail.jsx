import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axiosGetProductDetail } from '../../Redux/actions/actions';
import { handleActiveProduct } from '../../Redux/actions/actions_softDelete';
import { getUserProfileFromToken } from '../../Redux/actions/actions_auth';
import { addToTempCart } from '../../Redux/actions/actions_temp_cart'; // Importa la acción para agregar al carrito temporal


import Review from './Reviews/Reviews';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail.product);
  const loading = useSelector((state) => state.detail.loading);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    dispatch(axiosGetProductDetail(id));

    getUserProfileFromToken()
      .then((userData) => {
        if (userData && userData.isAdmin) {
          setIsAdmin(true);
        }
      })
      .catch((error) => {
        console.error('Error al obtener el perfil del usuario:', error);
      });

    if (product) {
      setIsActive(product.active);
    }
  }, [dispatch, id]);

  const toggleProductStatus = () => {
    if (isAdmin) {
      let newStatus = !isActive;

      if (!isActive) {
        newStatus = true;
      }

      handleActiveProduct(id, newStatus)
        .then(() => {
          setIsActive(newStatus);
        })
        .catch((error) => {
          console.error('Error al cambiar el estado del producto:', error);
        });
    }
  };
  const handleAddToCart = (product) => {
    dispatch(addToTempCart(product));
  };
  

  return (
    <div className="product-detail">
      {loading ? (

        <p>Loading...</p>

      ) : product ? (
        <div>
          {product.active ? (
            <div>
              <h2>{product.title}</h2>
              <p>{product.summary}</p>
              <p>Precio: ${product.price}</p>
              <p>Stock disponible: {product.stock} unidades</p>
              <p>Fecha de creación: {new Date(product.createdAt).toLocaleDateString()}</p>
              <p>Fecha de actualización: {new Date(product.updatedAt).toLocaleDateString()}</p>
              <p>Usuario ID: {product.userId}</p>

              <h3>Categorías:</h3>
              <ul>
                {product.Categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>

              <h3>Subcategorías:</h3>
              <ul>
                {product.Subcategories.map((subcategory) => (
                  <li key={subcategory.id}>{subcategory.name}</li>
                ))}
              </ul>
              {product.active && (
  <div>
    <button onClick={() => handleAddToCart(product)}>Agregar al Carrito</button>
    {/* Resto de la información del producto */}
  </div>
)}

              {isAdmin && (
                <div>
                  <p>Estado de la Publicación: {isActive ? 'Activa' : 'Desactivada'}</p>
                  <button onClick={toggleProductStatus}>
                    {isActive ? 'Desactivar Publicación' : 'Activar Publicación'}
                  </button>
                </div>
              )}

              <Review />
            </div>
          ) : (
            <p>Este producto ya no está disponible.</p>
          )}
       {isAdmin && (
          <div>
                 <button onClick={toggleProductStatus}>
                  {isActive ? 'Desactivar Publicación' : 'Activar Publicación'}
                 </button>
          </div>
        )}
      </div>
    ) : (
      <p>No se encontró el producto.</p>
    )}
  </div>
);
    }
export default ProductDetail;