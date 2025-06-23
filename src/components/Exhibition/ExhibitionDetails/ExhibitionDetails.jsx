import React from "react";
import styles from "./ExhibitionDetails.module.css";
import {
  formatDate,
  getExhibitionDuration,
  getCategoryClass,
} from "../../../utils/exhibitionUtils";

const ExhibitionDetails = ({ exhibition }) => {
  if (!exhibition) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* Заголовок та категорія */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>{exhibition.title}</h1>
          {exhibition.category && (
            <div
              className={`${styles.category} ${
                styles[getCategoryClass(exhibition.category)]
              }`}
            >
              {exhibition.category}
            </div>
          )}
        </div>
      </div>

      {/* Основна інформація */}
      <div className={styles.mainInfo}>
        <div className={styles.infoGrid}>
          {/* Дати проведення */}
          <div className={styles.infoItem}>
            <h3 className={styles.infoLabel}>Дати проведення</h3>
            <div className={styles.infoValue}>
              <div className={styles.dateRange}>
                <span className={styles.startDate}>
                  {formatDate(exhibition.startDate)}
                </span>
                <span className={styles.dateSeparator}>—</span>
                <span className={styles.endDate}>
                  {formatDate(exhibition.endDate)}
                </span>
              </div>
              <div className={styles.duration}>
                Тривалість:{" "}
                {getExhibitionDuration(
                  exhibition.startDate,
                  exhibition.endDate
                )}
              </div>
            </div>
          </div>

          {/* Місце проведення */}
          {exhibition.location && (
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Місце проведення</h3>
              <div className={styles.infoValue}>
                <span className={styles.location}>{exhibition.location}</span>
              </div>
            </div>
          )}

          {/* Організатор */}
          {exhibition.organizer && (
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Організатор</h3>
              <div className={styles.infoValue}>
                <span className={styles.organizer}>{exhibition.organizer}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Опис */}
      <div className={styles.description}>
        <h3 className={styles.descriptionTitle}>Про виставку</h3>
        <div className={styles.descriptionContent}>
          {exhibition.detail_description ? (
            <p className={styles.detailDescription}>
              {exhibition.detail_description}
            </p>
          ) : (
            <p className={styles.shortDescription}>{exhibition.description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetails;
