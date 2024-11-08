import React from 'react';
import MainLayout from '../layouts/MainLayout';

const FaqPage = () => {
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

  const questionStyle = {
    fontSize: '1.5em',
    margin: '1em 0 0.5em',
    color: '#007BFF',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  };

  const answerStyle = {
    fontSize: '1.2em',
    marginBottom: '1em',
    color: '#555',
    lineHeight: '1.8',
    paddingLeft: '20px',
  };

  const faqItemStyle = {
    marginBottom: '2em',
    position: 'relative',
    paddingLeft: '20px',
  };

  return (
    <MainLayout>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Foire aux Questions (FAQ)</h1>
        
        <div style={faqItemStyle}>
          <h2 style={questionStyle}>Comment puis-je m'inscrire sur BCA-Lovat ?</h2>
          <p style={answerStyle}>
            Pour vous inscrire sur BCA-Lovat, cliquez simplement sur le bouton "S'inscrire" en haut à droite de la page d'accueil, puis suivez les instructions. Vous aurez besoin d'une adresse e-mail valide et d'un mot de passe sécurisé.
          </p>
        </div>

        <div style={faqItemStyle}>
          <h2 style={questionStyle}>Comment ajouter un livre à ma bibliothèque ?</h2>
          <p style={answerStyle}>
            Après vous être connecté, cliquez sur "Ajouter un Ouvrage" dans la barre de navigation. Remplissez les détails du livre tels que le titre, l'auteur, et l'année de publication, puis cliquez sur "Ajouter".
          </p>
        </div>

       

        <div style={faqItemStyle}>
          <h2 style={questionStyle}>Comment puis-je supprimer un livre de ma bibliothèque ?</h2>
          <p style={answerStyle}>
            Pour supprimer un livre, cliquez sur le menu en haut à droite de l'écran, ensuite séléctionnez "Edition", vous trouverez l'option 'Editer un Livre', sélectionnez le livre que vous souhaitez supprimer, puis cliquez sur "Editer" et ensuite "Supprimer". Vous serez invité à confirmer cette action.
          </p>
        </div>

        <div style={faqItemStyle}>
          <h2 style={questionStyle}>Quelles sont les options de recherche disponibles ?</h2>
          <p style={answerStyle}>
            BCA-Lovat offre une recherche avancée qui vous permet de filtrer les livres par titre, auteur, genre, et bien plus encore.
          </p>
        </div>

        <div style={faqItemStyle}>
          <h2 style={questionStyle}>Comment puis-je contacter le support technique ?</h2>
          <p style={answerStyle}>
            Si vous avez besoin d'aide, vous pouvez contacter notre support technique en envoyant un e-mail à <a href="mailto:agharmioumassine@gmail.com" style={{ color: '#007BFF', textDecoration: 'none' }}>agharmioumassine@gmail.com</a>. Nous nous efforcerons de répondre à votre demande dans les plus brefs délais.
          </p>
        </div>

      </div>
    </MainLayout>
  );
};

export default FaqPage;
