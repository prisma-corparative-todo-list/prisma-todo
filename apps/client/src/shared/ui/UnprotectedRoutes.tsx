import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useRefreshTokens } from '../api/queries/auth.queries';
import { useAuthStore } from '../';

export const UnprotectedRoutes: FC = () => {

  const navigate = useNavigate();

  const { refreshIsSuccess, refreshIsPending, tokensCreds } = useRefreshTokens()

  const { isAuth,setAuth } = useAuthStore()


  useEffect(() => {
    if(!refreshIsPending && refreshIsSuccess && tokensCreds?.tokens.accessToken){
      navigate('/home')
      setAuth(true)
    }else{
      setAuth(false)
    }
  }, [refreshIsSuccess,refreshIsPending]); 

  return (
    <>
      <Outlet />
    </>           
  );
};