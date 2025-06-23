import React from "react";
import styles from "./ExhibitionFilters.module.css";

const ExhibitionFilters = ({
  filters,
  onFiltersChange,
  categories = [],
  statuses = [],
}) => {
  // Функція для очищення всіх фільтрів
  const handleClearFilters = () => {
    onFiltersChange({
      category: "",
      status: "",
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <h3 className={styles.componentTitle}>Фільтри</h3>

      <div className={styles.filtersPanel}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Категорія:</label>
          <select
            value={filters.category}
            onChange={(e) =>
              onFiltersChange({ ...filters, category: e.target.value })
            }
            className={styles.filterSelect}
          >
            <option value="">Всі категорії</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Статус:</label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value })
            }
            className={styles.filterSelect}
          >
            <option value="">Всі статуси</option>
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleClearFilters}
        className={styles.clearButton}
        type="button"
      >
        Очистити фільтри
      </button>
    </div>
  );
};

export default ExhibitionFilters;
