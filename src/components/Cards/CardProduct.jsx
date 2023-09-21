import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CardProduct.module.css'; 

function CardProduct({ product }) {
  return (
    <div className={styles['product-card']}>
      {product.images && (
        <img src={product.images} alt={product.title} />
      )}
      <h3>{product.title}</h3>
      <p>{product.summary}</p>
      <p className={styles.price}>${product.price.toFixed(2)}</p>
      <div className={styles.categories}>
        <strong>Categorías:</strong>
        {product.Categories.map((category) => (
          <span key={category.id}>{category.name}</span>
        ))}
      </div>
      <div className={styles.subcategories}>
        <strong>Subcategorías:</strong>
        {product.Subcategories.map((subcategory) => (
          <span key={subcategory.id}>{subcategory.name}</span>
        ))}
      </div>
      <Link to={`/product/${product.id}`} className={styles['btn-details']}>
        Ver detalles
      </Link>
    </div>
  );
}

export default CardProduct;
