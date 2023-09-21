import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosProducts } from '../../Redux/actions/actions'; // Asegúrate de importar la acción adecuada
import ProductList from '../Cards/Cards'; // Asegúrate de importar el componente ProductList
import Filters from '../Filters/Filters'; // Asegúrate de importar el componente Filters
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  // Estado para la página actual y la cantidad de productos por página
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Cambia esto según la cantidad de productos por página que desees

  useEffect(() => {
    // Realizar la solicitud para obtener productos cuando el componente se monta
    dispatch(axiosProducts());
  }, [dispatch]);

  // Lógica para calcular el índice de inicio y final de los productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar la página actual
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={style.master}>
      <div className={style.leftPanel}>
        {/* Renderiza el componente Filters en la izquierda */}
        <Filters />
      </div>
      <div className={style.content}>
        <h2>Products</h2>

        {/* Mostrar la lista de productos utilizando el componente ProductList */}
        <ProductList products={currentProducts} />

        {/* Agregar la paginación */}
        <div className="pagination">
          <ul>
            {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
              <li key={index} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
