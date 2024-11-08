import React, { useEffect } from 'react';

const homeStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingTop: '2rem',
  paddingBottom: '6rem',
};
const para = {
  position: 'absolute',
  top: '1rem',
  fontSize: '1.2em',
  lineHeight: '1.4',
  marginBottom: '1em',
  color: '#555',
  textAlign: 'center',
 padding : '1.5rem',
};

const HomeImage = () => {
  
  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.defile');
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (elementPosition < viewportHeight - 50) {
          element.classList.add('visible');
        } else {
          element.classList.remove('visible');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.defile2');
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        if (elementPosition < viewportHeight - 50) {
          element.classList.add('visible2');
        } else {
          element.classList.remove('visible2');
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={homeStyle} className='homeimg'>
      <img src="/library.png" alt="" className="defile" />
      <div className="boite3 defile2">
        <p style={para}>
         'Bibliothèque Centrale Agharmiou', votre source incontournable pour une gestion efficace et moderne de vos livres.
        </p>
      </div>
    </div>
  );
};

export default HomeImage;
