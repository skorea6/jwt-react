import tw from "twin.macro";
import { ErrorMessage } from "@hookform/error-message";

const GlobalForm = () => {
  // 로직
};

const Input = tw.input`
  appearance-none rounded-none relative block w-full px-3 py-2
  border border-gray-300 placeholder-gray-500 text-gray-900
  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
  focus:z-10 sm:text-sm
  disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
`;

const Select = tw.select`
  appearance-none rounded-none relative block w-full px-3 py-2
  border border-gray-300 bg-white text-gray-900
  rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
  focus:z-10 sm:text-sm
  disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200
`;

const renderSelectOption = (value, label) => {
  const isPlaceholder = value === "";
  if (value !== "") {
    value = value.toString().padStart(2, "0");
  }
  return (
    <option
      key={label}
      value={value}
      className={isPlaceholder ? "text-gray-500" : ""}
    >
      {label}
    </option>
  );
};

const FormInput = ({
  label,
  name,
  type,
  register,
  requiredMessage,
  pattern,
  errors,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="pt-3">
      <label htmlFor={name}>
        {label} {requiredMessage && <span className="text-red-500">*</span>}
      </label>
      <Input
        {...register(name, {
          required: requiredMessage ? requiredMessage : false,
          pattern: pattern ? pattern : undefined,
        })}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete={type === "password" ? "on" : undefined}
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p className="text-sm font-medium text-rose-500">{message}</p>
        )}
      />
    </div>
  );
};

const FormSelect = ({
  label,
  name,
  register,
  requiredMessage,
  errors,
  options, // 드롭다운 메뉴의 옵션들
  disabled = false,
}) => {
  return (
    <div className="pt-3">
      <label htmlFor={name}>{label}</label>
      <Select
        {...register(name, {
          required: requiredMessage ? requiredMessage : false,
        })}
        disabled={disabled}
      >
        {renderSelectOption("", label + " 선택")}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p className="text-sm font-medium text-rose-500">{message}</p>
        )}
      />
    </div>
  );
};

const FormDateSelect = ({ label, register, errors, namePrefix }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="pt-3">
      <label>{label}</label>
      <div className="flex space-x-2">
        <Select {...register(`${namePrefix}Year`)}>
          {renderSelectOption("", "연도 선택")}
          {years.map((year) => renderSelectOption(year, year + "년"))}
        </Select>
        <Select {...register(`${namePrefix}Month`)}>
          {renderSelectOption("", "월 선택")}
          {months.map((month) => renderSelectOption(month, month + "월"))}
        </Select>
        <Select {...register(`${namePrefix}Day`)}>
          {renderSelectOption("", "일 선택")}
          {days.map((day) => renderSelectOption(day, day + "일"))}
        </Select>
      </div>
      <ErrorMessage
        name={`${namePrefix}Date`}
        errors={errors}
        render={({ message }) => (
          <p className="text-sm font-medium text-rose-500">{message}</p>
        )}
      />
    </div>
  );
};

export { Input, FormInput, FormSelect, FormDateSelect, GlobalForm };
