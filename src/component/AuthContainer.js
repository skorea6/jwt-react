import React from "react";

const AuthContainer = ({ title, maxWidth, children }) => {
  const maxWidthClass = maxWidth ? maxWidth : "max-w-md";
  return (
    <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`${maxWidthClass} w-full space-y-4`}>
        <div>
          <img
            className="mx-auto h-24 w-auto"
            src="/img/logo_main.png"
            alt="JWT 로고"
          />
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
