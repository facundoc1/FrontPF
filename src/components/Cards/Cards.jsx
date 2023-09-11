import React from 'react';
import CardProduct from './CardProduct';
import styles from './Cards.module.css'; // Asegúrate de importar tu archivo de módulo CSS

function ProductList({ products }) {
    return (
      <div className={styles.productList}>
        {products.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
    );
  }
  
  export default ProductList;
