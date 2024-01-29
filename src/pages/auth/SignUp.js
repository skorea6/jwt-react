import { useState, useRef } from "react";
import { HiMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import {
  signUpVerificationEmailCheckAPI,
  signUpVerificationEmailSendAPI,
} from "../../api/AuthApis";
import EmailVerification from "./EmailVerification";
import { Button } from "../../component/Button";
import AuthContainer from "../../component/AuthContainer";
import { SocialButton } from "../../component/SocialButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EmailInput } from "../../component/MemberInput";
import { SET_EMAIL_TOKEN } from "../../store/EmailToken";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [verificationToken, setVerificationToken] = useState(null);
  const [email, setEmail] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ email }) => {
    const recaptchaResponse = recaptchaRef.current.getValue();

    if (recaptchaResponse === "") {
      setApiError("구글 캡챠 인증을 진행해주세요.");
    } else {
      setApiLoading(true);

      const response = await signUpVerificationEmailSendAPI({
        email,
        recaptchaResponse,
      });

      if (response.status) {
        setApiError(null);
        setEmail(email);
        setVerificationToken(response.data.token);
      } else {
        recaptchaRef.current.reset();
        setApiError(response.statusMessage);
      }
      setApiLoading(false);
    }
  };

  const verificationOnValid = async ({ verificationNumber }) => {
    return signUpVerificationEmailCheckAPI({
      token: verificationToken,
      verificationNumber,
    });
  };

  const verificationOnSuccess = () => {
    dispatch(SET_EMAIL_TOKEN({ verificationToken, email }));
    navigate("/auth/signup/email");
  };

  return (
    <>
      <AuthContainer title="회원가입">
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-2 text-sm text-gray-500 bg-white px-2">
              간편 회원가입
            </span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          {/* 간편회원가입 섹션 */}
          <div className="flex flex-col space-y-3">
            {/* 네이버로 회원가입 버튼 */}
            <SocialButton name="naver">네이버로 회원가입</SocialButton>

            {/* 카카오로 회원가입 버튼 */}
            <SocialButton name="kakao">카카오로 회원가입</SocialButton>

            {/* 구글로 회원가입 버튼 */}
            <SocialButton name="google">구글로 회원가입</SocialButton>
          </div>
        </div>

        {/* 일반회원가입 섹션 */}
        <hr />
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-2 text-sm text-gray-500 bg-white px-2">
            일반 회원가입
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        {verificationToken ? (
          <EmailVerification
            email={email}
            onValid={verificationOnValid}
            onSuccess={verificationOnSuccess}
          />
        ) : (
          <form onSubmit={handleSubmit(onValid)} className="space-y-3">
            <div>
              <EmailInput
                register={register}
                errors={errors}
                isDisabled={false}
              />
              <div className="flex justify-center mt-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                />
              </div>
            </div>
            <div className="mt-3">
              {apiError && (
                <p className="text-sm font-medium text-rose-500">{apiError}</p>
              )}
            </div>
            <div className="mt-3">
              <Button color="pink" isApiLoading={isApiLoading} icon={HiMail}>
                이메일 주소로 회원가입
              </Button>
            </div>
          </form>
        )}

        <div className="text-center py-3">
          <span className="text-gray-500">회원이신가요?</span>
          <span className="mx-1"></span>
          <Link to="/auth/login" className="text-blue-500 hover:text-blue-700">
            로그인하기
          </Link>
        </div>
      </AuthContainer>
    </>
  );
};

export default SignUp;
