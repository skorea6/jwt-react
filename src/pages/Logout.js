import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { removeCookieToken } from "../storage/Cookie";
import { DELETE_TOKEN } from "../store/Auth";

function Logout() {
  // const { accessToken } = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const refreshToken = getCookieToken();

  const logout = useCallback(async () => {
    // const data = await logoutUser(accessToken);

    // if (data.status) {
    dispatch(DELETE_TOKEN());
    removeCookieToken();
    return navigate("/user/login");
    // } else {
    //   return navigate("/");
    // }
  }, [dispatch, navigate]);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <>
      <Link to="/login" />
    </>
  );
}

export default Logout;
