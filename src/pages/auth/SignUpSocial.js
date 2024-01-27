import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HiMail } from "react-icons/hi";
import { Button } from "../../component/Button";
import AuthContainer from "../../component/AuthContainer";

import { signUpOauth2InfoAPI, signUpOauth2API } from "../../api/AuthApis";
import { setLoginAccessToken } from "../../storage/LoginLocalStorage";
import { setLoginRefreshToken } from "../../storage/LoginCookie";

import {
  EmailInput,
  NickInput,
  NameInput,
  GenderInput,
  BirthDateInput,
} from "../../component/MemberInput";
import useApiWithLoading from "../../api/useApiWithLoading";

function SignUpSocial() {
  const location = useLocation();
  const navigate = useNavigate();

  const callSignUpOauth2InfoAPI = useRef(
    useApiWithLoading(signUpOauth2InfoAPI)
  );

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [socialInfo, setSocialInfo] = useState(null);
  const [isApiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const checkToken = async () => {
      if (token == null || token === "") {
        navigate("/auth/signup");
      } else {
        const socialResponse = await callSignUpOauth2InfoAPI.current({ token });
        if (socialResponse.status) {
          setSocialInfo(socialResponse.data);
        } else {
          // alert(socialResponse.statusMessage);
          navigate("/auth/signup");
        }
      }
    };

    checkToken();
  }, [token, navigate]);

  useEffect(() => {
    setValue("email", socialInfo && socialInfo.email);
    setValue("nick", socialInfo && socialInfo.socialNick);
  }, [setValue, socialInfo]);

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
    }

    const response = await signUpOauth2API({
      nick,
      ...(name ? { name } : {}),
      ...(gender ? { gender } : {}),
      ...(birthDate ? { birthDate } : {}),
      token,
    });

    if (response.status) {
      setApiError(null);
      alert("회원가입이 완료 되었습니다!");

      // 쿠키에 Refresh Token, 로컬스토리지에 Access Token 저장
      setLoginRefreshToken(response.data.refreshToken);
      setLoginAccessToken(response.data.accessToken);

      // const memberInfo = await memberInfoAPI();
      // dispatch(SET_MEMBER_INFO(memberInfo.data));

      return navigate("/");
    } else {
      setApiError(response.statusMessage);
    }
    setApiLoading(false);
  };

  return (
    <>
      <AuthContainer
        title={socialInfo && socialInfo.socialType + " 소셜 회원가입"}
      >
        <form className="mt-8 space-y-3" onSubmit={handleSubmit(onValid)}>
          <div className="rounded-md shadow-sm -space-y-px">
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
            <Button color="indigo" isApiLoading={isApiLoading} icon={HiMail}>
              회원가입 끝내기
            </Button>
          </div>
        </form>
      </AuthContainer>
    </>
  );
}

export default SignUpSocial;
