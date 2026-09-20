import { useEffect, useRef, useState } from "react";
import styles from "./MessagesList.module.scss";
import { getApiUrl } from "../../../api/config";
import type { Credentials } from "../../../App";
import { MESSAGES_ERRORS } from "../../../constants/messages";

interface Message {
  id: string;
  text: string;
  isOutgoing: boolean;
}

interface MessagesListProps {
  activeChat: string;
  onBack: () => void;
  credentials: Credentials;
}

export const MessagesList = ({
  activeChat,
  onBack,
  credentials,
}: MessagesListProps) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const text = messageText.trim();
    if (!text || isSending) return;

    setIsSending(true);
    setSendError("");

    try {
      const sendUrl = getApiUrl(
        credentials.idInstance,
        credentials.apiTokenInstance,
        "sendMessage",
      );

      const response = await fetch(sendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: `${activeChat}@c.us`,
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error(MESSAGES_ERRORS.NETWORK_ERROR);
      }

      const data = await response.json();
      const newMessage: Message = {
        id: data.idMessage,
        text: text,
        isOutgoing: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageText("");
    } catch (error) {
      console.error("Ошибка отправки:", error);
      setSendError(MESSAGES_ERRORS.SEND_FAILED);
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    let isPolling = true;
    const receiveMessages = async () => {
      try {
        const receiveUrl = getApiUrl(
          credentials.idInstance,
          credentials.apiTokenInstance,
          "receiveNotification",
        );
        const response = await fetch(receiveUrl);
        if (!response.ok) return;
        const textData = await response.text();
        if (!textData) return;
        const data = JSON.parse(textData);
        if (!data) return;
        const receiptId = data.receiptId;
        const body = data.body;
        const isTextMessage = body.messageData?.typeMessage === "textMessage";
        const isIncoming = body.typeWebhook === "incomingMessageReceived";
        const isOutgoingFromPhone =
          body.typeWebhook === "outgoingMessageReceived";
        if ((isIncoming || isOutgoingFromPhone) && isTextMessage) {
          const senderPhone = String(body.senderData.senderPhoneNumber);
          if (senderPhone === activeChat) {
            const incomingMsg: Message = {
              id: body.idMessage,
              text: body.messageData.textMessageData.textMessage,
              isOutgoing: isOutgoingFromPhone,
            };
            setMessages((prev) => [...prev, incomingMsg]);
          }
        }

        const deleteUrl = getApiUrl(
          credentials.idInstance,
          credentials.apiTokenInstance,
          "deleteNotification",
          receiptId.toString(),
        );
        await fetch(deleteUrl, { method: "DELETE" });
        return true;
      } catch (error) {
        console.error("Ошибка при получении сообщения:", error);
        return false;
      }
    };

    const startPolling = async () => {
      while (isPolling) {
        const hasMessage = await receiveMessages();
        if (!hasMessage) {
          await new Promise((resolve) => setTimeout(resolve, 3000));
        }
      }
    };
    startPolling();

    return () => {
      isPolling = false;
    };
  }, [activeChat, credentials]);

  return (
    <main className={styles.chatArea}>
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
        <div ref={messagesEndRef} />
      </div>

      {sendError && <div className={styles.sendError}>{sendError}</div>}

      <form className={styles.inputArea} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button
          className={styles.sendButton}
          disabled={isSending || !messageText.trim()}
        >
          <SendIcon />
        </button>
      </form>
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
