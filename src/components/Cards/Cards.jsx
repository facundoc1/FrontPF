import React from 'react';
import CardProduct from './CardProduct';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';

function ProductList() {
  const allProducts = useSelector((state) => state.products.products);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);


  const hasFilteredProducts = filteredProducts.length > 0;

  return (
    <div className={styles.productList}>
      {hasFilteredProducts ? (
        filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))
      ) : (
        <p>No hay productos disponibles ):</p>
      )}
    </div>
  );
}

export default ProductList;

