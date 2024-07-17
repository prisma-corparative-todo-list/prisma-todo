import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useRefreshTokens } from '../api/queries/auth.queries';
import { useAuthStore, useUserStore } from '../';

export const ProtectedRoutes: FC = () => {
  const navigate = useNavigate();

  const { refreshIsSuccess, refreshIsPending, tokensCreds } =
    useRefreshTokens();

  const { isAuth, setAuth } = useAuthStore();

  const { setUserId, userId } = useUserStore();

  useEffect(() => {
    if (!refreshIsPending && !refreshIsSuccess) {
      navigate(`/`);
    }
    
    if (refreshIsSuccess && tokensCreds?.userId) {
      setAuth(true);
      setUserId(tokensCreds?.userId);
    }
  }, [refreshIsSuccess, refreshIsPending]);

  return (
    <>
      <Outlet />
    </>
  );
};
