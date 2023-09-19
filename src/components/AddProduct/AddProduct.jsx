import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/actions_create_product';
import { getUserProfile } from '../../Redux/actions/actions_profile';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: '',
    summary: '',
    price: 0,
    stock: 0,
    image: '', // Campo para el enlace de la imagen
    categoryIds: '',
    subcategoryIds: '',
  });

  const userProfile = useSelector((state) => state.profile.userData);

  const loading = useSelector((state) => state.createProduct.loading);
  const error = useSelector((state) => state.createProduct.error);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (userProfile && userProfile.isSeller) {
      // Solo enviamos el enlace de la imagen al backend
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('summary', productData.summary);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('image', productData.image);
      formData.append('categoryIds', productData.categoryIds);
      formData.append('subcategoryIds', productData.subcategoryIds);
  
      const token = localStorage.getItem('accessToken');
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      
      try {
        await dispatch(createProduct(formData, headers));
      } catch (error) {
        console.error('Error al crear el producto:', error);
      }
    } else {
      console.error('El usuario no tiene permiso para publicar productos');
    }
  };

  return (
    <div>
      <h2>Crear nueva publicación de producto</h2>
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" name="title" value={productData.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="summary" value={productData.summary} onChange={handleChange} required />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="price" value={productData.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={productData.stock} onChange={handleChange} required />
        </div>
        <div>
          <label>Imagen (URL):</label>
          <input type="text" name="image" value={productData.image} onChange={handleChange} required />
        </div>
        <div>
          <label>Categoría ID (separados por comas):</label>
          <input
            type="text"
            name="categoryIds"
            value={productData.categoryIds}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Subcategoría ID (separados por comas):</label>
          <input
            type="text"
            name="subcategoryIds"
            value={productData.subcategoryIds}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;

