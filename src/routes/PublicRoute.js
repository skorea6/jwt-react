//
import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";

//
import { CheckToken } from "../auth/CheckToken";
import LoadingModal from "../component/LoadingModal";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key); // location 페이지 주소가 바뀔때마다 Refresh토큰 재발급여부 결정 (useEffect에 키가 달라질때마다)

  if (isAuth === "Success") {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (isAuth === "Loading") {
    return <LoadingModal />;
  }

  return children;
}
