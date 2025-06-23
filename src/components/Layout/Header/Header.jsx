import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Перехід на головну сторінку
    navigate("/");
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          onClick={handleLogoClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogoClick();
            }
          }}
        >
          <h1 className={styles.logoText}>🎨 Художні виставки України</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
