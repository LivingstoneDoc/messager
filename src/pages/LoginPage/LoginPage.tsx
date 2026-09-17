import { useState } from "react";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const toggleTokenVisibility = () => {
    setIsTokenVisible((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в мессенджер</h1>
        <p className={styles.subtitle}>Введите учетные данные из GREEN-API</p>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="idInstance">Идентификатор (idInstance)</label>
            <input
              id="idInstance"
              type="text"
              placeholder="Например: 1101823456"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="apiTokenInstance">
              API Токен (apiTokenInstance)
            </label>
            <div className={styles.tokenInputWrapper}>
              <input
                id="apiTokenInstance"
                type={isTokenVisible ? "text" : "password"}
                placeholder="Ваш API токен"
                required
              />
              <button
                type="button"
                onClick={toggleTokenVisibility}
                className={styles.toggleButton}
              >
                {isTokenVisible ? <ClosedEyeIcon /> : <OpenedEyeIcon />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
          <p className={styles.hint}>
            Нет аккаунта? Получите данные в{" "}
            <a
              href="https://console.greenapi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              консоли Green-API
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

const ClosedEyeIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
};

const OpenedEyeIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
};
