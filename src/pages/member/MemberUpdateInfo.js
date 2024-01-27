import { useSelector } from "react-redux";
import {
  BirthDateInput,
  EmailInput,
  GenderInput,
  NameInput,
  NickInput,
  UserIdInput,
} from "../../component/MemberInput";
import { MdEdit } from "react-icons/md";
import { Button } from "../../component/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateMemberInfoAPI } from "../../api/MemberApis";

function MemberUpdateInfo() {
  const { userId, email, nick, name, gender, birthDate } = useSelector(
    (state) => state.memberInfo
  );

  let [birthDateYear, birthDateMonth, birthDateDay] = [null, null, null];
  if (birthDate != null) {
    [birthDateYear, birthDateMonth, birthDateDay] = birthDate.split("-");
  }

  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    setValue("userId", userId);
    setValue("email", email);
    setValue("nick", nick);
    setValue("name", name);
    setValue("gender", gender);
    setValue("birthDateYear", birthDateYear);
    setValue("birthDateMonth", birthDateMonth);
    setValue("birthDateDay", birthDateDay);
  }, [
    birthDateDay,
    birthDateMonth,
    birthDateYear,
    email,
    gender,
    name,
    nick,
    setValue,
    userId,
  ]);

  const onValid = async ({
    nick,
    name,
    gender,
    birthDateYear,
    birthDateMonth,
    birthDateDay,
  }) => {
    setApiLoading(true);

    let birthDate = null;
    if (birthDateYear && birthDateMonth && birthDateDay) {
      birthDate = birthDateYear + "-" + birthDateMonth + "-" + birthDateDay;
    } else {
      setValue("birthDateYear", null);
      setValue("birthDateMonth", null);
      setValue("birthDateDay", null);
    }

    const response = await updateMemberInfoAPI({
      nick,
      ...(name ? { name } : {}),
      ...(gender ? { gender } : {}),
      ...(birthDate ? { birthDate } : {}),
    });

    if (response.status) {
      alert("회원정보 수정이 완료 되었습니다!");
      window.location.reload();
    } else {
      setApiError(response.statusMessage);
    }
    setApiLoading(false);
  };

  return (
    <>
      <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
        <div className="rounded-md shadow-sm -space-y-px">
          <UserIdInput
            register={register}
            errors={errors}
            isPatternDisabled={true}
            isDisabled={true}
          />
          <EmailInput register={register} errors={errors} isDisabled={true} />
          <NickInput register={register} errors={errors} />

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
          <Button color="purple" isApiLoading={isApiLoading} icon={MdEdit}>
            회원정보 수정
          </Button>
        </div>
      </form>
    </>
  );
}

export default MemberUpdateInfo;
