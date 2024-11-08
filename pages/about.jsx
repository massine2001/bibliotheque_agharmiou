import React from 'react';
import MainLayout from '../layouts/MainLayout';

const AboutPage = () => {
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

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
    textAlign: 'center',
  };

  const listItemStyle = {
    fontSize: '1.1em',
    marginBottom: '0.5em',
    position: 'relative',
    paddingLeft: '30px',
    textAlign: 'left',
    background: 'linear-gradient(to right, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.3))',
    borderRadius: '8px',
    transition: 'background 0.3s ease',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '10px 20px',
    marginTop: '20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1em',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const shareButtonStyle = {
    display: 'inline-block',
    padding: '10px 15px',
    margin: '10px',
    border: 'none',
    borderRadius: '50%',
    fontSize: '1.5em',
    cursor: 'pointer',
    color: '#fff',
    transition: 'background 0.3s ease',
  };

  const facebookStyle = {
    backgroundColor: '#3b5998',
  };

  const twitterStyle = {
    backgroundColor: '#1da1f2',
  };

  const linkedinStyle = {
    backgroundColor: '#0077b5',
  };

  return (
    <MainLayout>
      <div style={containerStyle}>
        <h1 style={headingStyle}>À propos de BCA-Lovat</h1>
        <p style={paragraphStyle}>
          Bienvenue sur BCA-Lovat, votre source incontournable pour une gestion efficace et moderne de vos livres. Notre plateforme a été conçue pour vous offrir une expérience de gestion de bibliothèque intuitive, élégante et adaptée aux besoins des amateurs de livres, des collectionneurs et des gestionnaires de bibliothèques.
        </p>
        <h2 style={subheadingStyle}>Qui sommes-nous ?</h2>
        <p style={paragraphStyle}>
          Chez BCA-Lovat, nous croyons en la puissance de la technologie pour transformer la manière dont nous interagissons avec nos livres. Nous avons développé cette plateforme avec une passion pour l'innovation et un souci constant de l'utilisateur. Notre objectif est de rendre la gestion des livres plus facile, plus organisée et plus agréable.
        </p>
        <h2 style={subheadingStyle}>Ce que nous offrons</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Gestion Simplifiée</strong> : Organisez vos livres avec facilité grâce à des outils puissants mais simples d'utilisation.
          </li>
          <li style={listItemStyle}>
            <strong>Recherche Avancée</strong> : Trouvez rapidement ce que vous cherchez avec notre système de recherche performant.
          </li>
          <li style={listItemStyle}>
            <strong>Design Moderne</strong> : Profitez d'une interface élégante et moderne qui rend la gestion de vos livres agréable.
          </li>
          <li style={listItemStyle}>
            <strong>Accessibilité</strong> : Accédez à votre bibliothèque depuis n'importe où avec notre plateforme web responsive.
          </li>
        </ul>
        <h2 style={subheadingStyle}>Notre Vision</h2>
        <p style={paragraphStyle}>
          Nous visons à créer une expérience utilisateur exceptionnelle en alliant technologie de pointe et simplicité d'utilisation. Notre équipe s'engage à constamment améliorer et enrichir la plateforme pour répondre aux besoins évolutifs de nos utilisateurs.
        </p>
        <p style={paragraphStyle}>
          Merci de faire confiance à BCA-Lovat. Nous espérons que vous apprécierez notre plateforme autant que nous avons pris plaisir à la créer.
        </p>
        <h2 style={subheadingStyle}>Contact</h2>
        <p style={paragraphStyle}>
          Pour toute question ou suggestion, n'hésitez pas à nous contacter à <a href="mailto:agharmioumassine@gmail.com" style={{ color: '#007BFF', textDecoration: 'none' }}>agharmioumassine@gmail.com</a>. Nous serions ravis d'avoir de vos nouvelles et de vous aider en cas de besoin.
        </p>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="https://www.facebook.com/sharer/sharer.php?u=https://bca-lovat.vercel.app" target="_blank" rel="noopener noreferrer" style={{ ...shareButtonStyle, ...facebookStyle }}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com/intent/tweet?url=https://bca-lovat.vercel.app&text=Découvrez%20BCA-Lovat%20:%20une%20plateforme%20moderne%20pour%20la%20gestion%20de%20livres!" target="_blank" rel="noopener noreferrer" style={{ ...shareButtonStyle, ...twitterStyle }}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=https://bca-lovat.vercel.app&title=BCA-Lovat&summary=Découvrez%20BCA-Lovat%20:%20une%20plateforme%20moderne%20pour%20la%20gestion%20de%20livres!&source=" target="_blank" rel="noopener noreferrer" style={{ ...shareButtonStyle, ...linkedinStyle }}>
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
