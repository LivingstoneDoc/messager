import { useState } from "react";
import styles from "./LoginPage.module.scss";
import { AUTH_ERRORS } from "../../constants/messages";
import { getApiUrl } from "../../api/config";

interface LoginPageProps {
  onLoginSuccess: (idInstance: string, apiTokenInstance: string) => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [isTokenVisible, setIsTokenVisible] = useState(false);
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleTokenVisibility = () => {
    setIsTokenVisible((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idInstance.trim() || !apiTokenInstance.trim()) {
      setError(AUTH_ERRORS.EMPTY_FIELDS);
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const url = getApiUrl(idInstance, apiTokenInstance, "getStateInstance");
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(AUTH_ERRORS.WRONG_CREDENTIALS);
      }

      const data = await response.json();
      if (data.stateInstance === "authorized") {
        onLoginSuccess(idInstance, apiTokenInstance);
      } else {
        setError(AUTH_ERRORS.NOT_AUTHORIZED);
      }
    } catch (err) {
      setError(AUTH_ERRORS.NETWORK_ERROR);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Вход в мессенджер</h1>
        <p className={styles.subtitle}>Введите учетные данные из GREEN-API</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="idInstance">Идентификатор (idInstance)</label>
            <input
              id="idInstance"
              type="text"
              placeholder="Например: 1101823456"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
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
                value={apiTokenInstance}
                onChange={(e) => setApiTokenInstance(e.target.value)}
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

          {error && <div className={styles.errorMessage}>{error}</div>}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? "Проверка..." : "Войти"}
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
