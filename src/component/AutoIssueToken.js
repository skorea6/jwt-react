import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginRefreshToken } from "../storage/LoginCookie";
import { reIssueToken } from "../auth/CheckToken";

export default function AutoIssueToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const refreshToken = getLoginRefreshToken();
      console.log(refreshToken);
      if (refreshToken !== undefined) {
        const loginExpiredTime = localStorage.getItem("loginExpiredTime");
        console.log(loginExpiredTime);
        // 날짜 비교 (추후 3분으로 수정하기)
        if (
          loginExpiredTime !== undefined &&
          (new Date(loginExpiredTime * 1000) - new Date()) / (1000 * 60) < 9
        ) {
          console.log("자동 토큰 재발급 시스템 발동");
          // const response = await issueTokenAPI(refreshToken);

          // if (response.status) {
          //   console.log("AutoIssueToken : 토큰이 자동으로 재발급되었습니다!");

          //   setLoginRefreshToken(response.data.refreshToken); // cookie
          //   setLoginAccessToken(response.data.accessToken); // local storage
          // }
          reIssueToken(refreshToken, dispatch);
        }
      }
    }, 10 * 1000); // TODO: 추후 30초 정도로 수정하기

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
