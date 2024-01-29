import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { userId } = useSelector((state) => state.memberInfo);

  return (
    <div className="header flex flex-col items-center justify-center text-center py-4">
      <h1 className="text-2xl font-bold mb-4">
        <Link to="/" className="text-purple-600 hover:text-purple-800">
          JWT 인증 사이트 + oAuth2
        </Link>
      </h1>
      <div className="menu flex space-x-4">
        {userId && (
          <>
            <Link
              to="/member/update"
              className="link text-blue-500 hover:text-blue-700"
            >
              회원정보수정
            </Link>
            <Link
              to="/member/login-list"
              className="link text-blue-500 hover:text-blue-700"
            >
              현재로그인목록
            </Link>
            <Link
              to="/member/delete"
              className="link text-blue-500 hover:text-blue-700"
            >
              회원탈퇴
            </Link>
          </>
        )}
        {/* <Link to="/test2" className="link text-blue-500 hover:text-blue-700">
          테스트2 (공개)
        </Link> */}
        {!userId && (
          <>
            <Link
              to="/auth/login"
              className="link text-blue-500 hover:text-blue-700"
            >
              로그인
            </Link>
            <Link
              to="/auth/signup"
              className="link text-blue-500 hover:text-blue-700"
            >
              회원가입
            </Link>
          </>
        )}
        {userId && (
          <Link
            to="/auth/logout"
            className="link text-blue-500 hover:text-blue-700"
          >
            로그아웃
          </Link>
        )}
      </div>

      <hr className="my-4 h-0.5 bg-gray-300 w-full" />
    </div>
  );
}
