import styles from "./App.module.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
function App() {
  return (
    <div className={styles.app}>
      <LoginPage />
    </div>
  );
}

export default App;
