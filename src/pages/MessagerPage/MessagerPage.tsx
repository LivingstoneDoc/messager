import { ChatsList } from "./ChatsList/ChatsList";
import styles from "./MessagerPage.module.scss";
import { useState } from "react";
import { MessagesList } from "./MessagesList/MessagesList";
import type { Credentials } from "../../App";

interface MessagerPageProps {
  credentials: Credentials;
  onLogout: () => void;
}

export const MessagerPage = ({ credentials, onLogout }: MessagerPageProps) => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div
      className={`${styles.container} ${activeChat ? styles.mobileChatActive : ""}`}
    >
      <div className={styles.sidebarWrapper}>
        <ChatsList
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onLogout={onLogout}
        />
      </div>

      <div className={styles.chatAreaWrapper}>
        {activeChat ? (
          <MessagesList
            key={activeChat}
            activeChat={activeChat}
            onBack={() => setActiveChat(null)}
            credentials={credentials}
          />
        ) : (
          <div className={styles.emptyState}>
            Выберите чат слева или создайте новый
          </div>
        )}
      </div>
    </div>
  );
};
