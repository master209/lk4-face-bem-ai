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
  </Layout>
);

export default HomeScreen;
