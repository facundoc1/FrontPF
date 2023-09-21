/* import React from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ itemsPerPage, totalItems, currentPage, onPageChange }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pageNumbers}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={number === currentPage ? styles.active : styles.page}
            onClick={() => onPageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
}
 */