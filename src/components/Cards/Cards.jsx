import React, { useState } from 'react';
import CardProduct from './CardProduct';
import styles from './Cards.module.css';
import { useSelector } from 'react-redux';

function ProductList() {
  const filteredProducts = useSelector((state) => state.products.filteredProducts);
  const allProducts = useSelector((state) => state.products.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const productsToDisplay = filteredProducts && filteredProducts.length ? filteredProducts : allProducts && allProducts.length ? allProducts : [];

  if (productsToDisplay.length === 0) {
    return <p>No products to display.</p>;
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productsToDisplay.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsToDisplay.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={styles.productList}>
        {currentProducts.map((product) => (
          <CardProduct key={product.id} product={product} />

        ))
      ) : (
        <p>No hay productos disponibles :</p>
      )}

        ))}
      </div>

      <div className={styles.pagination}>
        <ul>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={currentPage === number ? styles.active : ''}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default ProductList;

