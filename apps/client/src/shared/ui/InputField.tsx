import { FC } from 'react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';

interface IProps {
  errorMessage: string | FieldErrorsImpl<any> | undefined;
  register: UseFormRegister<any>;
  type: 'text' | 'email' | 'password';
  name: string;
  placeholder: string;
  className?: string;
}

export const InputField: FC<IProps> = ({
  type,
  register,
  name,
  errorMessage,
  placeholder,
  className,
}) => {
  return (
    <div className="mx-auto">
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`border-b-2 border-black w-full p-2 outline-none ${className} bg-transparent`}
      />
      {errorMessage && (
        <p className="w-full mb-2 underline">{String(errorMessage)}</p>
      )}
    </div>
  );
};
