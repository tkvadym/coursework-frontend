/**
 * Базовий API клієнт для роботи з бекендом
 */

const API_BASE_URL = "https://coursework-backend-production.up.railway.app/api";

/**
 * Клас для роботи з API
 */
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Виконує HTTP запит
   * @param {string} endpoint - ендпоінт API
   * @param {Object} options - опції запиту
   * @returns {Promise<Object>} - відповідь від сервера
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`API запит: ${config.method || "GET"} ${url}`);

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP помилка! статус: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Помилка API");
      }

      console.log("API відповідь отримана успішно");
      return data;
    } catch (error) {
      console.error("Помилка API запиту:", error.message);
      throw error;
    }
  }

  /**
   * GET запит
   * @param {string} endpoint - ендпоінт API
   * @param {Object} params - параметри запиту
   * @returns {Promise<Object>} - відповідь від сервера
   */
  async get(endpoint, params = {}) {
    const searchParams = new URLSearchParams();

    // Додаємо параметри до URL
    Object.keys(params).forEach((key) => {
      if (
        params[key] !== undefined &&
        params[key] !== null &&
        params[key] !== ""
      ) {
        searchParams.append(key, params[key]);
      }
    });

    const queryString = searchParams.toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;

    return this.request(fullEndpoint, {
      method: "GET",
    });
  }

  /**
   * POST запит
   * @param {string} endpoint - ендпоінт API
   * @param {Object} data - дані для відправки
   * @returns {Promise<Object>} - відповідь від сервера
   */
  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT запит
   * @param {string} endpoint - ендпоінт API
   * @param {Object} data - дані для відправки
   * @returns {Promise<Object>} - відповідь від сервера
   */
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE запит
   * @param {string} endpoint - ендпоінт API
   * @returns {Promise<Object>} - відповідь від сервера
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

// Створюємо єдиний екземпляр API клієнта
const apiClient = new ApiClient();

export default apiClient;
