import { useState } from "react";
import styles from "./MessagesList.module.scss";

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
}

interface MessagesListProps {
  activeChat: string;
  onBack: () => void;
}

const defaultMessages: Message[] = [
  {
    id: "msg-1",
    text: "Привет!",
    isOutgoing: false,
  },
  {
    id: "msg-2",
    text: "Привет! Как дела?",
    isOutgoing: true,
  },
  {
    id: "msg-3",
    text: "Супер!",
    isOutgoing: false,
  },
];

export const MessagesList = ({ activeChat, onBack }: MessagesListProps) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
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
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${message.isOutgoing ? styles.outgoing : styles.incoming}`}
            >
              {message.text}
            </div>
          ))}
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
