import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { LoginInputProps } from "@/models/user.schemas";
import { FiAlertCircle } from "react-icons/fi";

interface InputProps extends FieldValues {
  label: string;
  name: Path<LoginInputProps>;
  placeholder: string;
  type: "email" | "password" | "text";
  register: UseFormRegister<LoginInputProps>;
  errors: FieldErrors<LoginInputProps>;
}

export default function Input({
  label,
  name,
  placeholder,
  register,
  type,
  errors,
}: InputProps) {
  return (
    <div className='relative flex flex-col gap-2'>
      <label htmlFor=''>{label}</label>
      <input
        type={type}
        aria-invalid={errors[name] ? "true" : "false"}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        placeholder={placeholder}
        {...register(name)}
        className='border-b bg-transparent p-2 text-white outline-fuchsia-500'
      />
      {errors[name] && (
        <div
          id={`${name}-error`}
          role='alert'
          className='absolute -bottom-6 flex items-center gap-2 text-sm text-red-500'
        >
          <FiAlertCircle size={16} />
          <span>{errors[name]?.message}</span>
        </div>
      )}
    </div>
  );
}
