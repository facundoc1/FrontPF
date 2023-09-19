import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosCategories, setFilterCategory, setFilterSubcategory, setFilteredProducts } from '../../Redux/actions/actions';
import './Filters.module.css';
import ProductList from '../Cards/Cards';

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const filterCategory = useSelector((state) => state.categories.filterCategory);
  const filterSubcategory = useSelector((state) => state.categories.filterSubcategory);

  // Estado local para realizar un seguimiento de la categoría y subcategoría actualmente seleccionadas
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  const handleCategoryChange = (e, category) => {
    const selectedCategoryId = e.target.value;
    dispatch(setFilterCategory(selectedCategoryId));
    setSelectedCategory(selectedCategoryId);

    // Calcula los productos filtrados aquí
    const filteredProducts = calculateFilteredProducts(allProducts, selectedCategoryId, selectedSubcategory);

    // Llama a la acción para establecer los productos filtrados
    dispatch(setFilteredProducts(filteredProducts));
  };

  const handleSubcategoryChange = (e, subcategory) => {
    const selectedSubcategoryId = e.target.value;
    dispatch(setFilterSubcategory(selectedSubcategoryId));
    setSelectedSubcategory(selectedSubcategoryId);

    // Calcula los productos filtrados aquí
    const filteredProducts = calculateFilteredProducts(allProducts, selectedCategory, selectedSubcategoryId);

    // Llama a la acción para establecer los productos filtrados
    dispatch(setFilteredProducts(filteredProducts));
  };

  // Obtén todos los productos del estado
  const allProducts = useSelector((state) => state.products.products);

  // Calcula los productos filtrados
  const calculateFilteredProducts = (products, categoryFilter, subcategoryFilter) => {
    let filteredProducts = products;

    if (categoryFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categoryId === categoryFilter
      );
    }

    if (subcategoryFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.subcategoryId === subcategoryFilter
      );
    }

    return filteredProducts;
  };

  return (
    <div className="filters-container">
      <div className="category-list">
        <h3>Categories</h3>
        {categories ? (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <label className="category-label">
                {category.name} 
                <input
                  type="radio"
                  id={`category-${category.id}`}
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={(e) => handleCategoryChange(e, category)}
                  className="category-checkbox"
                />
              </label>
              {selectedCategory === category.id && category.subcategories && (
                <div className="subcategory-list">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="subcategory-item">
                      <label className="subcategory-label">
                        {subcategory.name}
                        <input
                          type="radio"
                          id={`subcategory-${subcategory.id}`}
                          name="subcategory"
                          value={subcategory.id}
                          checked={selectedSubcategory === subcategory.id}
                          onChange={(e) => handleSubcategoryChange(e, subcategory)}
                          className="subcategory-checkbox"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Filters;
