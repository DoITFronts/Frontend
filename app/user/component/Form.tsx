"use client";

import cn from "clsx";
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useState,
} from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import Button from "@/components/ui/button/Button";
import Icon from "@/components/utils/Icon";
import VALIDATION_RULES, {
  type Field,
  PASSWORD_CONFIRM_RULES,
} from "@/lib/formValidation";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (data: any) => void;
}
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: Field;
}
interface BaseProps {
  children: ReactNode | undefined;
  className?: string;
}

export default function Form({ onSubmit, id, className, children }: FormProps) {
  const methods = useForm();

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        id={id}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}

function Label({ children, className }: LabelProps) {
  return <label className={cn("block", className)}>{children}</label>;
}

function LabelHeader({ children, className }: BaseProps) {
  return (
    <h2
      className={cn(
        "font-['Pretendard'] text-sm font-bold leading-tight text-black-8",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function ErrorMessage({ className, children }: BaseProps) {
  return (
    <span
      className={cn(
        "mt-2 inline-block font-['Pretendard'] text-sm font-semibold leading-tight text-red-6",
        className,
      )}
    >
      {children}
    </span>
  );
}

const baseInputStyle =
  "focus:outline-black-7 h-11 w-full px-4 py-2.5 bg-black-2 rounded-xl text-base font-medium font-['Pretendard']";
const baseInputErrorStyle =
  "outline outline-2 outline-red-500 focus:outline-gray-500";

function handleKeyUp(
  e: React.KeyboardEvent<HTMLInputElement>,
  trigger: any,
  name: Field,
) {
  if (e.key === "Enter") {
    e.preventDefault();
    trigger(name).then(() => {
      const formElements = Array.from(
        (e.target as HTMLInputElement).form?.elements || [],
      ) as HTMLInputElement[];
      const currentIndex = formElements.indexOf(e.target as HTMLInputElement);
      const nextElement = formElements[currentIndex + 1];
      if (nextElement) nextElement.focus();
    });
  }
}

function InputBase({
  className,
  name,
  type = "text",
  placeholder,
  registerOptions,
  showPasswordToggle,
  togglePasswordVisibility,
  ...rest
}: InputProps & {
  registerOptions?: any;
  showPasswordToggle?: boolean;
  togglePasswordVisibility?: () => void;
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  return (
    <div className="relative">
      <input
        {...register(name, registerOptions)}
        className={cn(
          baseInputStyle,
          { [baseInputErrorStyle]: !!errors[name] },
          className,
        )}
        {...rest}
        type={type}
        placeholder={placeholder || name}
        onBlur={() => trigger(name)}
        onKeyUp={(e) => handleKeyUp(e, trigger, name)}
      />
      {showPasswordToggle && (
        <button
          type="button"
          className="absolute bottom-2 right-4"
          onClick={togglePasswordVisibility}
        >
          <Icon
            path={type === "password" ? "user/unVisibility" : "user/visibility"}
          />
        </button>
      )}
      {errors[name]?.message && (
        <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>
      )}
    </div>
  );
}

function Input({ className, name, ...rest }: InputProps) {
  return (
    <InputBase
      className={className}
      name={name}
      registerOptions={VALIDATION_RULES[name]}
      {...rest}
    />
  );
}

function PasswordInput({ className, name, ...rest }: InputProps) {
  const {
    formState: { errors },
    getValues,
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const registerOptions =
    name === "passwordConfirmation"
      ? PASSWORD_CONFIRM_RULES(getValues("password"))
      : VALIDATION_RULES[name];

  return (
    <InputBase
      className={className}
      name={name}
      type={showPassword ? "text" : "password"}
      registerOptions={registerOptions}
      showPasswordToggle={true}
      togglePasswordVisibility={togglePasswordVisibility}
      {...rest}
    />
  );
}

function Submit({ className, children }: BaseProps) {
  const { formState } = useFormContext();
  return (
    <Button
      type="submit"
      className={className}
      color="filled"
      disabled={!formState.isValid}
    >
      {children}
    </Button>
  );
}

Form.Label = Label;
Form.LabelHeader = LabelHeader;
Form.Input = Input;
Form.PasswordInput = PasswordInput;
Form.Submit = Submit;
Form.ErrorMessage = ErrorMessage;
