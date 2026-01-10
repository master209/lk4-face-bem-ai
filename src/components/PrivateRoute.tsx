import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { fetchUserBalance } from '../store/api-actions';
import { useIsAuthorized, useAppDispatch, useAppSelectors } from '../hooks';
import { AppRoute } from '../const';

type PrivateRouteProps = {
  children: JSX.Element;
};

export function PrivateRoute({children}: PrivateRouteProps): JSX.Element {
  const isAuthorized = useIsAuthorized();
  const dispatch = useAppDispatch();
  const {isCheckingAuth} = useAppSelectors();

  useEffect(() => {
    dispatch(fetchUserBalance());
  });

  return (
    <div>
      { // eslint-disable-next-line no-nested-ternary
        !isCheckingAuth
          ? (isAuthorized ? children : <Navigate to={AppRoute.Login}/>)
          : null
      }
    </div>
  );
}
