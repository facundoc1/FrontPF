import React, {useState} from 'react';
import {Link} from "react-router-dom";
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import avatar from "../Assets/avatar.png";
import cart from "../Assets/cart.svg";



const NavBar = ({ onSearch }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };

      const addToCart = (item) => {
        setCartItems([...cartItems, item]);
      };

   
  return (
    <div className={style.nav}>
        <div className={style.logo}>
            <Link to='/' style={{ fontSize: '24px' }}>GRTECH</Link>
        </div>
    <div className={style.buttonSale}>
        <button className={style.sale}>
            <Link to="/Sale">Sale</Link>
        </button>
    </div>
    <div className={style.searchBar}>
            <SearchBar onSearch={onSearch} />
    </div>
    <div className={style.button}>
        <button className={style.AddProduct}>
            <Link to="/addProduct">Add Product</Link>
        </button>
        </div>
        <div className={style.button}>
        <button className={style.Contact}>
            <Link to="/Contact">Contact</Link>
        </button>
    </div>
    <div className={style.icons}>
        <div className={style.cart} onClick={openModal}>
          <img src={cart} alt="carrito" />
    </div>
        <div className={style.login}>
            <Link to="/Login">
                <img src={avatar} alt='avatar' />
            </Link>
    </div>
    </div>
    {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Shopping Cart</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>{item.name}</li>
              ))}
            </ul>
            <button onClick={closeModal}>Close Cart</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar