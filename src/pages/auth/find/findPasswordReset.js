import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { findPasswordByEmailResetPasswordAPI } from "../../../api/AuthApis";
import { MdEdit } from "react-icons/md";
import { Button } from "../../../component/Button";
import AuthContainer from "../../../component/AuthContainer";
import { PasswordInput, PasswordReInput } from "../../../component/MemberInput";

function FindPasswordReset() {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.emailToken);
  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    if (token == null) {
      return navigate("/auth/find/password");
    }
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ password, passwordRe }) => {
    setApiLoading(true);

    if (password !== passwordRe) {
      setApiError("비밀번호와 비밀번호 재입력칸이 동일하지 않습니다.");
    } else {
      const response = await findPasswordByEmailResetPasswordAPI({
        password,
        emailVerificationToken: token,
      });

      if (response.status) {
        setApiError(null);
        alert("새로운 비밀번호로 수정 되었습니다!");
        return navigate("/auth/login");
      } else {
        setApiError(response.statusMessage);
      }
    }
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer title="새로운 비밀번호 변경">
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <PasswordInput
              register={register}
              errors={errors}
              namePrefix={"새로운"}
            />
            <PasswordReInput
              register={register}
              errors={errors}
              namePrefix={"새로운"}
            />
          </div>
          <div className="mt-3">
            {apiError && (
              <p className="text-sm font-medium text-rose-500">{apiError}</p>
            )}
          </div>
          <div className="mt-3">
            <Button color="indigo" isApiLoading={isApiLoading} icon={MdEdit}>
              비밀번호 변경
            </Button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}

export default FindPasswordReset;
