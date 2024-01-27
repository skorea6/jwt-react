import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiMail } from "react-icons/hi";
import { Button } from "../../component/Button";
import {
  EmailInput,
  VerificationNumberInput,
} from "../../component/MemberInput";

const EmailVerification = ({ email, btnMessage, onValid, onSuccess }) => {
  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue("email", email);
    setApiError("이메일로 인증번호가 전송되었습니다!");
  }, [setValue, email, setApiError]);

  const handleValid = async (data) => {
    try {
      setApiLoading(true);
      const response = await onValid(data);

      if (response.status) {
        setApiError(null);
        onSuccess();
      } else {
        setApiError(response.statusMessage);
      }
    } catch (error) {
      setApiError(error);
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <EmailInput register={register} errors={errors} isDisabled={true} />
        <VerificationNumberInput register={register} errors={errors} />
      </div>
      <div className="mt-3">
        {apiError && (
          <p className="text-sm font-medium text-rose-500">{apiError}</p>
        )}
      </div>
      <div className="mt-3">
        <Button color="pink" isApiLoading={isApiLoading} icon={HiMail}>
          {btnMessage ? btnMessage : "인증코드 확인"}
        </Button>
      </div>
    </form>
  );
};

export default EmailVerification;
