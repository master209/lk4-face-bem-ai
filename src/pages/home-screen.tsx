import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { TITLE_FREFIX } from '../const';
import { Layout } from '../components';

import './home-screen.scss';

const HomeScreen = () => (
  <Layout>
    <HelmetProvider>
      <title>{TITLE_FREFIX}Новости</title>
    </HelmetProvider>
    <h1>Новости</h1>

    <div className="News">
      <div className="News-One Card">
        <div className="News-Block">По тарифным планам "Студенческий безлимит 12_25 20М", "Студенческий безлимит 12_25 30М", "Студенческий безлимит 12_25 40М", "Студенческий безлимит Архивный 50М" с 01 января 2026г меняется цена.</div>
        <div className="News-Block">
          <p>Новая цена:</p>
          <p>"Студенческий безлимит 12_25 20М" - 508,34</p>
          <p>"Студенческий безлимит 12_25 30М" - 610</p>
          <p>"Студенческий безлимит 12_25 40М" - 660,72</p>
          <p>"Студенческий безлимит Архивный 50М" - 762,5</p>
        </div>
        <div className="News-Block">В том числе НДС.</div>
        <div className="Published"><span>дата публикации: </span>01.12.2025</div>
      </div>
      <div className="Card">
        <div className="News-Block">
          <p>В связи с изменением ставки НДС на всех тарифных планах с 01 января 2026г. изменяется стоимость в соответствии с изменением ставки НДС.</p>
          <div className="Published"><span>дата публикации: </span>22.12.2025</div>
        </div>
      </div>
    </div>
  </Layout>
);

export default HomeScreen;
