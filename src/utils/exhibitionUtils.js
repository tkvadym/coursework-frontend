/**
 * Утиліти для роботи з виставками
 */

/**
 * Форматування дати для відображення
 * @param {string} dateString - рядок дати
 * @param {string} format - формат відображення ('short' або 'long')
 * @returns {string} відформатована дата
 */
export const formatDate = (dateString, format = "long") => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (format === "short") {
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

/**
 * Обчислення статусу виставки на основі дат
 * @param {string} startDate - дата початку
 * @param {string} endDate - дата закінчення
 * @returns {string} статус виставки
 */
export const getExhibitionStatus = (startDate, endDate) => {
  if (!startDate || !endDate) return "Невідомо";

  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Встановлюємо час на початок дня для коректного порівняння
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  if (today < start) {
    return "Майбутня";
  } else if (today >= start && today <= end) {
    return "Активна";
  } else {
    return "Завершена";
  }
};

/**
 * Обчислення тривалості виставки
 * @param {string} startDate - дата початку
 * @param {string} endDate - дата закінчення
 * @returns {string} тривалість виставки
 */
export const getExhibitionDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 день";
  if (diffDays < 5) return `${diffDays} дні`;
  return `${diffDays} днів`;
};

/**
 * Отримання додаткової інформації про статус
 * @param {string} status - статус виставки
 * @param {string} startDate - дата початку
 * @param {string} endDate - дата закінчення
 * @returns {string} додаткова інформація
 */
export const getStatusInfo = (status, startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  switch (status?.toLowerCase()) {
    case "майбутня":
      const daysUntilStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      if (daysUntilStart === 1) return "Починається завтра";
      if (daysUntilStart <= 7)
        return `Починається через ${daysUntilStart} днів`;
      return `Починається ${start.toLocaleDateString("uk-UA")}`;

    case "активна":
      const daysUntilEnd = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
      if (daysUntilEnd === 1) return "Закінчується завтра";
      if (daysUntilEnd <= 7) return `Закінчується через ${daysUntilEnd} днів`;
      return `Закінчується ${end.toLocaleDateString("uk-UA")}`;

    case "завершена":
      const daysSinceEnd = Math.ceil((today - end) / (1000 * 60 * 60 * 24));
      if (daysSinceEnd === 1) return "Закінчилася вчора";
      if (daysSinceEnd <= 30) return `Закінчилася ${daysSinceEnd} днів тому`;
      return `Закінчилася ${end.toLocaleDateString("uk-UA")}`;

    default:
      return "";
  }
};

/**
 * Отримання іконки для статусу
 * @param {string} status - статус виставки
 * @returns {string} іконка
 */
export const getStatusIcon = (status) => {
  switch (status?.toLowerCase()) {
    case "активна":
      return "🟢";
    case "майбутня":
      return "🔵";
    case "завершена":
      return "🔴";
    default:
      return "⚪";
  }
};

/**
 * Визначення CSS класу для статусу
 * @param {string} status - статус виставки
 * @returns {string} назва CSS класу
 */
export const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "активна":
      return "statusActive";
    case "завершена":
      return "statusCompleted";
    case "майбутня":
      return "statusUpcoming";
    default:
      return "statusDefault";
  }
};

/**
 * Визначення CSS класу для категорії
 * @param {string} category - категорія виставки
 * @returns {string} назва CSS класу
 */
export const getCategoryClass = (category) => {
  switch (category?.toLowerCase()) {
    case "живопис":
      return "categoryPainting";
    case "скульптура":
      return "categorySculpture";
    case "фотографія":
      return "categoryPhoto";
    case "сучасне мистецтво":
      return "categoryModern";
    case "класичне мистецтво":
      return "categoryClassic";
    case "графіка":
      return "categoryGraphics";
    case "інсталяція":
      return "categoryInstallation";
    case "мультимедіа":
      return "categoryMultimedia";
    case "народне мистецтво":
      return "categoryFolk";
    case "декоративне мистецтво":
      return "categoryDecorative";
    default:
      return "categoryDefault";
  }
};
