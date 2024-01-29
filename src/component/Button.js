import React from "react";

const colorClasses = {
  // 동적 클래스 이름을 사용하는 문제를 해결하기 위해, 가능한 모든 클래스를 사전에 정의하는 방법
  red: {
    background: "bg-red-500 hover:bg-red-700",
    ring: "focus:ring-red-500",
    text: "text-red-300 group-hover:text-red-200",
  },
  blue: {
    background: "bg-blue-500 hover:bg-blue-700",
    ring: "focus:ring-blue-500",
    text: "text-blue-300 group-hover:text-blue-200",
  },
  green: {
    background: "bg-green-500 hover:bg-green-700",
    ring: "focus:ring-green-500",
    text: "text-green-300 group-hover:text-green-200",
  },
  pink: {
    background: "bg-pink-500 hover:bg-pink-700",
    ring: "focus:ring-pink-500",
    text: "text-pink-300 group-hover:text-pink-200",
  },
  purple: {
    background: "bg-purple-500 hover:bg-purple-700",
    ring: "focus:ring-purple-500",
    text: "text-purple-300 group-hover:text-purple-200",
  },
};

const Button = ({ isApiLoading, color, icon: Icon, children }) => {
  const classes = colorClasses[color] || colorClasses.red; // 기본값 설정

  return (
    <button
      type="submit"
      disabled={isApiLoading}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
        isApiLoading ? "bg-gray-400" : classes.background
      } focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes.ring}`}
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {Icon && (
          <Icon
            className={`h-5 w-5 ${
              isApiLoading ? "text-gray-700" : classes.text
            }`}
            aria-hidden="true"
          />
        )}
      </span>
      {isApiLoading ? "로딩 중..." : children}
    </button>
  );
};

const ButtonNotLoading = ({ color, icon: Icon, children }) => {
  const classes = colorClasses[color] || colorClasses.red; // 기본값 설정

  return (
    <button
      type="submit"
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${classes.background} focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes.ring}`}
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        {Icon && (
          <Icon className={`h-5 w-5 ${classes.text}`} aria-hidden="true" />
        )}
      </span>
      {children}
    </button>
  );
};

export { Button, ButtonNotLoading };
