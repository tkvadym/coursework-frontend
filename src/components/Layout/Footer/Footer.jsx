import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.copyright}>
            <p className={styles.copyrightText}>
              © {currentYear} Художні виставки України. Всі права захищені.
            </p>
          </div>

          <div className={styles.links}>
            <NavLink
              to="/about"
              className={styles.link}
              aria-label="Перейти до сторінки про проект"
            >
              Про проект
            </NavLink>
          </div>

          <div className={styles.contact}>
            <p className={styles.contactText}>
              Контакти: info@art-exhibitions.ua
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
