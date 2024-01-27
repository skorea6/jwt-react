import { useState, useRef } from "react";
import { HiMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { Button } from "../../../component/Button";
import AuthContainer from "../../../component/AuthContainer";
import { EmailInput } from "../../../component/MemberInput";
import { findUserIdByEmailAPI } from "../../../api/AuthApis";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const FindUserId = () => {
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

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
      const response = await findUserIdByEmailAPI({ email, recaptchaResponse });

      if (response.status) {
        setApiError(null);
        alert("이메일이 전송 되었습니다! 이메일에서 아이디를 확인해주세요.");
        navigate("/auth/login");
      } else {
        recaptchaRef.current.reset();
        setApiError(response.statusMessage);
      }
      setApiLoading(false);
    }
  };

  return (
    <>
      <AuthContainer title="아이디 찾기 (by 이메일)">
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
            <Button color="green" isApiLoading={isApiLoading} icon={HiMail}>
              이메일 주소로 아이디 찾기
            </Button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default FindUserId;
