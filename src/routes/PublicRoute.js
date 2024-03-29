import { useLocation } from "react-router-dom";
import { CheckToken } from "../auth/CheckToken";
import { PageTitle } from "../component/PageTitle";

export default function PublicRoute({ element: Component, title }) {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key); // location 페이지 주소가 바뀔때마다 Refresh토큰 재발급여부 결정 (useEffect에 키가 달라질때마다)

  if (isAuth !== "Loaded") {
    return (
      <>
        <PageTitle subTitle={title} />
        <Component />
      </>
    );
  }

  return null;
}
