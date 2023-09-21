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

               
          <ProductList />
        </div>
</div>
    
  );
}

export default Home;
