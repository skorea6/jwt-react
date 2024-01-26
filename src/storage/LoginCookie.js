import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies();

export const setLoginRefreshToken = (refreshToken) => {
  const jwtData = jwtDecode(refreshToken); // timestamp

  return cookies.set("loginRefreshToken", refreshToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(parseInt(jwtData.exp) * 1000),
    // secure: true,
    // httpOnly: true,
  });
};

export const getLoginRefreshToken = () => {
  return cookies.get("loginRefreshToken");
};

export const removeLoginRefreshToken = () => {
  return cookies.remove("loginRefreshToken", { sameSite: "strict", path: "/" });
};
