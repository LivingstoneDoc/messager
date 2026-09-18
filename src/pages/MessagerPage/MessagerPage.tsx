import { ChatsList } from "./ChatsList/ChatsList";
import styles from "./MessagerPage.module.scss";
import { useState } from "react";
import { MessagesList } from "./MessagesList/MessagesList";

export const MessagerPage = () => {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div
      className={`${styles.container} ${activeChat ? styles.mobileChatActive : ""}`}
    >
      <div className={styles.sidebarWrapper}>
        <ChatsList activeChat={activeChat} onSelectChat={setActiveChat} />
      </div>

      <div className={styles.chatAreaWrapper}>
        {activeChat ? (
          <MessagesList
            activeChat={activeChat}
            onBack={() => setActiveChat(null)}
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
