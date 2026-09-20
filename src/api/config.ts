export const GREEN_API_BASE_URL = "https://api.green-api.com";
export const GREEN_API_INSTANCE_PREFIX = "waInstance";

export const getApiUrl = (
  idInstance: string,
  apiTokenInstance: string,
  methodName: string,
): string => {
  return `${GREEN_API_BASE_URL}/${GREEN_API_INSTANCE_PREFIX}${idInstance}/${methodName}/${apiTokenInstance}`;
};
