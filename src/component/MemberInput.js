/* eslint-disable no-useless-escape */

import React from "react";
import {
  FormDateSelect,
  FormInput,
  FormSelect,
} from "../assets/styles/GlobalForm";

const UserIdInput = ({ register, errors, isPatternDisabled, isDisabled }) => {
  const pattern = isPatternDisabled
    ? undefined
    : {
        value: /^(?!kakao_|google_|naver_)[a-z0-9_]{4,20}$/,
        message:
          "영어 소문자, 숫자, 언더바만 가능하며, 4~20자리로 입력해주세요.",
      };
  return (
    <FormInput
      label="아이디"
      name="userId"
      type="text"
      register={register}
      requiredMessage="아이디를 입력해주세요"
      pattern={pattern}
      placeholder="아이디 입력"
      errors={errors}
      disabled={isDisabled}
    />
  );
};

const EmailInput = ({ register, errors, namePrefix, isDisabled }) => {
  const name = namePrefix ? `${namePrefix} ` : "";

  return (
    <FormInput
      label={`${name} 이메일`}
      name="email"
      type="email"
      register={register}
      requiredMessage={`${name} 이메일 주소를 입력해주세요`}
      placeholder={`${name} 이메일 주소 입력`}
      errors={errors}
      disabled={isDisabled}
    />
  );
};

const NickInput = ({ register, errors }) => {
  return (
    <FormInput
      label="닉네임"
      name="nick"
      type="text"
      register={register}
      requiredMessage="닉네임을 입력해주세요"
      pattern={{
        value:
          /^(?!kakao_|google_|naver_)[a-zA-Z0-9가-힣!@#$%^&*()\-=\[\]{};':"\\,.<>/?|ㄱ-ㅎㅏ-ㅣ_ ]{2,20}$/,
        message:
          "영어, 한글, 숫자, 특정 특수문자만 가능하며, 2~20자리로 입력해주세요.",
      }}
      placeholder="닉네임 입력"
      errors={errors}
    />
  );
};

const CurrentPasswordInput = ({ register, errors }) => {
  return (
    <FormInput
      label="현재 비밀번호"
      name="currentPassword"
      type="password"
      register={register}
      requiredMessage="현재 비밀번호를 입력해주세요"
      placeholder="현재 비밀번호 입력"
      errors={errors}
    />
  );
};

const PasswordInput = ({ register, errors, namePrefix }) => {
  const name = namePrefix ? `${namePrefix} ` : "";
  return (
    <FormInput
      label={`${name} 비밀번호`}
      name="password"
      type="password"
      register={register}
      requiredMessage={`${name} 비밀번호를 입력해주세요`}
      pattern={{
        value:
          /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\,.<>?|`~])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\,.<>?|`~]{8,20}$/,
        message: "영어, 숫자, 특수문자를 포함한 8~20자리로 입력해주세요.",
      }}
      placeholder={`${name} 비밀번호 입력`}
      errors={errors}
    />
  );
};

const PasswordReInput = ({ register, errors, namePrefix }) => {
  const name = namePrefix ? `${namePrefix} ` : "";
  return (
    <FormInput
      label={`${name} 비밀번호 재입력`}
      name="passwordRe"
      type="password"
      register={register}
      requiredMessage={`${name} 비밀번호를 재입력해주세요`}
      placeholder={`${name} 비밀번호 재입력`}
      errors={errors}
    />
  );
};

const NameInput = ({ register, errors }) => {
  return (
    <FormInput
      label="이름"
      name="name"
      type="text"
      register={register}
      pattern={{
        value: /^[a-zA-Z가-힣 ]{1,20}$/,
        message: "영문, 한글만 가능하며, 1~20자리로 입력해주세요.",
      }}
      placeholder="이름 입력"
      errors={errors}
    />
  );
};

const GenderInput = ({ register, errors }) => {
  return (
    <FormSelect
      label="성별"
      name="gender"
      register={register}
      errors={errors}
      options={[
        { value: "MAN", label: "남자" },
        { value: "WOMAN", label: "여자" },
      ]}
    />
  );
};

const BirthDateInput = ({ register, errors }) => {
  return (
    <FormDateSelect
      label="생년월일"
      register={register}
      errors={errors}
      namePrefix="birthDate"
    />
  );
};

const VerificationNumberInput = ({ register, errors }) => {
  return (
    <FormInput
      label="인증 코드"
      name="verificationNumber"
      type="text"
      register={register}
      requiredMessage="인증 코드를 입력해주세요"
      placeholder="인증 코드 입력"
      errors={errors}
    />
  );
};

export {
  UserIdInput,
  EmailInput,
  NickInput,
  PasswordInput,
  PasswordReInput,
  NameInput,
  GenderInput,
  BirthDateInput,
  CurrentPasswordInput,
  VerificationNumberInput,
};
