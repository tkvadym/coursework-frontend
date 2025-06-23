/**
 * Сервіс для роботи з виставками
 */

import apiClient from "./api.js";

/**
 * Сервіс для роботи з виставками
 */
class ExhibitionService {
  /**
   * Отримати список виставок з фільтрацією та пагінацією
   * @param {Object} params - параметри запиту
   * @param {number} params.page - номер сторінки
   * @param {number} params.limit - кількість елементів на сторінку
   * @param {string} params.category - категорія виставки
   * @param {string} params.search - пошук за назвою/описом
   * @param {string} params.organizer - організатор
   * @param {string} params.status - статус (active | upcoming | past)
   * @param {string} params.sortBy - поле сортування
   * @param {string} params.sortOrder - порядок сортування (ASC | DESC)
   * @returns {Promise<Object>} - список виставок з пагінацією
   */
  async getExhibitions(params = {}) {
    try {
      console.log("Отримання списку виставок з параметрами:", params);

      const response = await apiClient.get("/exhibitions", params);

      console.log(`Отримано ${response.data.length} виставок`);
      return response;
    } catch (error) {
      console.error("Помилка при отриманні списку виставок:", error.message);
      throw error;
    }
  }

  /**
   * Отримати конкретну виставку за ID
   * @param {number} id - ID виставки
   * @param {boolean} includeArtworks - включити картини галереї
   * @returns {Promise<Object>} - дані виставки
   */
  async getExhibitionById(id, includeArtworks = true) {
    try {
      console.log(`Отримання виставки з ID: ${id}`);

      const params = {};
      if (includeArtworks) {
        params.includeArtworks = true;
      } else {
        params.includeArtworks = false;
      }

      const response = await apiClient.get(`/exhibitions/${id}`, params);

      console.log(`Отримано виставку: ${response.data.title}`);
      return response;
    } catch (error) {
      console.error(
        `Помилка при отриманні виставки з ID ${id}:`,
        error.message
      );
      throw error;
    }
  }
}

// Створюємо єдиний екземпляр сервісу
const exhibitionService = new ExhibitionService();

export default exhibitionService;
