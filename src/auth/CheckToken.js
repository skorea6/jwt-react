import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookieToken,
  setRefreshToken,
  removeCookieToken,
} from "../storage/Cookie";
import { requestToken } from "../api/Users";
import { DELETE_TOKEN, SET_TOKEN } from "../store/Auth";

export function CheckToken(key) {
  const [isAuth, setIsAuth] = useState("Loaded");
  const { authenticated, expireTime } = useSelector((state) => state.token);
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();

  useEffect(() => {
    const CheckAuthToken = async () => {
      if (refreshToken === undefined) {
        console.log("1 - passed");
        dispatch(DELETE_TOKEN());
        setIsAuth("Failed");
      } else {
        console.log("------");
        console.log(Math.floor(new Date() / 1000));
        console.log(expireTime);
        console.log(authenticated);
        console.log("------");
        if (authenticated && Math.floor(new Date() / 1000) < expireTime) {
          setIsAuth("Success");
          console.log("2 - passed");
        } else {
          const response = await requestToken(refreshToken);
          console.log("3 - passed");

          if (response.status) {
            setRefreshToken(response.data.refreshToken);
            dispatch(SET_TOKEN(response.data.accessToken));
            setIsAuth("Success");
          } else {
            console.log(response.statusMessage);
            dispatch(DELETE_TOKEN());
            removeCookieToken();
            setIsAuth("Failed");
          }
        }
      }
    };
    CheckAuthToken();
  }, [refreshToken, dispatch, key, authenticated, expireTime]);

  return {
    isAuth,
  };
}
