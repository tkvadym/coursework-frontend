import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import exhibitionService from "../services/exhibitionService";
import ExhibitionDetails from "../components/Exhibition/ExhibitionDetails";
import Gallery from "../components/Exhibition/Gallery";
import ExhibitionStatus from "../components/Exhibition/ExhibitionStatus";
import LoadingSpinner from "../components/LoadingSpinner";
import styles from "./ExhibitionPage.module.css";

const ExhibitionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exhibition, setExhibition] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibition = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`Завантаження виставки з ID: ${id}`);
        const response = await exhibitionService.getExhibitionById(id, true);

        setExhibition(response.data);
        setArtworks(response.data.artworks || []);

        console.log("Виставка успішно завантажена:", response.data.title);
      } catch (err) {
        console.error("Помилка при завантаженні виставки:", err);
        setError("Не вдалося завантажити інформацію про виставку");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExhibition();
    }
  }, [id]);

  const handleBackToList = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner message="Завантаження інформації про виставку..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Помилка</h2>
          <p>{error}</p>
          <button onClick={handleBackToList} className={styles.backButton}>
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  if (!exhibition) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>
          <h2>Виставку не знайдено</h2>
          <p>Виставка з таким ID не існує або була видалена</p>
          <button onClick={handleBackToList} className={styles.backButton}>
            Повернутися до списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Кнопка повернення */}
      <div className={styles.navigation}>
        <button onClick={handleBackToList} className={styles.backButton}>
          ← Назад до списку
        </button>
      </div>

      {/* Основне зображення виставки */}
      <div className={styles.heroSection}>
        {exhibition.image ? (
          <img
            src={exhibition.image}
            alt={exhibition.title}
            className={styles.heroImage}
          />
        ) : (
          <div className={styles.heroPlaceholder}>
            <span>Зображення виставки</span>
          </div>
        )}

        {/* Статус виставки поверх зображення */}
        <div className={styles.statusOverlay}>
          <ExhibitionStatus exhibition={exhibition} />
        </div>
      </div>

      {/* Основний контент */}
      <div className={styles.content}>
        {/* Детальна інформація про виставку */}
        <ExhibitionDetails exhibition={exhibition} />

        {/* Галерея картин */}
        {artworks && artworks.length > 0 && (
          <div className={styles.gallerySection}>
            <h2 className={styles.sectionTitle}>Галерея картин</h2>
            <Gallery artworks={artworks} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExhibitionPage;
