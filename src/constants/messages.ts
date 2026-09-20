export const AUTH_ERRORS = {
  EMPTY_FIELDS: "Пожалуйста, введите idInstance и apiTokenInstance.",
  NOT_AUTHORIZED:
    "Аккаунт не авторизован в Max. Откройте консоль Green-API и отсканируйте QR-код.",
  NETWORK_ERROR: "Ошибка входа. Проверьте idInstance и apiTokenInstance.",
  WRONG_CREDENTIALS: "Неверные учетные данные",
} as const;

export const MESSAGES_ERRORS = {
  NETWORK_ERROR: "Ошибка сети при отправке сообщения.",
  SEND_FAILED: "Не удалось отправить сообщение. Попробуйте еще раз.",
} as const;
