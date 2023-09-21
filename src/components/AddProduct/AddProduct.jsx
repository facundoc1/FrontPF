import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/actions_create_product';
import { getUserProfile } from '../../Redux/actions/actions_profile';
import { Image } from 'cloudinary-react';
import { CloudinaryContext } from 'cloudinary-react';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: '',
    summary: '',
    price: 0,
    stock: 0,
    images: '',
    categoryIds: '',
    subcategoryIds: '',
  });

  const userProfile = useSelector((state) => state.profile.userData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'GRTECH1');
  
    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dvjef49et/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setProductData({
          ...productData,
          images: data.secure_url,
        });
      }
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
    }
  };

   

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userProfile && userProfile.isSeller) {
      const token = localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const formData = new FormData();
        formData.append('images', productData.images);
        formData.append('title', productData.title);
        formData.append('summary', productData.summary);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('categoryIds', productData.categoryIds);
        formData.append('subcategoryIds', productData.subcategoryIds);

        await dispatch(createProduct(formData, headers));

        // Limpieza del formulario después de enviar
        setProductData({
          title: '',
          summary: '',
          price: 0,
          stock: 0,
          images: '',
          categoryIds: '', 
          subcategoryIds: '', 
        });
      } catch (error) {
        console.error('Error al crear el producto:', error);
        // Aquí puedes manejar los errores de manera más específica si es necesario.
      }
    } else {
      console.error('El usuario no tiene permiso para publicar productos');
    }
  };

  return (
    <div>
      <h2>Crear nueva publicación de producto</h2>
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
          <label>Cargar Imágenes:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageUpload}
            multiple
          />
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
       
        <div>
        <CloudinaryContext cloudName="dvjef49et">
        {productData.images && (
  <div>
    <Image publicId={productData.images} width="100" height="100" crop="fill" />
  </div>
)}
          </CloudinaryContext>
        </div>

        <button type="submit">Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
