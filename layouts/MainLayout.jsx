import React from 'react';
import Header from '../components/Header';
import Navbar from '../components/Navbar';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
