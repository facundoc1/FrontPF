import React from 'react';
import { Link } from 'react-router-dom';

function CardProduct({ product }) {
  const cloudinaryImageUrl = product.cloudinaryImageUrl;
  return (
    <div className="product-card">
      <img src={cloudinaryImageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p className="price">${product.price}</p>
      <Link to={`/product/${product.id}`}>Ver detalles</Link> 
    </div>
  );
}

export default CardProduct;
