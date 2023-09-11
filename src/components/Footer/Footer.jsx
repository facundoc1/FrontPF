import React from 'react';
import style from "./Footer.module.css";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import IgLogo from  "../Assets/IgLogo.svg";
import Logo from "../Assets/Logo.png";

const Footer = () => {
  return (
    <div className={style.master}>
    <div className={style.footer}>
        <div className={style.GRTech}>
          <h3>GRTech:</h3>
          <p>Thank you for choosing GRTech. Stay up to date with our latest products and promotions by following us on social media.</p>
          <div className={style.media}>
            <a href="https://www.instagram.com/GRTech/" target="_blank" rel="noopener noreferrer">
              <img src={IgLogo} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className={style.About}>
          <h3>About:</h3>
          <div className={style.buttonContainer}>
          <button className={style.Home}>
            <Link to="/">Home</Link>
        </button>
            
            <button className={style.Contact}>
            <Link to="/Contact">Contact</Link>
        </button>
        </div>
        </div>
        <div className={style.copyright}>
        <Link to="/"><img src={Logo} alt="logo" /></Link> © 2023 GRTech, Inc.
      </div>
        </div>
      </div>
  )
}

export default Footer