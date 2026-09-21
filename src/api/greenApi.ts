import { AUTH_ERRORS, MESSAGES_ERRORS } from "../constants/messages";
import { getApiUrl } from "./config";

export const greenApi = {
  checkAuth: async (idInstance: string, apiTokenInstance: string) => {
    const url = getApiUrl(idInstance, apiTokenInstance, "getStateInstance");
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(AUTH_ERRORS.WRONG_CREDENTIALS);
    }
    const data = await response.json();
    return data.stateInstance === "authorized";
  },
  sendMessage: async (
    idInstance: string,
    apiTokenInstance: string,
    chatId: string,
    message: string,
  ) => {
    const url = getApiUrl(idInstance, apiTokenInstance, "sendMessage");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: `${chatId}@c.us`,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(MESSAGES_ERRORS.NETWORK_ERROR);
    }
    return await response.json();
  },
  receiveMessage: async (idInstance: string, apiTokenInstance: string) => {
    const url = getApiUrl(idInstance, apiTokenInstance, "receiveNotification");
    const response = await fetch(url);
    if (!response.ok) return;
    const textData = await response.text();
    if (!textData) return;
    return JSON.parse(textData);
  },
  deleteNotification: async (
    idInstance: string,
    apiTokenInstance: string,
    receiptId: number | string,
  ) => {
    const url = getApiUrl(
      idInstance,
      apiTokenInstance,
      "deleteNotification",
      receiptId.toString(),
    );
    const response = await fetch(url, { method: "DELETE" });
    return response.ok;
  },
};
