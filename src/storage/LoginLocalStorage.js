import { jwtDecode } from "jwt-decode";

export function setLoginAccessToken(accessToken) {
  const jwtData = jwtDecode(accessToken);
  localStorage.setItem("isLogined", true);
  localStorage.setItem("loginUserId", jwtData.sub);
  localStorage.setItem("loginExpiredTime", jwtData.exp);
  localStorage.setItem("loginAccessToken", accessToken);
}

export function removeLoginAccessToken() {
  localStorage.removeItem("isLogined");
  localStorage.removeItem("loginUserId");
  localStorage.removeItem("loginExpiredTime");
  localStorage.removeItem("loginAccessToken");
}

export function getLoginAccessToken() {
  return localStorage.getItem("loginAccessToken");
}

export function getLoginAccessTokenUserId() {
  return localStorage.getItem("loginUserId");
}
