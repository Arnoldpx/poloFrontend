import React from 'react';

import CountStats from '../../components/Contador/Contador';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <CountStats />
      </main>
      <Footer />
    </>
  );
};

export default Home;
