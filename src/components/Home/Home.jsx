import React from 'react';
import style from "./Home.module.css";
import Filters from '../Filters/Filters'; 

const Home = () => {
  return (
    <div className={style.master}>
      <div className={style.leftPanel}>
        <Filters /> 
      </div>
      <div className={style.content}>
        <div>Home</div>
      </div>
    </div>
  )
}

export default Home;
