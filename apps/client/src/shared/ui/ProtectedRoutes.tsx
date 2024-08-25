import { Outlet, useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { useRefreshTokens } from '../api/queries/auth.queries';
import { useAuthStore, useUserStore } from '../';

export const ProtectedRoutes: FC = () => {
  const navigate = useNavigate();

  const { refreshIsSuccess, refreshIsPending, tokensCreds } =
    useRefreshTokens();

  const { setAuth } = useAuthStore();

  const { setUser } = useUserStore();

  useEffect(() => {
    if (!refreshIsPending && !refreshIsSuccess) {
      navigate(`/`);
    }

    if (refreshIsSuccess && tokensCreds?.user.id) {
      setAuth(true);
      setUser(tokensCreds.user);
    }
  }, [refreshIsSuccess, refreshIsPending]);

  return <Outlet />;
};
