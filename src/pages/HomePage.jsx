import React, { useState, useEffect } from "react";
import ExhibitionList from "../components/Exhibitions/ExhibitionList";
import ExhibitionFilters from "../components/Exhibitions/ExhibitionFilters";
import ExhibitionSearch from "../components/Exhibitions/ExhibitionSearch";
import Pagination from "../components/Pagination";
import exhibitionService from "../services/exhibitionService";
import styles from "./HomePage.module.css";

const HomePage = () => {
  // Стан для даних виставок
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Стан для пошуку
  const [searchTerm, setSearchTerm] = useState("");

  // Стан для фільтрів
  const [filters, setFilters] = useState({
    category: "",
    status: "",
  });

  // Стан для сортування
  const [sortBy, setSortBy] = useState("date-desc");

  // Стан для пагінації
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Опції для фільтрів
  const categoryOptions = [
    { value: "Живопис", label: "Живопис" },
    { value: "Скульптура", label: "Скульптура" },
    { value: "Фотографія", label: "Фотографія" },
    { value: "Сучасне мистецтво", label: "Сучасне мистецтво" },
    { value: "Класичне мистецтво", label: "Класичне мистецтво" },
    { value: "Графіка", label: "Графіка" },
    { value: "Інсталяція", label: "Інсталяція" },
    { value: "Мультимедіа", label: "Мультимедіа" },
    { value: "Народне мистецтво", label: "Народне мистецтво" },
    { value: "Декоративне мистецтво", label: "Декоративне мистецтво" },
  ];

  const statusOptions = [
    { value: "active", label: "Активна" },
    { value: "past", label: "Завершена" },
    { value: "upcoming", label: "Майбутня" },
  ];

  // Функція для завантаження виставок з API
  const loadExhibitions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Підготовка параметрів для API
      const params = {
        page: currentPage,
        limit: itemsPerPage,
      };

      // Додавання фільтрів якщо вони встановлені
      if (filters.category) {
        params.category = filters.category;
      }
      if (filters.status) {
        params.status = filters.status;
      }
      if (searchTerm.trim()) {
        params.search = searchTerm.trim();
      }

      // Обробка сортування
      if (sortBy) {
        const [field, order] = sortBy.split("-");
        if (field === "date") {
          params.sortBy = "startDate";
        } else if (field === "name") {
          params.sortBy = "title";
        } else {
          params.sortBy = field;
        }
        params.sortOrder = order === "desc" ? "DESC" : "ASC";
      }

      console.log("Завантаження виставок з параметрами:", params);

      const response = await exhibitionService.getExhibitions(params);
      console.log("Отримані дані виставок:", response);

      setExhibitions(response.data || []);
      setTotalItems(response.pagination?.totalItems || 0);
      setTotalPages(response.pagination?.totalPages || 1);

      console.log(`Завантажено ${response.data?.length || 0} виставок`);
    } catch (err) {
      console.error("Помилка при завантаженні виставок:", err);
      setError("Не вдалося завантажити виставки. Спробуйте пізніше.");
      setExhibitions([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Завантаження виставок при зміні параметрів
  useEffect(() => {
    loadExhibitions();
  }, [currentPage, filters, searchTerm, sortBy]);

  // Скидання сторінки при зміні фільтрів або пошуку
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [filters, searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Найбільші художні виставки України</h1>
          <p className={styles.subtitle}>
            Відкрийте для себе найкращі мистецькі події нашої країни
          </p>
        </header>

        <div className={styles.controlsSection}>
          <ExhibitionSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <ExhibitionFilters
            filters={filters}
            onFiltersChange={setFilters}
            categories={categoryOptions}
            statuses={statusOptions}
          />
        </div>

        <main className={styles.mainContent}>
          {error && (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={loadExhibitions} className={styles.retryButton}>
                Спробувати знову
              </button>
            </div>
          )}

          <ExhibitionList
            exhibitions={exhibitions}
            sortBy={sortBy}
            onSortChange={setSortBy}
            loading={loading}
          />

          {!loading && !error && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;
