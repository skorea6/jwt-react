import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-center lg:text-left mt-10">
      <div className="text-gray-700 flex justify-center items-center p-4">
        <div>© {new Date().getFullYear()} created by skorea6</div>
        <a
          href="https://github.com/skorea6"
          className="hover:underline ml-4 text-blue-500" // GitHub 링크 색상 추가
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://skorea6.tistory.com"
          className="hover:underline ml-4 text-blue-500" // 블로그 링크 색상 추가
          target="_blank"
          rel="noopener noreferrer"
        >
          Blog
        </a>
      </div>
    </footer>
  );
};

export default Footer;
