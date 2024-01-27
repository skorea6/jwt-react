import React from "react";
import { API_URL } from "../api/ApiConfig";
import { FaGoogle } from "react-icons/fa";

const SocialButton = ({ name, children }) => {
  const NaverIcon = () => (
    <img
      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3e%3cpath d='M15.2 3v9.2L8.8 3H2v18.3h6.8v-9.2l6.4 9.2H22V3z' fill='%23FFF' fill-rule='evenodd'/%3e%3c/svg%3e"
      alt="Naver"
      className="h-5 w-5 mr-2"
    />
  );

  const KakaoIcon = () => (
    <img
      src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24'%3e%3cdefs%3e%3cpath id='a' d='M0 0h24v23.1H0z'/%3e%3c/defs%3e%3cg fill='none' fill-rule='evenodd'%3e%3cmask id='b' fill='%23fff'%3e%3cuse xlink:href='%23a'/%3e%3c/mask%3e%3cpath fill='%23000' d='M12 2.9c-5.5 0-10 3.4-10 7.6 0 2.6 1.7 4.9 4.4 6.2l-1.1 4c-.1.4.3.6.6.4l4.8-3.1H12c5.5 0 10-3.3 10-7.5s-4.5-7.6-10-7.6' mask='url(%23b)'/%3e%3c/g%3e%3c/svg%3e"
      alt="Kakao"
      className="h-5 w-5 mr-2"
    />
  );

  const getButtonClass = (name) => {
    switch (name) {
      case "naver":
        return "bg-green-500 hover:bg-green-700";
      case "kakao":
        return "bg-yellow-500 hover:bg-yellow-700";
      case "google":
        return "bg-blue-500 hover:bg-blue-700";
      default:
        return "";
    }
  };

  const getIconComponent = (name) => {
    switch (name) {
      case "naver":
        return <NaverIcon />;
      case "kakao":
        return <KakaoIcon />;
      case "google":
        return <FaGoogle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${getButtonClass(
        name
      )} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${name}-500`}
      onClick={() => {
        window.location.href = `${API_URL}/oauth2/authorization/${name}`;
      }}
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {getIconComponent(name)}
      </span>
      {children}
    </button>
  );
};

export { SocialButton };
