// import React from 'react';
// import style from "./Cart.module.css";
// import { useState, useEffect } from 'react';
// import {useSelector} from "react-redux"; 

// const ModelCart = ({ items, onClose }) => {
//   const cartItems = items; 
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [setQuantity] = useState();
//   const name = useSelector((state) => state.name);
// 	const quantity = useSelector((state) => state.quantity);
// 	const price = useSelector((state) => state.price);
// 	const image = useSelector((state) => state.image);

//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     }
//   }, []);

//   const totalPrice = useSelector((state)=> (cartItems?.reduce(((acc, item)=>{
//     return acc + Number(item[1]) *Number(item[2]);}),0).toFixed())
//     );

//     const increaseQuantity = () => {
//       setQuantity(quantity + 1);
    
//       const updateCart = [...cartItems];
//       updateCart[index].quantity = quantity + 1;
//       localStorage.setItem("cart", JSON.stringify(updateCart));
//     };
  
//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
  
//   const calculateTotalPrice = () => {
//     return price * quantity;
//   };
  


//   const openModal = () => {
//     setModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalOpen(false);
//   };
//   if (!items || items.length === 0) {
//     return <div>
//         No items in the cart.
//       </div>
//   }


//   return (
//     <div className={style.modal}>
//       <div className={style.modalContent}>
//         <h2>Shopping Cart</h2>
//         <ul>
//           {cartItems.map((item, index) => (
//             <li key={index}>{item.name}</li>
//           ))}
//           <div className={style.products}>
//             Product:{name},
//             {image},
//             Price: ${price},
//             Quantity: {quantity},
//             <button onClick={increaseQuantity}>+</button><br />
//             <button onClick={decreaseQuantity}>-</button>
//             <hr />
//             <p>{totalPrice(price)}</p>


//             <button id="delete-button">Eliminar</button>
//           </div>
//         </ul>
//         <div className={style.buttonsCart}>
//           <button className={style.buy}>Buy</button>
//           </div>
//         <button className={style.close} onClick={closeModal}>Close</button> 
//       </div>
//         </div>

//   );
// }

// export default ModelCart;

import React, { useState, useEffect } from 'react';
import style from "./Cart.module.css";
import { useSelector } from "react-redux"; 

const ModelCart = ({ items, onClose }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const name = useSelector((state) => state.name);
  const quantity = useSelector((state) => state.quantity);
  const price = useSelector((state) => state.price);
  const image = useSelector((state) => state.image);

  const [cartItems, setCartItems] = useState(items);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = cartItems?.reduce((acc, item) => {
    const itemPrice = Number(item.price); // Asegura que sea un número
    const itemQuantity = Number(item.quantity); // Asegura que sea un número
    return acc + itemPrice * itemQuantity;
  }, 0).toFixed(2); // Redondea el total a 2 decimales

  const increaseQuantity = () => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === name) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = () => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === name && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!cartItems || cartItems.length === 0) {
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
          {cartItems.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
          <div className={style.products}>
            Product: {name},
            {image},
            Price: ${price},
            Quantity: {quantity},
            <button onClick={increaseQuantity}>+</button><br />
            <button onClick={decreaseQuantity}>-</button>
            <hr />
            <p>Total Price: ${totalPrice}</p>
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




