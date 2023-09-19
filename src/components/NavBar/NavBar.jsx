import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import {Link} from "react-router-dom";
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import avatar from "../Assets/avatar.png";
import cart from "../Assets/cart.svg";
import ModelCart from '../Cart/ModelCart';



const NavBar = ({ onSearch }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const { userId } = useParams();
    const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

    const toggleModal = () => {
      setModalOpen(!isModalOpen);
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
            <Link to='/' style={{ font: '28px Poppins, sans-serif' }}>GRTECH</Link>
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
        <div className={style.cart} onClick={toggleModal}>
          <img src={cart} alt="carrito" />
    </div>
      <div className={style.login}>
      <Link to={isAuthenticated ? `/userProfile/${userId}` : "/Login"} className={style.login}>
      <img src={avatar} alt='avatar' />
      </Link>
     </div>
    </div>
    {isModalOpen && (
        <div className={style.modal}>
         <ModelCart />
        </div>
      )}
    </div>
  )
}

export default NavBar