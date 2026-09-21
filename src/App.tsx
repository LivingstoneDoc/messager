import { useState } from "react";
import styles from "./App.module.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MessagerPage } from "./pages/MessagerPage/MessagerPage";
import type { Credentials } from "./types/auth";

function App() {
  const [credentials, setCredentials] = useState<Credentials | null>(
    checkCredentials(),
  );
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(credentials));

  function checkCredentials() {
    const savedId = sessionStorage.getItem("idInstance");
    const savedToken = sessionStorage.getItem("apiTokenInstance");

    if (savedId && savedToken) {
      return { idInstance: savedId, apiTokenInstance: savedToken };
    }
    return null;
  }

  const handleLoginSuccess = (id: string, token: string) => {
    sessionStorage.setItem("idInstance", id);
    sessionStorage.setItem("apiTokenInstance", token);
    setCredentials({ idInstance: id, apiTokenInstance: token });
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("idInstance");
    sessionStorage.removeItem("apiTokenInstance");
    setCredentials(null);
    setIsAuthenticated(false);
  };
  return (
    <div className={styles.app}>
      {isAuthenticated && credentials ? (
        <MessagerPage credentials={credentials} onLogout={handleLogout} />
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;
