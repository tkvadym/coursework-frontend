import React, { useState, useEffect } from "react";
import styles from "./Gallery.module.css";

const Gallery = ({ artworks }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Автоматичне перемикання слайдів
  useEffect(() => {
    if (!isAutoPlay || !artworks || artworks.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === artworks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Перемикання кожні 5 секунд

    return () => clearInterval(interval);
  }, [isAutoPlay, artworks]);

  // Перехід до попереднього слайду
  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? artworks.length - 1 : currentIndex - 1
    );
  };

  // Перехід до наступного слайду
  const goToNext = () => {
    setCurrentIndex(
      currentIndex === artworks.length - 1 ? 0 : currentIndex + 1
    );
  };

  // Перехід до конкретного слайду
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Обробка клавіш клавіатури
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      } else if (event.key === " ") {
        event.preventDefault();
        setIsAutoPlay(!isAutoPlay);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex, isAutoPlay]);

  if (!artworks || artworks.length === 0) {
    return (
      <div className={styles.emptyGallery}>
        <div className={styles.emptyIcon}>🖼️</div>
        <p className={styles.emptyText}>Галерея картин поки що порожня</p>
      </div>
    );
  }

  const currentArtwork = artworks[currentIndex];

  return (
    <div className={styles.gallery}>
      {/* Основний слайдер */}
      <div className={styles.slider}>
        {/* Кнопка попереднього слайду */}
        {artworks.length > 1 && (
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Попередня картина"
          >
            ‹
          </button>
        )}

        {/* Контейнер зображення */}
        <div className={styles.imageContainer}>
          <img
            src={currentArtwork.imageUrl}
            alt={currentArtwork.title}
            className={styles.image}
            loading="lazy"
          />

          {/* Інформація про картину поверх зображення */}
          <div className={styles.imageOverlay}>
            <div className={styles.artworkInfo}>
              <h3 className={styles.artworkTitle}>{currentArtwork.title}</h3>
              <p className={styles.artworkArtist}>{currentArtwork.artist}</p>
            </div>
          </div>
        </div>

        {/* Кнопка наступного слайду */}
        {artworks.length > 1 && (
          <button
            className={`${styles.navButton} ${styles.nextButton}`}
            onClick={goToNext}
            aria-label="Наступна картина"
          >
            ›
          </button>
        )}
      </div>

      {/* Інформація про поточну картину */}
      <div className={styles.artworkDetails}>
        <div className={styles.artworkHeader}>
          <h3 className={styles.detailTitle}>{currentArtwork.title}</h3>
          <p className={styles.detailArtist}>Автор: {currentArtwork.artist}</p>
        </div>

        {currentArtwork.description && (
          <p className={styles.artworkDescription}>
            {currentArtwork.description}
          </p>
        )}
      </div>

      {/* Індикатори слайдів */}
      {artworks.length > 1 && (
        <div className={styles.indicators}>
          {artworks.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === currentIndex ? styles.indicatorActive : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти до картини ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
