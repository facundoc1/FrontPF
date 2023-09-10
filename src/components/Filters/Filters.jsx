import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosCategories, setFilterCategory } from '../../Redux/actions/actions';
import './Filters.module.css'; // Importa el archivo de estilos CSS

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const filterCategory = useSelector((state) => state.categories.filterCategory);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    dispatch(setFilterCategory(selectedCategory));
  };

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  return (
    <div className="filters-container">
      <div className="category-list">
        <h3>Categorías</h3>
        {categories ? (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <label className="category-label">
                {category.name}
              </label>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                name={`category-${category.id}`}
                value={category.id}
                checked={filterCategory === category.id}
                onChange={handleCategoryChange}
                className="category-checkbox"
              />
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

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  const renderSubcategories = (subcategories) => {
    if (!subcategories || subcategories.length === 0) {
      return null;
    }

    return (
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>List of Categories</h3>
      {categories && categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              {renderSubcategories(category.subcategories)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay categorías disponibles.</p>
      )}
    </div>
  );
};
