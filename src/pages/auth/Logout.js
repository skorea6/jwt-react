import { useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeLoginAccessToken } from "../../storage/LoginLocalStorage";
import {
  getLoginRefreshToken,
  removeLoginRefreshToken,
} from "../../storage/LoginCookie";
import { DELETE_MEMBER_INFO } from "../../store/MemberInfo";
import { logoutAPI } from "../../api/AuthApis";
import useApiWithLoading from "../../api/useApiWithLoading";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const callLogoutAPI = useRef(useApiWithLoading(logoutAPI));
  const refreshToken = getLoginRefreshToken();

  const logout = useCallback(async () => {
    await callLogoutAPI.current({ refreshToken });

    dispatch(DELETE_MEMBER_INFO());
    removeLoginAccessToken();
    removeLoginRefreshToken();

    return navigate("/auth/login");
  }, [navigate, dispatch, refreshToken]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Link to="/auth/login" />
    </>
  );
}

export default Logout;
