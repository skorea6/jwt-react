import { useState, useRef } from "react";
import { HiMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Button } from "../../../component/Button";
import AuthContainer from "../../../component/AuthContainer";
import { EmailInput, UserIdInput } from "../../../component/MemberInput";
import {
  findPasswordByEmailSendEmailAPI,
  findPasswordByEmailCheckEmailAPI,
} from "../../../api/AuthApis";
import { useNavigate } from "react-router-dom";
import EmailVerification from "../EmailVerification";
import { SET_EMAIL_TOKEN } from "../../../store/EmailToken";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";

const FindPassword = () => {
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

  const onValid = async ({ userId, email }) => {
    const recaptchaResponse = recaptchaRef.current.getValue();

    if (recaptchaResponse === "") {
      setApiError("구글 캡챠 인증을 진행해주세요.");
    } else {
      setApiLoading(true);
      const response = await findPasswordByEmailSendEmailAPI({
        userId,
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
    return findPasswordByEmailCheckEmailAPI({
      token: verificationToken,
      verificationNumber,
    });
  };

  const verificationOnSuccess = () => {
    dispatch(SET_EMAIL_TOKEN({ verificationToken, email }));
    navigate("/auth/find/password/reset");
  };

  return (
    <>
      <AuthContainer title="비밀번호 찾기 (by 이메일)">
        {verificationToken ? (
          <EmailVerification
            email={email}
            onValid={verificationOnValid}
            onSuccess={verificationOnSuccess}
          />
        ) : (
          <form onSubmit={handleSubmit(onValid)} className="space-y-3">
            <div>
              <UserIdInput
                register={register}
                errors={errors}
                isDisabled={false}
              />
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
              <Button color="green" isApiLoading={isApiLoading} icon={HiMail}>
                이메일 주소로 비밀번호 찾기
              </Button>
            </div>
          </form>
        )}
      </AuthContainer>
    </>
  );
};

export default FindPassword;
