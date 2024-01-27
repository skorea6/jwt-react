import { useEffect, useState, useRef } from "react";
import {
  getLoginRefreshToken,
  setLoginRefreshToken,
  removeLoginRefreshToken,
} from "../storage/LoginCookie";
import { issueTokenAPI } from "../api/AuthApis";
import { memberInfoAPI } from "../api/MemberApis";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginAccessToken,
  removeLoginAccessToken,
  getLoginAccessTokenUserId,
} from "../storage/LoginLocalStorage";
import { SET_MEMBER_INFO, DELETE_MEMBER_INFO } from "../store/MemberInfo";
import useApiWithLoading from "../api/useApiWithLoading";

export function CheckToken(key) {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState("Loaded");

  const isLogined = localStorage.getItem("isLogined");
  const loginExpiredTime = localStorage.getItem("loginExpiredTime");
  const refreshToken = getLoginRefreshToken();

  const { userId } = useSelector((state) => state.memberInfo);

  const callMemberInfoAPI = useRef(useApiWithLoading(memberInfoAPI));

  useEffect(() => {
    let isMounted = true;

    const CheckAuthToken = async () => {
      if (refreshToken === undefined) {
        console.log("CheckToken1-1 : refreshToken이 쿠키에 없습니다!");
        tokenFailed(dispatch, setIsAuth, isMounted);
      } else {
        if (
          isLogined === "true" &&
          loginExpiredTime !== undefined &&
          Math.floor(Date.now() / 1000) < parseInt(loginExpiredTime)
        ) {
          // console.log("------");
          // console.log(Math.floor(Date.now() / 1000));
          // console.log(parseInt(loginExpiredTime));
          // console.log(isLogined);
          // console.log("------");
          console.log("CheckToken2-1 : 로그인 상태입니다!");

          // memberInfo 저장소에 데이터가 없거나 로그인 아이디가 바뀌었을 경우 : info API 재호출
          if (userId === null || userId !== getLoginAccessTokenUserId()) {
            console.log("CheckToken2-2 : info API를 재호출하였습니다.");
            const memberInfo = await callMemberInfoAPI.current();
            if (memberInfo.status) {
              dispatch(SET_MEMBER_INFO(memberInfo.data));
            } else {
              tokenFailed(dispatch, setIsAuth, isMounted);
            }
          }
          if (isMounted) {
            setIsAuth("Success"); // Update state only if mounted
          }
        } else {
          await reIssueToken(refreshToken, dispatch, setIsAuth, isMounted);
        }
      }
    };
    CheckAuthToken();
    return () => {
      isMounted = false; // Set flag to false when the component unmounts
    };
  }, [
    refreshToken,
    dispatch,
    isAuth,
    key,
    isLogined,
    loginExpiredTime,
    userId,
  ]);

  return {
    isAuth,
  };
}

export function tokenFailed(dispatch, setIsAuth, isMounted) {
  dispatch(DELETE_MEMBER_INFO());
  removeLoginRefreshToken();
  removeLoginAccessToken();
  if (setIsAuth && isMounted) {
    setIsAuth("Failed");
  }
}

export async function reIssueToken(
  refreshToken,
  dispatch,
  setIsAuth,
  isMounted
) {
  const response = await issueTokenAPI(refreshToken);

  if (response.status) {
    console.log("CheckToken3-1 : 토큰이 재발급되었습니다!");

    setLoginRefreshToken(response.data.refreshToken); // cookie
    setLoginAccessToken(response.data.accessToken); // local storage

    if (setIsAuth && isMounted) {
      setIsAuth("Success");
    }
  } else if (response.statusCode !== 999) {
    console.log("CheckToken4-1 :  토큰이 재발급에 실패하였습니다.");
    console.log(response.statusMessage);
    tokenFailed(dispatch, setIsAuth, isMounted);
  }
}
