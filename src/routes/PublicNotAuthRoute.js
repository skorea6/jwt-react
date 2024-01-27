import { Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { CheckToken } from "../auth/CheckToken";
import { PageTitle } from "../component/PageTitle";

export default function PublicNotAuthRoute({ element: Component, title }) {
  const location = useLocation();
  const { isAuth } = CheckToken(location.key);

  if (isAuth === "Success") {
    return <Navigate to="/" state={{ from: location }} />;
  } else if (isAuth !== "Loaded") {
    return (
      <>
        <PageTitle subTitle={title} />
        <Component />
      </>
    );
  }
  return null;
}
