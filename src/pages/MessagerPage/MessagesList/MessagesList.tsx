import { useState } from "react";
import styles from "./MessagesList.module.scss";

interface MessagesListProps {
  activeChat: string;
  onBack: () => void;
}

export const MessagesList = ({ activeChat, onBack }: MessagesListProps) => {
  const [messageText, setMessageText] = useState("");
  return (
    <main className={styles.chatArea}>
      <>
        <div className={styles.chatAreaHeader}>
          <button
            className={styles.backButton}
            onClick={onBack}
            title="Назад к списку чатов"
          >
            <BackIcon />
          </button>
          +{activeChat}
        </div>

        <div className={styles.messagesList}>
          <div className={`${styles.message} ${styles.incoming}`}>Привет!</div>
          <div className={`${styles.message} ${styles.outgoing}`}>
            Привет, как дела?
          </div>
        </div>

        <div className={styles.inputArea}>
          <input
            type="text"
            placeholder="Введите сообщение..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button className={styles.sendButton}>
            <SendIcon />
          </button>
        </div>
      </>
    </main>
  );
};

const BackIcon = () => {
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
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  );
};

const SendIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  );
};
