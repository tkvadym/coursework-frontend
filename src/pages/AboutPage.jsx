import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Про проект</h1>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Опис проекту</h2>
          <p className={styles.text}>
            "Найбільші художні виставки України" - це веб-додаток, який надає
            інформацію про найвідоміші та найбільші художні виставки в Україні.
            Проект створений для популяризації українського мистецтва та надання
            зручного доступу до інформації про культурні події.
          </p>
          <p className={styles.text}>
            Додаток дозволяє переглядати інформацію про виставки, галереї та
            музеї, які проводять найцікавіші мистецькі заходи по всій країні.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Технології</h2>
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <h3 className={styles.techTitle}>Frontend</h3>
              <ul className={styles.techList}>
                <li>React 18</li>
                <li>React Router</li>
                <li>CSS Modules</li>
                <li>Vite</li>
              </ul>
            </div>
            <div className={styles.techCard}>
              <h3 className={styles.techTitle}>Backend</h3>
              <ul className={styles.techList}>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>SQLite</li>
                <li>Sequelize ORM</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Автор проекту</h2>
          <div className={styles.authorCard}>
            <p className={styles.text}>
              Проект розроблено в рамках курсової роботи студентом 3 курсу,
              групи 302-ТН Ткаченко Вадимом.
            </p>
            <p className={styles.text}>
              <strong>Мета проекту:</strong> створити зручний інструмент для
              ознайомлення з культурним життям України та підтримки вітчизняного
              мистецтва.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
