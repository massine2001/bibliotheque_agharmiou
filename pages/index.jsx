import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useContext, useState } from 'react';
import Link from 'next/link';
import { context } from '../components/context';
import Video from './Video'; // Assure-toi du bon chemin d'importation
import HomeImage from './homeImage'; // Assure-toi du bon chemin d'importation
import Footer from '../components/Footer'; // Assure-toi du bon chemin d'importation


const HomePage = () => {
  const { genre,fetchGenre } = useContext(context);
  return (
    <MainLayout>
      <Video />
      <HomeImage/>
     <div className='h1index' id='h1index'>
     <h1 style={{
        fontFamily: 'Poppins, sans-serif',
        fontSize: '48px',
        color: '#333',
        background: 'linear-gradient(90deg, #ff6b6b, #f3a683)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: '2px',
        position: 'relative',
        margin: '20px 0',
      }}>
        Collection des genres
        <span style={{
          position: 'absolute',
          width: '100px',
          height: '5px',
          background: '#ff6b6b',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '10px',
        }}></span>
        <span style={{
          position: 'absolute',
          width: '100px',
          height: '5px',
          background: '#f3a683',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '10px',
        }}></span>
      </h1>
     </div>

      <div className="container-grid">
        {genre.map((genre_) => {
          let backgroundImage;
          return (
            <div
              className='indexImg'
              key={genre_.id}
              style={{
                position: 'relative',
                backgroundImage: `url(${genre_.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
              }}
            >
              <Link href={`/genre/${genre_.id}`}>
                <div
                  className='indexBlur'
                  style={{
                    position: 'absolute',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: 'blur(2px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    zIndex: 1,
                    backgroundImage: 'none',
                  }}
                  ref={(div) => {
                    if (div) {
                      div.style.setProperty('backgroundImage', backgroundImage, 'important');
                    }
                  }}
                />
                <span className='indexText'>
                  {genre_.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
      <Footer />

    </MainLayout>
  );
};

export default HomePage;
