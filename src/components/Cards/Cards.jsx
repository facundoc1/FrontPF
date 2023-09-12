import React from 'react';
import CardProduct from './CardProduct';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';

function ProductList() {
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const allProducts = useSelector((state) => state.products.products);

  // Verifica si hay productos filtrados; si no, muestra todos los productos
  const productsToDisplay = filteredProducts.length ? filteredProducts : allProducts;

  return (
    <div className={styles.productList}>
      {productsToDisplay.map((product) => (
        <CardProduct key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
