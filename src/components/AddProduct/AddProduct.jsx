import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/actions_create_product';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: '',
    summary: '',
    price: 0,
    stock: 0,
    image: null,
    externalImageLink: '',
    categoryIds: [],
    subcategoryIds: [],
  });

  const user = useSelector((state) => state.login.user);

  const loading = useSelector((state) => state.createProduct.loading);
  const error = useSelector((state) => state.createProduct.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({
      ...productData,
      image: imageFile,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user && user.isSeller) {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('summary', productData.summary);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('image', productData.image);

      
      dispatch(createProduct(formData));
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
        <label>Imagen del Producto:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
       <div>
       <label>Categoría ID:</label>
       <input type="text" name="categoryIds" value={productData.categoryIds} onChange={handleChange} />
       </div>
       <div>
       <label>Subcategoría ID:</label>
       <input type="text" name="subcategoryIds" value={productData.subcategoryIds} onChange={handleChange} />
       </div>
        <button type="submit" disabled={loading}>Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
