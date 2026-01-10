import { useState } from 'react';

import { cn } from '@bem-react/classname';
import { Button } from '../../blocks/Button';
import { isCookiesDone, saveCookiesDone } from '../../services/cookies';

import './CookieForm.scss';

export const cnCookieForm = cn('CookieForm');

function CookieForm(): JSX.Element {
  const [isVisible, setIsVisible] = useState(!isCookiesDone());

  return (
    <div>
      {isVisible ?
        <div className={cnCookieForm(null, ['Card'])}>
          <p className="CookieIcon">🍪</p>
          <p>Мы используем куки, чтобы вам было удобно</p>
          <p className="CookieButton">
            <Button onClick={() => {
              saveCookiesDone();
              setIsVisible(false);}}
            >
              Понятно
            </Button>
          </p>
        </div> : null}
    </div>
  );

}

export default CookieForm;
