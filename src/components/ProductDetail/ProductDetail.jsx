import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axiosGetProductDetail } from '../../Redux/actions/actions'; 
import Review from './Reviews/Reviews'

const ProductDetail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail.product);
  const loading = useSelector((state) => state.detail.loading);

  

  useEffect(() => {
    dispatch(axiosGetProductDetail(id));
  }, [dispatch, id]);

  console.log('Objeto product:', product);
  
  return (
    <div className="product-detail">
      {loading ? (
        <p>Cargando...</p>
      ) : product ? (
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
          <Review />
        </div>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default ProductDetail;