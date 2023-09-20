import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axiosGetProductDetail } from '../../Redux/actions/actions'; // Asegúrate de importar la acción correspondiente

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

        <p>Loading...</p>

      ) : product ? (
        <div>
          <h2>{product.title}</h2>
          <p>{product.summary}</p>

          <p>Price: ${product.price}</p>
          <p>Available stock: {product.stock} unidades</p>
          <p>Creation date: {new Date(product.createdAt).toLocaleDateString()}</p>
          <p>Update date: {new Date(product.updatedAt).toLocaleDateString()}</p>
          <p>User ID: {product.userId}</p>

          <h3>Categories:</h3>

          <ul>
            {product.Categories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>


          <h3>Subcategories:</h3>

          <ul>
            {product.Subcategories.map((subcategory) => (
              <li key={subcategory.id}>{subcategory.name}</li>
            ))}
          </ul>
        </div>
      ) : (

        <p>Product not found.</p>

      )}
    </div>
  );
};

export default ProductDetail;