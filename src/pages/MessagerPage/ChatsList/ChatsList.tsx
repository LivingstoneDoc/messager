import { useEffect, useState } from "react";
import styles from "./ChatsList.module.scss";

interface ChatsListProps {
  activeChat: string | null;
  onSelectChat: (phone: string) => void;
  onLogout: () => void;
}

const checkSavedChats = () => {
  const saved = localStorage.getItem("savedChats");
  return saved ? JSON.parse(saved) : [];
};

export const ChatsList = ({
  activeChat,
  onSelectChat,
  onLogout,
}: ChatsListProps) => {
  const [searchPhone, setSearchPhone] = useState("");
  const [chats, setChats] = useState<string[]>(checkSavedChats());

  useEffect(() => {
    localStorage.setItem("savedChats", JSON.stringify(chats));
  }, [chats]);

  const handleSearchChat = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanPhone = searchPhone.replace(/\D/g, "");
    if (!cleanPhone) return;
    if (!chats.includes(cleanPhone)) {
      setChats((prev) => [cleanPhone, ...prev]);
    }
    onSelectChat(cleanPhone);
    setSearchPhone("");
  };

  return (
    <aside className={styles.sidebar}>
      <form className={styles.sidebarHeader} onSubmit={handleSearchChat}>
        <input
          type="text"
          placeholder="Введите номер телефона..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          Найти
        </button>
      </form>
      <button
        onClick={onLogout}
        className={styles.logoutButton}
        title="Выйти из аккаунта"
      >
        Выйти
      </button>

      <div className={styles.chatList}>
        {chats.map((phone) => (
          <div
            key={phone}
            className={`${styles.chatItem} ${activeChat === phone ? styles.active : ""}`}
            onClick={() => onSelectChat(phone)}
          >
            <div className={styles.chatItemAvatar}>
              <AvatarIcon />
            </div>
            <div className={styles.chatItemPhone}>+{phone}</div>
          </div>
        ))}
        {chats.length === 0 && (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              color: "var(--muted)",
            }}
          >
            Список чатов пуст. Найдите чат по номеру телефона.
          </div>
        )}
      </div>
    </aside>
  );
};

const AvatarIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
};
