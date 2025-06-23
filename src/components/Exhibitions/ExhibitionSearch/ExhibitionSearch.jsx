import React, { useState, useEffect, useCallback } from "react";
import styles from "./ExhibitionSearch.module.css";

const ExhibitionSearch = ({ searchTerm, onSearchChange }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "");

  // Debounce функція для оптимізації запитів
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // Дебаунсована функція для зміни пошукового терміну
  const debouncedSearchChange = useCallback(
    debounce((value) => {
      onSearchChange(value);
    }, 300),
    [onSearchChange, debounce]
  );

  // Обробник зміни значення в полі пошуку
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    debouncedSearchChange(value);
  };

  // Функція для очищення пошуку
  const handleClearSearch = () => {
    setLocalSearchTerm("");
    onSearchChange("");
  };

  // Синхронізація з зовнішнім searchTerm
  useEffect(() => {
    setLocalSearchTerm(searchTerm || "");
  }, [searchTerm]);

  return (
    <div className={styles.searchContainer}>
      <h3 className={styles.componentTitle}>Пошук виставок</h3>

      <div className={styles.searchPanel}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            placeholder="🔎 Введіть назву або опис виставки..."
            value={localSearchTerm}
            onChange={handleInputChange}
            className={styles.searchInput}
          />

          {localSearchTerm && (
            <button
              onClick={handleClearSearch}
              className={styles.clearButton}
              type="button"
              aria-label="Очистити пошук"
            ></button>
          )}
        </div>

        {localSearchTerm && (
          <div className={styles.searchInfo}>
            Пошук за запитом: "{localSearchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionSearch;
