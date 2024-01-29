import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { userId, email, nick, name, gender, imageUrl } = useSelector(
    (state) => state.memberInfo
  );

  const bgColor = userId ? "bg-green-100" : "bg-rose-100";

  return (
    <div className="container mx-auto p-4 max-w-md w-full">
      <h1 className="text-3xl font-bold mb-4">홈 화면</h1>

      <div className={`${bgColor} shadow-md rounded px-8 pt-6 pb-8 mb-4`}>
        {userId ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xl font-bold mb-4">환영합니다!</p>
              {imageUrl && (
                <img
                  alt="프로필 사진"
                  src={imageUrl}
                  className="max-w-[100px] h-auto mb-4"
                />
              )}
            </div>
            {userId && <p>아이디: {userId}</p>}
            {email && <p>이메일: {email}</p>}
            {nick && <p>닉네임: {nick}</p>}
            {name && <p>이름: {name}</p>}
            {gender && <p>성별: {gender}</p>}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>로그인이 필요한 서비스입니다.</p>
          </div>
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
