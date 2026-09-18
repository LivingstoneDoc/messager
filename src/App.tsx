import styles from "./App.module.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MessagerPage } from "./pages/MessagerPage/MessagerPage";
function App() {
  return (
    <div className={styles.app}>
      {/* <LoginPage /> */}
      <MessagerPage />
    </div>
  );
}

export default App;
