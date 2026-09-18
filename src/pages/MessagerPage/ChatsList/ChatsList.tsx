import { useState } from "react";
import styles from "./ChatsList.module.scss";

interface ChatsListProps {
  activeChat: string | null;
  onSelectChat: (phone: string) => void;
}

export const ChatsList = ({ activeChat, onSelectChat }: ChatsListProps) => {
  const [searchPhone, setSearchPhone] = useState("");
  const [chats, setChats] = useState<string[]>(["79991234567", "79997654321"]);
  const handleSearchChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchPhone.trim()) return;

    if (!chats.includes(searchPhone)) {
      setChats([searchPhone, ...chats]);
    }

    onSelectChat(searchPhone);
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

      <div className={styles.chatList}>
        {chats.map((phone) => (
          <div
            key={phone}
            className={`${styles.chatItem} ${activeChat === phone ? styles.active : ""}`}
            onClick={() => onSelectChat(phone)}
          >
            <div className={styles.chatItemAvatar}>
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
            Чатов пока нет
          </div>
        )}
      </div>
    </aside>
  );
};
