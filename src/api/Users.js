const TIME_OUT = 300 * 1000;

const statusError = {
  status: false,
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
    const apiData = await getPromise(url, option).catch(() => {
      return statusError;
    });

    const text = await apiData.text();
    const json = text.length ? JSON.parse(text) : "";
    const { statusCode, statusMessage, data } = json;

    return {
      status: statusCode === 200,
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
    headers.Authorization = "Bearer " + accessToken;
  }

  return {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };
};

export const loginUser = async (credentials) => {
  const option = getApiRequestOptions("POST", credentials);
  return await apiRequest("http://localhost:8080/api/member/login", option);
};

export const logoutUser = async (accessToken) => {
  const option = getApiRequestOptions("GET", undefined, accessToken);
  return await apiRequest(
    "http://localhost:8080/api/member/token/refresh/logout",
    option
  );
};

export const requestToken = async (refreshToken) => {
  const option = getApiRequestOptions("POST", { refreshToken });
  return await apiRequest(
    "http://localhost:8080/api/member/token/refresh/issue",
    option
  );
};
