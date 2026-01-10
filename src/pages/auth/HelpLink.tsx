import React from 'react';
import { BASE_URL } from '../../const';

import './HelpLink.scss';

function HelpLink(): JSX.Element {
  return (
    <div className="HelpLink">
      <a href={`${BASE_URL}/help/`} target="_blank" className="Link">
        Инструкция по подключению
      </a>
    </div>
  )
}

export default HelpLink;
