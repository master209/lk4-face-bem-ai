import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { getUsername, getShortname } from '../store/user-process';
import { useAppSelector } from '../hooks';
import { TITLE_FREFIX } from '../const';

function UserProfile(): JSX.Element {
  const shortname = useAppSelector(getShortname);
  const username = useAppSelector(getUsername);

  return (
    <div>
      <HelmetProvider>
        <title>{TITLE_FREFIX}Профиль пользователя</title>
      </HelmetProvider>
      <h1>Профиль пользователя</h1>
      <div>
        <p>{shortname}</p>
        <p>{username}</p>
      </div>
    </div>
  );
}

export default UserProfile;
