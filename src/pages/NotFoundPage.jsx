import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Сторінка не знайдена</h1>
        <p className={styles.message}>
          Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена.
        </p>
        <p className={styles.suggestion}>
          Можливо, ви ввели неправильну адресу або перейшли за застарілим
          посиланням.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.homeButton}>
            Повернутися на головну
          </Link>
          <button
            onClick={() => window.history.back()}
            className={styles.backButton}
          >
            Назад
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
