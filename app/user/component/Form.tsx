'use client';

import cn from 'clsx';
import {
  FormHTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useState,
} from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';

import Icon from '@/components/utils/Icon';
import Button from '@/components/ui/button/Button';
import VALIDATION_RULES, { type Field, PASSWORD_CONFIRM_RULES } from '@/lib/formValidation';

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
      <form onSubmit={methods.handleSubmit(handleFormSubmit)} id={id} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}

function Label({ children, className }: LabelProps) {
  const labelClass = cn('block', className);

  return <label className={labelClass}> {children} </label>;
}

//인풋 라벨 헤더
function LabelHeader({ children, className }: BaseProps) {
  const headerClass = cn(
    "font-['Pretendard'] text-black-8 text-sm font-bold leading-tight",
    className,
  );

  return <h2 className={headerClass}>{children}</h2>;
}

// 인풋 기본 스타일
const baseInputStyle =
  "focus:outline-black-7 h-11 w-full px-4 py-2.5 bg-black-2 rounded-xl justify-start items-center gap-2.5 inline-flex overflow-hidden text-base font-medium font-['Pretendard'] leading-normal";

const baseInputErrorStyle = 'outline outline-2 outline-red-500 focus:outline-gray-500';

function ErrorMessage({ className, children }: BaseProps) {
  const errorClass = cn(
    "inline-block mt-2 text-red-6 text-sm font-semibold font-['Pretendard'] leading-tight",
    className,
  );

  return <span className={errorClass}>{children}</span>;
}
// 기본 인풋
function Input({ className, name, ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();

  const inputClass = cn(
    baseInputStyle,
    {
      [baseInputErrorStyle]: !!errors[name],
    },
    className,
  );
  const placeholder = rest.placeholder ? rest.placeholder : name;

  return (
    <>
      <input
        {...register(name, VALIDATION_RULES[name])}
        className={inputClass}
        {...rest}
        placeholder={placeholder}
        onBlur={() => trigger(name)}
        //엔터 입력했을때 유효성 검사 실행되도록
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            //유효성 검사 통과되면, 다음 인풋으로 포커스 이동
            trigger(name).then(() => {
              const formElements = Array.from(
                (e.target as HTMLInputElement).form?.elements || [],
              ) as HTMLInputElement[];

              const currentIndex = formElements.indexOf(e.target as HTMLInputElement);
              const nextElement = formElements[currentIndex + 1];

              if (nextElement) {
                nextElement.focus();
              }
            });
          }
        }}
      />
      {errors[name]?.message && <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>}
    </>
  );
}

// 비밀번호 입력 인풋
function PasswordInput({ className, name, ...rest }: InputProps) {
  const {
    register,
    formState: { errors },
    getValues,
    trigger,
  } = useFormContext();

  // 비밀번호 표시 눈모양 토글 처리
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputClass = cn(
    baseInputStyle,
    {
      [baseInputErrorStyle]: !!errors[name],
    },
    className,
  );
  const EyeIcon = showPassword ? (
    <Icon path="user/visibility" />
  ) : (
    <Icon path="user/unVisibility" />
  );
  const inputType = showPassword ? 'text' : 'password';
  const placeholder = rest.placeholder ? rest.placeholder : name;

  const registerOptions =
    name === 'passwordConfirmation'
      ? PASSWORD_CONFIRM_RULES(getValues('password'))
      : VALIDATION_RULES[name];

  return (
    <>
      <div className="relative">
        <input
          {...register(name, registerOptions)}
          className={inputClass}
          {...rest}
          type={inputType}
          placeholder={placeholder}
          onBlur={() => trigger(name)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              trigger(name).then(() => {
                const formElements = Array.from(
                  (e.target as HTMLInputElement).form?.elements || [],
                ) as HTMLInputElement[];

                const currentIndex = formElements.indexOf(e.target as HTMLInputElement);
                const nextElement = formElements[currentIndex + 1];

                if (nextElement) {
                  nextElement.focus();
                }
              });
            }
          }}
        />
        <button
          type="button"
          className="absolute bottom-2 right-4"
          onClick={togglePasswordVisibility}
        >
          {EyeIcon}
        </button>
      </div>
      {errors[name]?.message && <ErrorMessage>{String(errors[name]?.message)}</ErrorMessage>}
    </>
  );
}

// 제출 버튼
function Submit({ className, children }: BaseProps) {
  const { formState } = useFormContext();

  return (
    <Button type="submit" className={className} color="filled" disabled={!formState.isValid}>
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
