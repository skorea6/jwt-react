import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../auth/CheckToken";

export default function PrivateRoute() {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);

  if (isAuth === "Failed") {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  } else if (isAuth !== "Loaded") {
    return <Outlet />;
  }

  return null;
}
