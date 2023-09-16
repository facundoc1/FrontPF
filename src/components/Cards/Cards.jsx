import React from 'react';
import CardProduct from './CardProduct';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';
import { filterProducts } from '../../Redux/actions/actions';

function ProductList() {
  const allProducts = useSelector((state) => state.products.products);
  const filteredProducts = useSelector((state) => state.products.filteredProducts);

  const shouldShowAllProducts = filteredProducts.length === 0;
 console.log(filterProducts)
  return (
    <div className={styles.productList}>
      {shouldShowAllProducts && (
        allProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))
      )}
      {!shouldShowAllProducts && (
        filteredProducts.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))
      )}
      {allProducts.length === 0 && filteredProducts.length === 0 && (
        <p>No hay productos disponibles ):</p>
      )}
    </div>
  );
}

export default ProductList;
