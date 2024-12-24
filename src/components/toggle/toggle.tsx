import { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import styles from "./toggle.module.css";
import clsx from "clsx";

export const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div>
      <input
        type="checkbox"
        className={styles.checkbox}
        id="toggle"
        checked={isDarkMode}
        onChange={() => setIsDarkMode(!isDarkMode)}
      />
      <label htmlFor="toggle" className={styles.checkboxLabel}>
        {/* Íconos fijos en las posiciones izquierda y derecha */}
        <MoonIcon className={clsx(styles.moonIcon, styles.fixedIcon)} />
        <SunIcon className={clsx(styles.sunIcon, styles.fixedIcon)} />

        {/* Bola que se mueve */}
        <span
          className={clsx(styles.ball, {
            [styles.animationDark]: isDarkMode,
            [styles.animationLight]: !isDarkMode,
          })}
        >
          {/* Ícono dentro de la bola */}
          {isDarkMode ? (
            <MoonIcon className={styles.iconInsideBall} />
          ) : (
            <SunIcon className={styles.iconInsideBall} />
          )}
        </span>
      </label>
    </div>
  );
};
