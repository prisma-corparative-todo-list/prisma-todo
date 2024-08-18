import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ISinginForm, ISingupFormData } from '../../model/types/auth.types';
import { PAGE_URLS, QUERY_KEYS } from '../../model/constants';
import { AuthService } from '../services/auth.service';
import { socketService } from '../services/socket.service';

export const useSignup = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: signup,
    isSuccess: signupIsSuccess,
    isError: signupIsError,
    isPending: signupIsPending,
    data: signupData,
  } = useMutation({
    mutationKey: [`${QUERY_KEYS.SIGNUP}`],
    mutationFn: async (data: ISingupFormData) => {
      socketService.connect()
      const response = await AuthService.signup(data);
      return response;
    },
    onSuccess: () => {
      navigate(`${PAGE_URLS.EMAIL_CONFIRMATION_WAITING}`);
    },
  });
  return {
    signup,
    signupIsSuccess,
    signupIsError,
    signupIsPending,
    signupData,
  };
};

export const useSignin = () => {
  const navigate = useNavigate();
  const {
    mutateAsync: signin,
    isSuccess: signinIsSuccess,
    isError: signinIsError,
    isPending: signinIsPending,
  } = useMutation({
    mutationKey: [`${QUERY_KEYS.SIGNIN}`],
    mutationFn: async (data: ISinginForm) => {
      const response = await AuthService.signin(data);
      return response;
    },
    onSuccess: (data) => {
      if (data.isActivated) {
        socketService.connect()
        navigate(`${PAGE_URLS.HOME}`);
      } else {
        navigate(`/${PAGE_URLS.EMAIL_CONFIRMATION_WAITING}`);
      }
    },
  });
  return { signin, signinIsSuccess, signinIsError, signinIsPending };
};

export const useRefreshTokens = () => {
  const {
    data: tokensCreds,
    isSuccess: refreshIsSuccess,
    isPending: refreshIsPending,
    refetch,
  } = useQuery({
    queryKey: [`${QUERY_KEYS.REFRESH}`],
    queryFn: async () => {
      socketService.connect()
      return await AuthService.refresh();
    },
  });

  return { refreshIsSuccess, refetch, tokensCreds, refreshIsPending };
};
