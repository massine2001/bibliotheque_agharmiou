import React from 'react';
import Link from 'next/link';

const divStyle = {
  padding: '3%',
  width: '70%',
};
const headingStyle = {
  fontSize: '550%',
  marginBottom: '0.2em',
  lineHeight: '0.9em',
  color: 'white',
  position: 'relative',
  textAlign: 'left',
  width: '100%',
};

const paragraphStyle = {
  fontSize: '120%',
  lineHeight: '1.6em',
  color: 'white',
  textAlign: 'left',
  width: '60%',
};

const formButtonStyle = {
  gridColumn: 'span 1',
  display: 'flex',
  justifyContent: 'space-evenly',
  marginTop: '2rem',
  marginBottom: '1rem',
  gap: '1rem',
  width: '60%',
};

const buttonStyle = {
  backgroundColor: '#973f3f',
  color: '#ecf0f1',
  padding: '1rem',
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
};

const hoverButtonStyle = {
  backgroundColor: '#c0392b',
};

const handleScroll = () => {
  const element = document.getElementById('h1index');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Video = () => (
  <div className='videoWrapper'>
    <video className='videoBackground' autoPlay loop muted>
      <source src="https://videos.pexels.com/video-files/5283820/5283820-sd_960_506_24fps.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className='content'>
      <div className='imageAccueil'>
        <div style={divStyle}>
          <h1 style={headingStyle}>Bibliothèque Aɣarmiw</h1>
          <p style={paragraphStyle}>
            Votre source incontournable pour une gestion efficace de vos livres. Intuitive et élégante notre plateforme est adaptée aux besoins des amateurs de livres.
          </p>
          <div style={formButtonStyle}>
            <Link href='/ajoutLivre'><button style={buttonStyle}>Ajouter un ouvrage</button></Link>
            <button style={buttonStyle} onClick={handleScroll}>Consulter la Collection</button>
          </div>
        </div>
      </div>
    </div>

    {/* Section à atteindre */}
    <div id="aa00" style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
      <h2>Section Collection</h2>
      <p>Ici vous pouvez voir la collection de livres.</p>
    </div>
  </div>
);

export default Video;
