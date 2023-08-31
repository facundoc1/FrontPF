import React from 'react';
import {Link} from"react-router-dom";
import style from "./NavBar.module.css"
import ModelCart from '../Cart/ModelCart';
import Login from '../Login/Login';
import SearchBar from "../SearchBar/SearchBar";
import avatar from "../Assets";
import cart from "../Assets";


const NavBar = () => {
  return (
    <div className={style.nav}>
        <Link to='/home'>RGTech</Link>
    <div className={style.botones}>
        <Link to="/addProduct">Add Product</Link>
        <Link to="/Contact">Contact</Link>
        <Link to="/Sale">Sale</Link>
    <div className={style.cart}>
        <img src={cart} alt='carrito' onClick={ModelCart}/>
    <div className={style.login}>
        <img src={avatar} alt='avatar' onClick={Login}/>
    <div>
        <SearchBar onSearch={onSearch} />
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default NavBar