import { useForm } from 'react-hook-form';
import {
  InputField,
  ReponseMessageModal,
  AuthSubmitButton,
} from '../../../shared';
import { signinFormSchema } from '../model/signin.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useSignin } from '../../../shared/api/queries/auth.queries';
import { FormSchema } from '../model/signin.interface';
import { Link } from 'react-router-dom';
import { PAGE_URLS } from '../../../shared/model/constants';

export const SigninForm = () => {
  
  const { signin, signinIsError, signinIsPending } = useSignin();

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
    resolver: yupResolver(signinFormSchema),
  });

  const onSubmit = (data: FormSchema) => {
    signin(data);
  };

  useEffect(() => {
    if (signinIsError) {
      setIsResponseModalOpen(true);
      setMessage('Check your data and try again');
      const timeoutId = setTimeout(() => {
        setIsResponseModalOpen(false);
        setMessage('');
        reset();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (signinIsPending) {
      setIsResponseModalOpen(true);
      setMessage('Loading...');
      const timeoutId = setTimeout(() => {
        setIsResponseModalOpen(false);
        setMessage('');
        reset();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [signinIsError, signinIsPending]);

  return (
    <>
      <h1 className="text-center mt-[20%] text-2xl mb-[55px]">Sign in</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[25%] mx-auto">
        <InputField
          errorMessage={errors.login?.message}
          type="text"
          placeholder="email or username"
          register={register}
          name="login"
          className="mx-auto block mb-[25px] "
        />
        <InputField
          errorMessage={errors.password?.message}
          type="text"
          placeholder="password address"
          register={register}
          name="password"
          className="mx-auto block mb-[25px] "
        />
        <div className="flex justify-between items-center">
          <AuthSubmitButton className="rounded" />
          <Link className="mb-2" to={`${PAGE_URLS.SIGNUP}`}>
            new on the platform?
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
