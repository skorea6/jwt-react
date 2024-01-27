import {
  CurrentPasswordInput,
  PasswordInput,
  PasswordReInput,
} from "../../component/MemberInput";
import { MdEdit } from "react-icons/md";
import { Button } from "../../component/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateMemberPasswordAPI } from "../../api/MemberApis";
import { useNavigate } from "react-router-dom";

function MemberUpdatePassword() {
  const navigate = useNavigate();

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onValid = async ({ password, passwordRe, currentPassword }) => {
    setApiLoading(true);

    if (password !== passwordRe) {
      setApiError("비밀번호와 비밀번호 재입력칸이 동일하지 않습니다.");
    } else {
      const response = await updateMemberPasswordAPI({
        password,
        currentPassword,
      });

      if (response.status) {
        alert(
          "비밀번호 수정이 완료 되었습니다! 모든 기기에서 로그아웃 되었습니다."
        );
        navigate("/auth/logout");
      } else {
        setApiError(response.statusMessage);
      }
    }
    setApiLoading(false);
  };

  return (
    <>
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
          <CurrentPasswordInput register={register} errors={errors} />
        </div>
        <div className="mt-3">
          {apiError && (
            <p className="text-sm font-medium text-rose-500">{apiError}</p>
          )}
        </div>
        <div className="mt-3">
          <Button color="red" isApiLoading={isApiLoading} icon={MdEdit}>
            비밀번호 수정
          </Button>
        </div>
      </form>
    </>
  );
}

export default MemberUpdatePassword;
