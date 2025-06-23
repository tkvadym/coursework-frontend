import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = ({
  message = "Завантаження...",
  size = "medium",
  className = "",
}) => {
  return (
    <div className={`${styles.loadingContainer} ${className}`}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      <p className={styles.loadingText}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
