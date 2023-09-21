import React, { useState, useEffect } from 'react';
import style from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { addToTempCart, removeFromTempCart, clearTempCart, updateTempCart } from '../../Redux/actions/actions_temp_cart'; 

const ModelCart = ({ items, onClose }) => {
  const tempCartItems = useSelector((state) => state.tempCart.cartItems); 
  const dispatch = useDispatch(); 

  const [isModalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const cartTemp = JSON.parse(localStorage.getItem('cartTemp')) || [];

    dispatch(updateTempCart(cartTemp)); 
  }, [dispatch]);

  const totalPrice = tempCartItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity; 
  }, 0).toFixed(2);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromTempCart(itemId)); 
  };

  const handleClearCart = () => {
    dispatch(clearTempCart());
    localStorage.removeItem('cartTemp');
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCart = tempCartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
  

    dispatch(updateTempCart(updatedCart));
  

    localStorage.setItem('cartTemp', JSON.stringify(updatedCart));
  };
  
  const handleDecreaseQuantity = (itemId) => {
    const updatedCart = tempCartItems.map((item) =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );

    dispatch(updateTempCart(updatedCart));

    localStorage.setItem('cartTemp', JSON.stringify(updatedCart));
  };
  

  if (!tempCartItems || tempCartItems.length === 0) {
    return (
      <div>
        No items in the cart.
      </div>
    );
  }

  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Shopping Cart</h2>
        <ul>
          {tempCartItems.map((item) => (
            <li key={item.id}>
              <div className={style.products}>
                Product: {item.title},
                Price: ${item.price},
                Quantity: {item.quantity}
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                <button id="delete-button" onClick={() => handleRemoveFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className={style.buttonsCart}>
        <Link to="/payment">
        <button className={style.buy}>Buy</button>
      </Link>
        </div>
        <button className={style.close} onClick={closeModal}>Close</button> 
        <button onClick={handleClearCart}>Clear Cart</button> 
      </div>
    </div>
  );
}

export default ModelCart;




