import { useForm } from 'react-hook-form';
import {
  InputField,
  InputFileUpload,
  ReponseMessageModal,
  AuthSubmitButton,
} from '../../../shared';
import { signupFormSchema } from '../model/signup-form.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useSignup } from '../../../shared/api/queries/auth.queries';
import { FormSchema } from '../model/signup.interface';
import { Link } from 'react-router-dom';
import { PAGE_URLS } from '../../../shared/model/constants';

export const SignupForm = () => {
  const {
    signup,
    signupIsError,
    signupIsPending,
    signupIsSuccess,
    signupData,
  } = useSignup();

  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);

  const [message, setMessage] = useState('');

  const handleToggleResponseModal = () => {
    setIsResponseModalOpen((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupFormSchema),
  });

  const onSubmit = (data: FormSchema) => {
    signup(data);
  };

  useEffect(() => {
    if (signupIsError) {
      setIsResponseModalOpen(true);
      setMessage('Check your data and try again');
      const timeoutId = setTimeout(() => {
        setIsResponseModalOpen(false);
        setMessage('');
        reset();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (signupIsPending) {
      setIsResponseModalOpen(true);
      setMessage('Loading...');
      const timeoutId = setTimeout(() => {
        setIsResponseModalOpen(false);
        setMessage('');
        reset();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [signupIsError, signupIsPending]);

  return (
    <>
      <h1 className="text-center mt-[20%] text-2xl mb-[55px]">Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[25%] mx-auto">
        <InputField
          errorMessage={errors.userName?.message}
          type="text"
          placeholder="username"
          register={register}
          name="userName"
          className="mx-auto block mb-[25px] "
        />
        <InputField
          errorMessage={errors.email?.message}
          type="text"
          placeholder="email address"
          register={register}
          name="email"
          className="mx-auto block mb-[25px] "
        />
        <InputField
          errorMessage={errors.password?.message}
          type="text"
          placeholder="password"
          register={register}
          name="password"
          className="mx-auto block mb-[25px] "
        />
        <div className="flex justify-between items-center">
          <AuthSubmitButton className="rounded" />
          <Link className="mb-2" to={`${PAGE_URLS.SIGNIN}`}>
            old on the platform?
          </Link>
        </div>
      </form>
      <ReponseMessageModal
        onClose={handleToggleResponseModal}
        isOpen={isResponseModalOpen}
        message={message}
      />
    </>
  );
};
