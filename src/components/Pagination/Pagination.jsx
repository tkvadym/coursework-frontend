import React from "react";
import usePagination from "../../hooks/usePagination";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
}) => {
  const {
    visiblePages,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToPage,
  } = usePagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisiblePages: 5,
  });

  // Якщо немає сторінок для відображення
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationContainer}>
      <h3 className={styles.componentTitle}>Пагінація</h3>

      <div className={styles.pagination}>
        <button
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className={`${styles.paginationButton} ${
            !canGoPrevious ? styles.disabled : ""
          }`}
        >
          Попередня
        </button>

        <div className={styles.pageNumbers}>
          {visiblePages.map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.pageButtonActive : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={!canGoNext}
          className={`${styles.paginationButton} ${
            !canGoNext ? styles.disabled : ""
          }`}
        >
          Наступна
        </button>
      </div>

      <div className={styles.paginationInfo}>
        Сторінка {currentPage} з {totalPages}
        {totalItems > 0 && (
          <span className={styles.itemsInfo}>({totalItems} елементів)</span>
        )}
      </div>
    </div>
  );
};

export default Pagination;
