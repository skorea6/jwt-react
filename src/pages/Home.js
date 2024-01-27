import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { userId, email, nick, name, gender } = useSelector(
    (state) => state.memberInfo
  );

  return (
    <div className="container mx-auto p-4 max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4">홈 화면</h1>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {userId ? (
          <>
            <p className="text-xl font-bold mb-4">환영합니다!</p>
            <p>UserID: {userId || ""}</p>
            <p>Email: {email || ""}</p>
            <p>Nickname: {nick || ""}</p>
            <p>Name: {name || ""}</p>
            <p>Gender: {gender || ""}</p>
          </>
        ) : (
          <p>로그인 유저가 아닙니다.</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        {userId ? (
          <Link
            to="/auth/logout"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            로그아웃
          </Link>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              로그인
            </Link>
            <Link
              to="/auth/signup"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              회원가입
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
