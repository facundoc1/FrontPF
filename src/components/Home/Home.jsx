import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosProducts } from '../../Redux/actions/actions';
import ProductList from '../Cards/Cards';
import Filters from '../Filters/Filters';
import style from './Home.module.css';

function Home() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(axiosProducts());
  }, [dispatch]);

  return (
    <div className={style.master}>
      <div className={style.leftPanel}>
        <Filters />
      </div>
      <div className={style.content}>
        <h2>Productos</h2>        
        <div className={style.centerContent}>
      <div className={style.cardContainer}>
          <ProductList />
        </div>
        </div>
        
      </div>
    </div>
  );
}

export default Home;
