import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosCategories, setFilterCategory } from '../../Redux/actions/actions';
import './Filters.module.css'; 

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const filterCategory = useSelector((state) => state.categories.filterCategory);

  // Estado local para realizar un seguimiento de la categoría actualmente seleccionada
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  const handleCategoryChange = (e, category) => {
    const selectedCategoryId = e.target.value;
    dispatch(setFilterCategory(selectedCategoryId));

    if (selectedCategory === category.id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category.id);
    }
  };

  return (
    <div className="filters-container">
      <div className="category-list">
        <h3>Categorías</h3>
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
                  checked={filterCategory === category.id}
                  onChange={(e) => handleCategoryChange(e, category)}
                  className="category-checkbox"
                />
              </label>
              {selectedCategory === category.id && category.subcategories && (
                <div className="subcategory-list">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="subcategory-item">
                      {subcategory.name}
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




