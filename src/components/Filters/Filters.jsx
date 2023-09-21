import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  axiosCategories,
  setFilterCategory,
  setFilterSubcategory,
  filterProducts,
} from '../../Redux/actions/actions';
import 'rc-slider/assets/index.css'; // Importa los estilos de rc-slider
import Slider from 'rc-slider'; // Importa el componente Slider
import './Filters.module.css';
import ProductList from '../Cards/Cards';

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const allProducts = useSelector((state) => state.products.products);

  // Estado local para realizar un seguimiento de la categoría y subcategoría seleccionadas
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  // Estado local para el rango de precios seleccionado
  const [priceRange, setPriceRange] = useState([0, 100]); // Rango inicial

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  // Calcula dinámicamente el rango de precios mínimo y máximo
  useEffect(() => {
    const minPrice = Math.min(...allProducts.map((product) => product.price));
    const maxPrice = Math.max(...allProducts.map((product) => product.price));
    setPriceRange([minPrice, maxPrice]);
  }, [allProducts]);

  // Función para manejar cambios en la categoría
  const handleCategoryChange = (e, category) => {
    const categoryId = category.id;
    const isChecked = e.target.checked;

    // Actualizar la categoría seleccionada
    setSelectedCategory(isChecked ? categoryId : '');

    // Utilizar setFilterCategory para actualizar el estado en Redux
    dispatch(setFilterCategory(isChecked ? categoryId : ''));

    applyFilters(isChecked ? categoryId : '', selectedSubcategory, priceRange);
  };

  // Función para manejar cambios en la subcategoría
  const handleSubcategoryChange = (e, subcategory) => {
    const subcategoryId = subcategory.id;
    const isChecked = e.target.checked;

    // Actualizar la subcategoría seleccionada
    setSelectedSubcategory(isChecked ? subcategoryId : '');

    // Utilizar setFilterSubcategory para actualizar el estado en Redux
    dispatch(setFilterSubcategory(isChecked ? subcategoryId : ''));

    applyFilters(selectedCategory, isChecked ? subcategoryId : '', priceRange);
  };

  // Función para manejar cambios en el rango de precios
  const handlePriceRangeChange = (newRange) => {
    applyFilters(selectedCategory, selectedSubcategory, newRange);
  };

  // Función para aplicar todos los filtros
  const applyFilters = (categoryFilter, subcategoryFilter, priceRangeFilter) => {
    const filteredProducts = allProducts.filter((product) => {
      const categoryMatch = !categoryFilter || product.Categories.some((category) => category.id === categoryFilter);
      const subcategoryMatch = !subcategoryFilter || product.Subcategories.some((subcategory) => subcategory.id === subcategoryFilter);
      const priceMatch = product.price >= priceRangeFilter[0] && product.price <= priceRangeFilter[1];
      return categoryMatch && subcategoryMatch && priceMatch;
    });

    dispatch(filterProducts(filteredProducts));
  };

  return (
    <div className="filters-container">
      <div className="price-range">
        <h3>Price Range</h3>
        <Slider
          range
          min={priceRange[0]} // Utiliza el valor mínimo calculado
          max={priceRange[1]} // Utiliza el valor máximo calculado
          defaultValue={priceRange} // Establece el valor inicial
          onChange={handlePriceRangeChange} // Maneja los cambios en el rango de precios
        />
        <span>Price: {priceRange[0]} - {priceRange[1]}</span>
      </div>
      <div className="category-list">
        <h3>Categories</h3>
        {categories ? (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <label className="category-label">
                {category.name}
                <input
                  type="checkbox"
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
                          type="checkbox"
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
