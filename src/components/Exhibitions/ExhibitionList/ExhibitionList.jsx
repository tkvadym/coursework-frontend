import React from "react";
import ExhibitionCard from "../ExhibitionCard";
import LoadingSpinner from "../../LoadingSpinner";
import styles from "./ExhibitionList.module.css";

const ExhibitionList = ({
  exhibitions = [],
  sortBy = "date-desc",
  onSortChange,
  loading = false,
  error = null,
}) => {
  // Обробка стану завантаження
  if (loading) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3 className={styles.componentTitle}>Список виставок</h3>
        </div>
        <LoadingSpinner message="Завантаження виставок..." />
      </div>
    );
  }

  // Обробка помилок
  if (error) {
    return (
      <div className={styles.listContainer}>
        <div className={styles.listHeader}>
          <h3 className={styles.componentTitle}>Список виставок</h3>
        </div>
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>⚠️</div>
          <h4 className={styles.errorTitle}>Помилка завантаження</h4>
          <p className={styles.errorMessage}>{error}</p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Спробувати знову
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.listHeader}>
        <h3 className={styles.componentTitle}>Список виставок</h3>
        <div className={styles.sortContainer}>
          <label className={styles.sortLabel}>Сортування:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange && onSortChange(e.target.value)}
            className={styles.sortSelect}
            disabled={loading}
          >
            <option value="date-desc">За датою (нові спочатку)</option>
            <option value="date-asc">За датою (старі спочатку)</option>
            <option value="name-asc">За назвою (А-Я)</option>
            <option value="name-desc">За назвою (Я-А)</option>
          </select>
        </div>
      </div>

      {/* Відображення кількості виставок */}
      {!loading && !error && (
        <div className={styles.resultsInfo}>
          Знайдено виставок: {exhibitions.length}
        </div>
      )}

      {/* Відображення виставок або повідомлення про відсутність */}
      {!loading && !error && exhibitions.length === 0 ? (
        <div className={styles.emptyContainer}>
          <div className={styles.emptyIcon}>🎨</div>
          <h4 className={styles.emptyTitle}>Виставки не знайдені</h4>
          <p className={styles.emptyMessage}>
            На жаль, за вашими критеріями пошуку виставки не знайдені. Спробуйте
            змінити фільтри або пошуковий запит.
          </p>
        </div>
      ) : !loading && !error ? (
        <div className={styles.exhibitionGrid}>
          {exhibitions.map((exhibition) => (
            <ExhibitionCard
              key={exhibition.id}
              id={exhibition.id}
              title={exhibition.title}
              description={exhibition.description}
              startDate={exhibition.startDate}
              endDate={exhibition.endDate}
              category={exhibition.category}
              image={exhibition.image}
              organizer={exhibition.organizer}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ExhibitionList;
