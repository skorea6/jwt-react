import { CurrentPasswordInput, EmailInput } from "../../component/MemberInput";
import { MdEdit } from "react-icons/md";
import { Button } from "../../component/Button";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  updateMemberEmailSendEmailAPI,
  updateMemberEmailCheckEmailAPI,
} from "../../api/MemberApis";
import EmailVerification from "../auth/EmailVerification";
import ReCAPTCHA from "react-google-recaptcha";

function MemberUpdateEmail() {
  const recaptchaRef = useRef(null);

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [verificationToken, setVerificationToken] = useState(null);
  const [email, setEmail] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ email, currentPassword }) => {
    const recaptchaResponse = recaptchaRef.current.getValue();

    if (recaptchaResponse === "") {
      setApiError("구글 캡챠 인증을 진행해주세요.");
    } else {
      setApiLoading(true);

      const response = await updateMemberEmailSendEmailAPI({
        email,
        currentPassword,
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
    return updateMemberEmailCheckEmailAPI({
      token: verificationToken,
      verificationNumber,
    });
  };

  const verificationOnSuccess = () => {
    alert("이메일 수정이 완료 되었습니다!");
    window.location.reload();
  };

  return (
    <>
      {verificationToken ? (
        <EmailVerification
          email={email}
          btnMessage={"이메일 수정 끝내기"}
          onValid={verificationOnValid}
          onSuccess={verificationOnSuccess}
        />
      ) : (
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <EmailInput
              register={register}
              errors={errors}
              namePrefix={"새로운"}
              isDisabled={false}
            />
            <CurrentPasswordInput register={register} errors={errors} />
            <div className="flex justify-center pt-3">
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
            <Button color="blue" isApiLoading={isApiLoading} icon={MdEdit}>
              이메일 수정
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default MemberUpdateEmail;
