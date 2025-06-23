import { useMemo } from "react";

/**
 * Хук для керування пагінацією
 * @param {Object} params - Параметри пагінації
 * @param {number} params.currentPage - Поточна сторінка
 * @param {number} params.totalPages - Загальна кількість сторінок
 * @param {Function} params.onPageChange - Функція зміни сторінки
 * @param {number} params.maxVisiblePages - Максимальна кількість видимих сторінок
 * @returns {Object} Об'єкт з методами та станом пагінації
 */
const usePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  // Обчислюємо видимі сторінки
  const visiblePages = useMemo(() => {
    if (totalPages <= maxVisiblePages) {
      // Якщо загальна кількість сторінок менша за максимальну видиму кількість
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Коригуємо початкову сторінку, якщо кінцева досягла максимуму
    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, maxVisiblePages]);

  // Перевіряємо, чи можна йти на попередню сторінку
  const canGoPrevious = currentPage > 1;

  // Перевіряємо, чи можна йти на наступну сторінку
  const canGoNext = currentPage < totalPages;

  // Функція переходу на попередню сторінку
  const goToPrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  // Функція переходу на наступну сторінку
  const goToNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  // Функція переходу на конкретну сторінку
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return {
    visiblePages,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToPage,
  };
};

export default usePagination;
