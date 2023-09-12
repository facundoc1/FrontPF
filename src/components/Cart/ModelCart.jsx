import React from 'react';
import style from "./Cart.module.css";
import { useState } from 'react';

const ModelCart = ({ items, onClose }) => {
  const cartItems = items; 
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  if (!items || items.length === 0) {
    return <div>
        No items in the cart.
      </div>
  }


  return (
    <div className={style.modal}>
      <div className={style.modalContent}>
        <h2>Shopping Cart</h2>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
          <div className={style.products}>
            <h1>placa de video</h1>
            <button id="delete-button">Eliminar</button>
          </div>
        </ul>
        <div className={style.buttonsCart}>
          <button className={style.buy}>Buy</button>
          </div>
        <button className={style.close} onClick={closeModal}>Close</button> 
      </div>
        </div>

  );
}

export default ModelCart;





