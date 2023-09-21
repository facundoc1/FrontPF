import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../Redux/actions/actions_create_product';
import { getUserProfile } from '../../Redux/actions/actions_profile';
import axios from 'axios';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    title: '',
    summary: '',
    price: 0,
    stock: 0,
    image: [],
    categoryId: [], 
    subcategoryId: [], 
  });

  const userProfile = useSelector((state) => state.profile.userData);

  const loading = useSelector((state) => state.createProduct.loading);
  const error = useSelector((state) => state.createProduct.error);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    dispatch(getUserProfile());

    axios.get('/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
      });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'images') {
      const imagesArray = value.split(',').map((url) => url.trim());
      setProductData({
        ...productData,
        [name]: imagesArray,
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setProductData({
      ...productData,
      categoryId: selectedCategory,
    });

    
    const selectedCategoryObject = categories.find((category) => category.id === selectedCategory);
    if (selectedCategoryObject) {
      setSubcategories(selectedCategoryObject.subcategories);
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
        if (productData.images.length === 0) {
          console.error('Debes seleccionar al menos una imagen.');
          return;
        }

        const formData = new FormData();
        productData.images.forEach((image, index) => {
          formData.append(`image${index}`, image);
        });
        formData.append('title', productData.title);
        formData.append('summary', productData.summary);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('categoryId', productData.categoryId); 
        formData.append('subcategoryId', productData.subcategoryId); 

        await dispatch(createProduct(formData, headers));

        setProductData({
          title: '',
          summary: '',
          price: 0,
          stock: 0,
          image: [],
          categoryId: [], 
          subcategoryId: [], 
        });
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
          <input name="summary" value={productData.summary} onChange={handleChange} required />
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
          <label>Imágenes (URLs separadas por comas):</label>
          <input
            type="text"
            name="images"
            value={productData.images}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoría:</label>
          <select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleCategoryChange}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Subcategoría:</label>
          <select
            name="subcategoryId"
            value={productData.subcategoryId}
            onChange={handleChange}
          >
            <option value="">Selecciona una subcategoría</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={loading}>Crear Producto</button>
      </form>
    </div>
  );
};

export default CreateProduct;
