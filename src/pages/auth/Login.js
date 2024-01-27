import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi";
import { loginAPI } from "../../api/AuthApis";
import { FormInput } from "../../assets/styles/GlobalForm";

import { useState } from "react";
import { setLoginAccessToken } from "../../storage/LoginLocalStorage";
import { setLoginRefreshToken } from "../../storage/LoginCookie";
import { Button } from "../../component/Button";
import AuthContainer from "../../component/AuthContainer";
import { SocialButton } from "../../component/SocialButton";

function Login() {
  const navigate = useNavigate();

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ userId, password }) => {
    setApiLoading(true);
    const response = await loginAPI({ userId, password });

    if (response.status) {
      // 쿠키에 Refresh Token, 로컬스토리지에 Access Token 저장
      setLoginRefreshToken(response.data.refreshToken);
      setLoginAccessToken(response.data.accessToken);

      // const memberInfo = await memberInfoAPI(
      //   incrementLoading,
      //   decrementLoading
      // );
      // dispatch(SET_MEMBER_INFO(memberInfo.data));

      return navigate("/");
    } else {
      setApiError(response.statusMessage);
    }
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer title="지금 로그인하세요!">
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput
              label="아이디"
              name="userId"
              type="text"
              register={register}
              requiredMessage="아이디를 입력해주세요"
              placeholder="아이디 입력"
              errors={errors}
            />
            <FormInput
              label="비밀번호"
              name="password"
              type="password"
              register={register}
              requiredMessage="비밀번호를 입력해주세요"
              placeholder="비밀번호 입력"
              errors={errors}
            />
          </div>
          <div>
            {apiError && (
              <p className="text-sm font-medium text-rose-500">{apiError}</p>
            )}
          </div>
          <div>
            <Button
              color="pink"
              isApiLoading={isApiLoading}
              icon={HiLockClosed}
            >
              로그인
            </Button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link
            to="/auth/find/user-id"
            className="text-blue-500 hover:text-blue-700"
          >
            아이디 찾기
          </Link>
          <span className="text-gray-500 mx-2">|</span>
          <Link
            to="/auth/find/password"
            className="text-blue-500 hover:text-blue-700"
          >
            비밀번호 찾기
          </Link>
          <span className="text-gray-500 mx-2">|</span>
          <Link to="/auth/signup" className="text-blue-500 hover:text-blue-700">
            회원가입
          </Link>
        </div>
        <hr className="pb-3" />
        <div className="flex flex-col space-y-3">
          <SocialButton name="naver">네이버로 로그인</SocialButton>
          <SocialButton name="kakao">카카오로 로그인</SocialButton>
          <SocialButton name="google">구글로 로그인</SocialButton>
        </div>
      </AuthContainer>
    </>
  );
}

export default Login;
