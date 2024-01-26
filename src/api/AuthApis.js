import { apiRequest, getApiRequestOptions } from "./ApiConfig";

export const loginAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/login", option);
};

export const loginOauth2InfoAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/login/oauth2", option);
};

export const signUpVerificationEmailSendAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/signup/verification/email/send", option);
};

export const signUpVerificationEmailCheckAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest(
    "/api/member/signup/verification/email/check",
    option
  );
};

export const signUpEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/signup", option);
};

export const signUpOauth2InfoAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/signup/oauth2/info", option);
};

export const signUpOauth2API = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/signup/oauth2", option);
};

// REFRESH TOKEN LIST, DELETE
export const refreshTokenListAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/token/refresh/list", option);
};

export const deleteRefreshTokenAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/token/refresh/delete", option);
};

// LOGOUT
export const logoutAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/token/refresh/logout", option);
};

export const logoutAllAPI = async () => {
  const option = getApiRequestOptions("GET", undefined, true);
  return await apiRequest("/api/member/token/refresh/logout/all", option);
};

// RE-ISSUE TOKEN
export const issueTokenAPI = async (refreshToken) => {
  const option = getApiRequestOptions("POST", { refreshToken });
  return await apiRequest("/api/member/token/refresh/issue", option);
};

// FIND APIS
export const findUserIdByEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/find/user-id/by-email", option);
};

export const findPasswordByEmailResetPasswordAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest("/api/member/find/password/by-email/reset", option);
};

export const findPasswordByEmailSendEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest(
    "/api/member/find/password/by-email/email/send",
    option
  );
};

export const findPasswordByEmailCheckEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data);
  return await apiRequest(
    "/api/member/find/password/by-email/email/check",
    option
  );
};
