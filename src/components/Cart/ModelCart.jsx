import React from 'react'

const ModelCart = ({ items, onClose }) => {
  if (!items || items.length === 0) {
    return <div>No items in the cart.</div>;
  }
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button onClick={onClose}>Close Cart</button>
    </div>
  )
}

export default ModelCart

