import { apiRequest, getApiRequestOptions } from "./ApiConfig";

export const memberInfoAPI = async () => {
  const option = getApiRequestOptions("GET", undefined, true);
  return await apiRequest("/api/member/info", option);
};

export const updateMemberInfoAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/update", option);
};

export const updateMemberPasswordAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/update/password", option);
};

export const updateMemberEmailSendEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/update/email", option);
};

export const updateMemberEmailCheckEmailAPI = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/update/email/check", option);
};

export const deleteMember = async (data) => {
  const option = getApiRequestOptions("POST", data, true);
  return await apiRequest("/api/member/delete", option);
};
