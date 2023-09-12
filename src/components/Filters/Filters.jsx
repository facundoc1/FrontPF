import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosCategories, setFilterCategory } from '../../Redux/actions/actions';
import './Filters.module.css'; // Importa el archivo de estilos CSS

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

    // Si la categoría seleccionada coincide con la categoría actualmente seleccionada, la deseleccionamos
    if (selectedCategory === category.id) {
      setSelectedCategory(null);
    } else {
      // De lo contrario, establecemos la categoría seleccionada en el estado local
      setSelectedCategory(category.id);
    }
  };

  return (
    <div className="filters-container">
      <div className="category-list">
        <h3>Categories</h3>
        {categories ? (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <label className="category-label">
                {category.name} {/* Mover el texto de la categoría aquí */}
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
              {/* Mostrar subcategorías solo si la categoría coincide con la categoría seleccionada */}
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




