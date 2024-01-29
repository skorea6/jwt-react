import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getLoginRefreshToken } from "../storage/LoginCookie";
import { reIssueToken } from "../auth/CheckToken";

export default function AutoIssueToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    const AUTO_ISSUE_TOKEN_INTERVAL =
      process.env.REACT_APP_AUTO_ISSUE_TOKEN_INTERVAL;
    const AUTO_ISSUE_TOKEN_MINUTES_LEFT =
      process.env.REACT_APP_AUTO_ISSUE_TOKEN_MINUTES_LEFT;

    const intervalId = setInterval(async () => {
      const refreshToken = getLoginRefreshToken();
      if (refreshToken !== undefined) {
        const loginExpiredTime = localStorage.getItem("loginExpiredTime");
        const minutesLeft =
          (new Date(loginExpiredTime * 1000) - new Date()) / (1000 * 60);
        console.log(minutesLeft);
        // 날짜 비교 : 만료까지 남은 시간이 9분일때 (prod 5분)
        if (
          loginExpiredTime !== undefined &&
          minutesLeft <= AUTO_ISSUE_TOKEN_MINUTES_LEFT
        ) {
          console.log("자동 토큰 재발급 시스템 발동");
          console.log(refreshToken);
          // const response = await issueTokenAPI(refreshToken);

          // if (response.status) {
          //   console.log("AutoIssueToken : 토큰이 자동으로 재발급되었습니다!");

          //   setLoginRefreshToken(response.data.refreshToken); // cookie
          //   setLoginAccessToken(response.data.accessToken); // local storage
          // }
          reIssueToken(refreshToken, dispatch);
        }
      }
    }, AUTO_ISSUE_TOKEN_INTERVAL * 1000); // TODO: 추후 30초 정도로 수정하기

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return null;
}
