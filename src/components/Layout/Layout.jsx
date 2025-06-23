import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const canvasRef = useRef(null);

  // Emoji для художніх виставок
  const artEmojis = [
    "🎨",
    "🖼️",
    "🖌️",
    "🎭",
    "🏛️",
    "✨",
    "🌟",
    "💫",
    "🎪",
    "🎯",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Встановлюємо розмір canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawEmojis(); // Перемальовуємо при зміні розміру
    };

    // Функція для малювання emoji
    const drawEmojis = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Створюємо шахматну сітку по всьому екрану
      const positions = [];

      // Розраховуємо кількість рядів і колонок на основі розміру екрану
      const emojiSpacing = 120; // Відстань між emoji
      const rowCount = Math.floor(canvas.height / emojiSpacing);
      const colCount = Math.floor(canvas.width / emojiSpacing);

      // Створюємо шахматну сітку по всьому екрану
      for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
          // Зміщуємо позиції в непарних рядах для шахматного ефекту
          const offsetX = row % 2 === 1 ? emojiSpacing / 2 : 0;
          positions.push({
            x: col * emojiSpacing + emojiSpacing / 2 + offsetX,
            y: row * emojiSpacing + emojiSpacing / 2 + 50, // Додаємо відступ зверху
          });
        }
      }

      // Малюємо emoji в заданих позиціях
      positions.forEach((pos, index) => {
        const emoji = artEmojis[index % artEmojis.length];
        const size = 25 + (index % 3) * 10; // Варіюємо розмір 25-45px
        const opacity = 0.15 + (index % 3) * 0.05; // Зменшена прозорість для кращої читабельності

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.font = `${size}px Arial`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(emoji, pos.x, pos.y);
        ctx.restore();
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className={styles.layout}>
      {/* Canvas для emoji фону */}
      <canvas ref={canvasRef} className={styles.emojiCanvas} />

      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
