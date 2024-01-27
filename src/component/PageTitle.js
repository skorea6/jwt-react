import { useEffect } from "react";

export const PageTitle = ({ subTitle }) => {
  useEffect(() => {
    const baseTitle = process.env.REACT_APP_TITLE;
    document.title = subTitle ? `${baseTitle} - ${subTitle}` : baseTitle;
  }, [subTitle]);

  return null;
};
