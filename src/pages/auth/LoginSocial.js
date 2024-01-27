import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginOauth2InfoAPI } from "../../api/AuthApis";
import { setLoginAccessToken } from "../../storage/LoginLocalStorage";
import { setLoginRefreshToken } from "../../storage/LoginCookie";
import useApiWithLoading from "../../api/useApiWithLoading";

function LoginSocial() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const callLoginOauth2InfoAPI = useRef(useApiWithLoading(loginOauth2InfoAPI));

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token == null || token === "") {
        navigate("/auth/login");
      } else {
        const response = await callLoginOauth2InfoAPI.current({ token });
        if (response.status) {
          // 쿠키에 Refresh Token, 로컬스토리지에 Access Token 저장
          setLoginRefreshToken(response.data.refreshToken);
          setLoginAccessToken(response.data.accessToken);

          // const memberInfo = await memberInfoAPI(
          //   incrementLoadingRef.current,
          //   decrementLoadingRef.current
          // );
          // dispatch(SET_MEMBER_INFO(memberInfo.data));

          navigate("/");
        } else {
          navigate("/auth/login");
        }
      }
    };

    checkToken();
  }, [token, navigate, dispatch]);

  return null;
}

export default LoginSocial;
