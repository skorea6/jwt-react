import { getLoginAccessToken } from "../storage/LoginLocalStorage";

const TIME_OUT = 300 * 1000;
const API_URL = "http://localhost:8080";

const statusError = {
  status: false,
  statusCode: 999,
  statusMessage: "API 연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요",
  data: null,
};

const requestPromise = async (url, option) => {
  const response = await fetch(url, option);
  // if (!response.ok) {
  //   throw statusError;
  // }
  return response;
};

const timeoutPromise = () => {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("timeout")), TIME_OUT)
  );
};

const getPromise = async (url, option) => {
  const response = await Promise.race([
    requestPromise(url, option),
    timeoutPromise(),
  ]);
  return response;
};

const apiRequest = async (url, option) => {
  try {
    const apiData = await getPromise(API_URL + url, option).catch(() => {
      return statusError;
    });

    const text = await apiData.text();
    const json = text.length ? JSON.parse(text) : "";
    const { statusCode, statusMessage, data } = json;

    return {
      status: statusCode === 200,
      statusCode: statusCode,
      statusMessage,
      data,
    };
  } catch {
    return statusError;
  }
};

const getApiRequestOptions = (method, body, accessToken) => {
  const headers = {
    "Content-Type": "application/json;charset=UTF-8",
  };

  if (accessToken) {
    headers.Authorization = "Bearer " + getLoginAccessToken();
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

export { API_URL, apiRequest, getApiRequestOptions };
