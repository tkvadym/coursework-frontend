import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExhibitionCard.module.css";
import {
  formatDate,
  getExhibitionStatus,
  getStatusClass,
  getCategoryClass,
} from "../../../utils/exhibitionUtils";

const ExhibitionCard = ({
  id,
  title,
  description,
  image,
  startDate,
  endDate,
  category,
  organizer,
}) => {
  console.log(image);

  return (
    <div className={styles.card}>
      {/* Зображення виставки */}
      <div className={styles.imageContainer}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span className={styles.placeholderText}>Зображення виставки</span>
          </div>
        )}

        {/* Статус виставки */}
        <div
          className={`${styles.status} ${
            styles[getStatusClass(getExhibitionStatus(startDate, endDate))]
          }`}
        >
          {getExhibitionStatus(startDate, endDate)}
        </div>
      </div>

      {/* Контент карточки */}
      <div className={styles.content}>
        {/* Категорія */}
        {category && (
          <div
            className={`${styles.category} ${
              styles[getCategoryClass(category)]
            }`}
          >
            {category}
          </div>
        )}

        {/* Назва виставки */}
        <h3 className={styles.title}>
          <Link to={`/exhibitions/${id}`} className={styles.titleLink}>
            {title}
          </Link>
        </h3>

        {/* Опис */}
        {description && (
          <p className={styles.description}>
            {description.length > 120
              ? `${description.substring(0, 120)}...`
              : description}
          </p>
        )}

        {/* Дати проведення */}
        <div className={styles.dates}>
          <span className={styles.datesLabel}>Дати проведення:</span>
          <span className={styles.datesValue}>
            {formatDate(startDate, "short")}
            {endDate && ` - ${formatDate(endDate, "short")}`}
          </span>
        </div>

        {/* Організатор/Галерея */}
        {(organizer || galleryName) && (
          <div className={styles.organizer}>
            <span className={styles.organizerLabel}>Організатор:</span>
            <span className={styles.organizerValue}>
              {organizer || galleryName}
            </span>
          </div>
        )}

        {/* Кнопка детальної інформації */}
        <div className={styles.actions}>
          <Link to={`/exhibitions/${id}`} className={styles.detailsButton}>
            Детальніше
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionCard;
