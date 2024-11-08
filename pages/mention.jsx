import React from 'react';
import MainLayout from '../layouts/MainLayout';

const LegalNoticePage = () => {
  const containerStyle = {
    padding: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    background: 'linear-gradient(to right, #f7f8f8, #e1e8e8)',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
  };

  const headingStyle = {
    fontSize: '3em',
    marginBottom: '0.5em',
    color: '#333',
    textAlign: 'center',
    position: 'relative',
  };

  const subheadingStyle = {
    fontSize: '2em',
    marginTop: '1em',
    marginBottom: '0.5em',
    color: '#444',
    textAlign: 'center',
  };

  const paragraphStyle = {
    fontSize: '1.2em',
    lineHeight: '1.8',
    marginBottom: '1em',
    color: '#555',
    textAlign: 'center',
  };

  return (
    <MainLayout>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Mentions Légales</h1>
        
        <h2 style={subheadingStyle}>Informations Générales</h2>
        <p style={paragraphStyle}>
          Le site <strong>BCA-Lovat</strong> est édité par Agharmiou Massine.
        </p>

        <h2 style={subheadingStyle}>Responsable de la Publication</h2>
        <p style={paragraphStyle}>
          Responsable de la publication : Agharmiou Massine, joignable à l'adresse email suivante : <a href="mailto:agharmioumassine@gmail.com" style={{ color: '#007BFF', textDecoration: 'none' }}>agharmioumassine@gmail.com</a>.
        </p>

        <h2 style={subheadingStyle}>Hébergement</h2>
        <p style={paragraphStyle}>
          Le site est hébergé par Vercel Inc., dont le siège social est situé au 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
        </p>

        <h2 style={subheadingStyle}>Propriété Intellectuelle</h2>
        <p style={paragraphStyle}>
          Tous les contenus présents sur le site <strong>BCA-Lovat</strong> (textes, images, vidéos, logos, etc.) sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute reproduction ou distribution non autorisée de ces contenus est strictement interdite.
        </p>

        <h2 style={subheadingStyle}>Données Personnelles</h2>
        <p style={paragraphStyle}>
          Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification, et de suppression des données vous concernant. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <a href="mailto:agharmioumassine@gmail.com" style={{ color: '#007BFF', textDecoration: 'none' }}>agharmioumassine@gmail.com</a>.
        </p>

        <h2 style={subheadingStyle}>Cookies</h2>
        <p style={paragraphStyle}>
          Le site <strong>BCA-Lovat</strong> utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait altérer certaines fonctionnalités du site.
        </p>

        <h2 style={subheadingStyle}>Litiges</h2>
        <p style={paragraphStyle}>
          En cas de litige, les tribunaux français seront seuls compétents.
        </p>

      </div>
    </MainLayout>
  );
};

export default LegalNoticePage;
