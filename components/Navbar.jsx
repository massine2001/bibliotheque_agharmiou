import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
//import { supabase } from './supabase';
//import fetch from 'node-fetch';

const Navbar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== "undefined") {
        setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }
}, []);


/*async function migrateImages() {
  // 1. Récupérer toutes les URLs d’images depuis la table
  const { data: livres, error } = await supabase
    .from('livre')
    .select('id, image');

  if (error) {
    console.error('Erreur en récupérant les URLs :', error);
    return;
  }

  // 2. Parcourir chaque livre et télécharger l'image
  for (const livre of livres) {
    const { id, image } = livre;
    
    try {
      // Vérifier si l'URL est définie et n'est pas vide
  if (!image || typeof image !== 'string' || image.trim() === '') {
    console.error(`L'URL de l'image pour l'ID ${id} est invalide ou non définie : ${image}`);
    continue; // Passer à l'élément suivant si l'URL est invalide
  }

      // Télécharger l'image depuis l'URL existante
      const response = await fetch(image);
      if (!response.ok) throw new Error(`Erreur de téléchargement pour l'URL : ${image}`);

       // Lire l'image en tant qu'array buffer et la convertir en Buffer
       const arrayBuffer = await response.arrayBuffer();
       const buffer = Buffer.from(arrayBuffer);
       const filePath = `images/${id}.jpg`;
 
      // Uploader l'image dans le bucket Supabase
      const { data, error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, buffer, {
          cacheControl: '3600',
          upsert: true,
          contentType: response.headers.get('content-type'),
        });

      if (uploadError) {
        console.error(`Erreur lors de l'upload pour l'ID ${id}:`, uploadError);
        continue;
      }

      // 3. Obtenir l'URL publique du bucket
      const { publicURL, error: urlError } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      if (urlError) {
        console.error(`Erreur en récupérant l'URL publique pour l'ID ${id}:`, urlError);
        continue;
      }

      // 4. Mettre à jour l'URL de l'image dans la base de données
      const { error: updateError } = await supabase
        .from('livre')
        .update({ image: publicURL })
        .eq('id', id);

      if (updateError) {
        console.error(`Erreur en mettant à jour l'ID ${id}:`, updateError);
      } else {
        console.log(`Image pour l'ID ${id} mise à jour avec succès`);
      }

    } catch (err) {
      console.error(`Erreur avec l'image pour l'ID ${id}:`, err.message);
    }
  }

  console.log('Migration des images terminée.');
}

il faut installer npm install node-fetch pour que ça marche
  */

  return (
    <div className='navbar'>

    {width < 800 && (
      <nav className='nav-menu'>
      <div className='navsubmenudesk' style={{padding:'0.5rem 1rem'}}>
        <Link href='/searchLivre' className='nav-link'><span className='nav-item'>Editer un ouvrage</span></Link>
        <Link href='/ajoutIsbn' className='nav-link'><span className='nav-item'>Ajout avec un ISBN</span ></Link>
        <Link href='/ajoutLivre' className='nav-link'><span className='nav-item'>Ajouter un ouvrage</span></Link>
      </div>
      <div style={{padding:'0.5rem 1rem'}}>
        <Link href='/' className='nav-link'><span className='nav-item'>Accueil</span ></Link>
        <Link href='/consultation' className='nav-link'><span className='nav-item'>Consulter</span></Link>
        <Link href='/editer' className='nav-link'><span className='nav-item'>Editer</span></Link>
        <Link href='/pret' className='nav-link'><span className='nav-item'>Prêt-Retour</span></Link>
      </div>
    </nav>
    )}
      {width >= 800 && (        
      <nav className='nav-menu'>
        <div className='navsubmenudesk' style={{padding:'0.5rem 1rem'}}>
          {
          //<span onClick={migrateImages}>Migrer</span>
          }
          <Link href='/ajoutLivre' className='nav-link'><span>Ajouter un ouvrage</span></Link>
          <Link href='/ajoutIsbn' className='nav-link'><span>Ajout avec un ISBN</span ></Link>
          <Link href='/' className='nav-link'><span>Accueil</span ></Link>
        </div>
        <div style={{padding:'0.5rem 1rem'}}>
        <Link href='/consultation' className='nav-link'><span>Consulter les Ouvrages</span></Link>
        <Link href='/collection' className='nav-link'><span>Collection des Genres</span></Link>
        </div>
      </nav>
     )}

    </div>
     
  );
};

export default Navbar;
