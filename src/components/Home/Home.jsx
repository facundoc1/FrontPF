import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosProducts } from '../../Redux/actions/actions'; // Asegúrate de importar la acción adecuada
import ProductList from '../Cards/Cards'; // Asegúrate de importar el componente ProductList
import Filters from '../Filters/Filters'; // Asegúrate de importar el componente Filters
import style from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    // Realizar la solicitud para obtener productos cuando el componente se monta
    dispatch(axiosProducts());
  }, [dispatch]);

  return (
    <div className={style.master}>
      <div className={style.leftPanel}>
        {/* Renderiza el componente Filters en la izquierda */}
        <Filters />
      </div>
      <div className={style.content}>
        <h2>Productos</h2>
        <ProductList />
      </div>
    </div>
  );
}

export default Home;