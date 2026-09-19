export const GREEN_API_BASE_URL = "https://api.green-api.com";

export const getApiUrl = (
  idInstance: string,
  apiTokenInstance: string,
  methodName: string,
): string => {
  return `${GREEN_API_BASE_URL}/waInstance${idInstance}/${methodName}/${apiTokenInstance}`;
};
