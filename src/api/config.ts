export const GREEN_API_BASE_URL = "https://api.green-api.com";
export const GREEN_API_INSTANCE_PREFIX = "waInstance";

export const getApiUrl = (
  idInstance: string,
  apiTokenInstance: string,
  methodName: string,
  extraPath?: string,
): string => {
  const baseUrl = `${GREEN_API_BASE_URL}/${GREEN_API_INSTANCE_PREFIX}${idInstance}/${methodName}/${apiTokenInstance}`;
  if (extraPath) {
    return `${baseUrl}/${extraPath}`;
  }
  return baseUrl;
};
