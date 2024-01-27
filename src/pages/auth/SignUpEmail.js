import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUpEmailAPI } from "../../api/AuthApis";
import { HiMail } from "react-icons/hi";
import { Button } from "../../component/Button";
import AuthContainer from "../../component/AuthContainer";
import {
  UserIdInput,
  EmailInput,
  NickInput,
  PasswordInput,
  PasswordReInput,
  NameInput,
  GenderInput,
  BirthDateInput,
} from "../../component/MemberInput";

function SignUpEmail() {
  const navigate = useNavigate();

  const { token, email } = useSelector((state) => state.emailToken);
  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (token == null) {
      return navigate("/auth/signup");
    }
  });

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue("email", email);
  });

  const onValid = async ({
    userId,
    nick,
    password,
    passwordRe,
    name,
    gender,
    birthDateYear,
    birthDateMonth,
    birthDateDay,
  }) => {
    setApiLoading(true);

    if (password !== passwordRe) {
      setApiError("비밀번호와 비밀번호 재입력칸이 동일하지 않습니다.");
    } else {
      let birthDate = null;
      if (birthDateYear && birthDateMonth && birthDateDay) {
        birthDate = birthDateYear + "-" + birthDateMonth + "-" + birthDateDay;
      }

      const response = await signUpEmailAPI({
        userId,
        nick,
        password,
        ...(name ? { name } : {}),
        ...(gender ? { gender } : {}),
        ...(birthDate ? { birthDate } : {}),
        emailVerificationToken: token,
      });

      if (response.status) {
        setApiError(null);
        alert("회원가입이 완료 되었습니다!");
        return navigate("/auth/login");
      } else {
        setApiError(response.statusMessage);
      }
    }
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer title="일반 회원가입">
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <UserIdInput
              register={register}
              errors={errors}
              isDisabled={false}
            />
            <EmailInput register={register} errors={errors} isDisabled={true} />
            <NickInput register={register} errors={errors} />
            <PasswordInput register={register} errors={errors} />
            <PasswordReInput register={register} errors={errors} />

            <br />
            <hr />
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="mx-2 text-sm text-gray-500 bg-white px-2 self-center">
                선택 입력사항
              </span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            <NameInput register={register} errors={errors} />
            <GenderInput register={register} errors={errors} />
            <BirthDateInput register={register} errors={errors} />
          </div>
          <div className="mt-3">
            {apiError && (
              <p className="text-sm font-medium text-rose-500">{apiError}</p>
            )}
          </div>
          <div className="mt-3">
            <Button color="indigo" isApiLoading={isApiLoading} icon={HiMail}>
              회원가입 끝내기
            </Button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}

export default SignUpEmail;
