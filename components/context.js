import { useContext,createContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

export const context = createContext();

export const AppProvider = ({ children }) => {

  //nbmr de livre
  const nbmr_livre = async () => {
    const { data, error } = await supabase
      .from('livre')
      .select('id');
    if (error) {
      console.error('Error fetching livre', error);
    }
    else{
      return data.length;
    }
  }

    // Fetching genres
  const [genre, setGenre] = useState([]);
  const fetchGenre = async () => {
    const { data , error } = await supabase
      .from('genre')
      .select('id,label,image');

    if (error) {
      console.error('Error fetching genres', error);
    }
    else{
      setGenre(data);
    }
  };
  useEffect(() => {
    fetchGenre();
  }, []); 

  //insert genre
  const insertGenre = async (label, image) => {
    const { data, error } = await supabase
      .from('genre')
      .insert([{label, image}]);
    if (error) {
      console.error('Error adding new genre', error);
    }
    else{
      console.log('New genre added', data);
    }
  };

  // update genre
  const updateGenre = async (id, label, image) => {
    const { data, error } = await supabase
      .from('genre')
      .update({label, image})
      .eq('id', id);
    if (error) {
      console.error('Error updating genre', error);
    }
    else{
      console.log('Genre updated', data);
    }
  };

  //get all genre
  const getGenre = async () => {
    const { data, error } = await supabase
      .from('genre')
      .select('id, label,image');
    if (error) {
      console.error('Error fetching genre', error);
    }
    else{
      return data;
    }
  }
   
  // Fetching consultation
   const fetchLivre = async () => {
     const { data , error } = await supabase
       .from('livre')
       .select('id,created_at, titre, auteur, editeur, langue, annee_publication, image,code')
       .order('titre');
 
     if (error) {
       console.error('Error fetching livres', error);
     }
     else{
       return data;
     }
   };


   // Fetching livre disponible
   const fetchLivre_disponible = async () => {
    const { data, error } = await supabase
      .from('livre')
      .select('id, titre, auteur')
      .gt('exemplaire', 0)  // Vérifie si le nombre d'exemplaires est supérieur à 0
      .order('titre');
  
    if (error) {
      console.error('Error fetching livres', error);
    } else {
      return data;
    }
  }
  

    //fetching loueur
    const fetchLoueur = async () => {
      const { data, error } = await supabase
        .rpc('fetch_loueurs_disponibles') ;// Tri par nom
    
      if (error) {
        console.error('Error fetching loueurs', error);
      } else {
        return data;
      }
    };
    
   

   // Fetching livre par genre
   const [livre_genre, setLivre_genre] = useState([]);
   const fetchLivre_genre = async (id_genre) => {
     const { data , error } = await supabase
       .from('livre')
       .select('*')
       .eq('genre_id', id_genre)
       .order('titre');
 
     if (error) {
       console.error('Error fetching livres', error);
     }
     else{
       setLivre_genre(data);
     }
   };

   // Fetching livre
   const [livre_singulier, setLivre_singulier] = useState([]);
   const fetchLivre_singulier = async (id) => {
     const { data , error } = await supabase
       .from('livre')
       .select('*')
       .eq('id', id);
 
     if (error) {
       console.error('Error fetching livres', error);
     }
     else{
       setLivre_singulier(data);
     }
   };
   
   const addLivre = async (titre, auteur, editeur, langue, prix, exemplaire, resume, annee_publication, nmbr_page, traducteur, etat, image, genre, louer, acheteur, genre_id, code, bibliotheque, emplacement) => {
    const { data, error } = await supabase
      .from('livre')
      .insert([
        { titre, auteur, editeur, langue, prix, exemplaire, resume, annee_publication, nmbr_page, traducteur, etat, image, genre, louer, acheteur, genre_id, code, bibliotheque, emplacement }
      ]);
    if (error) {
      return false;
    } else {
      return true;
    }
};

  //get nombre de livre par genre
  const nmbreLivreGenre = async (id) => {
    const { data, error } = await supabase
      .from('livre')
      .select('id')
      .eq('genre_id', id);
    if (error) {
      console.error('Error fetching number', error);
    }
    else{
      return data.length;
    }
  }
  // ajout de auteur
  const addAuteur = async (nom) => {
    const { data, error } = await supabase
      .from('auteur')
      .insert([
        nom.map((nom) => ({nom}))
      ]);
    if (error) {
      console.error('Error adding new Auteur', error);
    }
    else{
      console.log('New auteur added', data);
    }
  };
  //auteur to id
  const AuteurToId = async (nom) => {
    const {data, error} = await supabase
    .from('auteur')
    .select('id')
    .eq('nom', nom);
    if (error) {
      console.error('Error fetching auteur', error);
    }
    else{
      return data;
    }
  };
  // id to auteur
  const idToAuteur = async (id) => {
    const {data, error} = await supabase
    .from('auteur')
    .select('nom')
    .eq('id', id);
    if (error) {
      console.error('Error fetching auteur', error);
    }
    else{
      return data;
    }
  };

  //fetch auteur
  const fetchAuteur = async () =>{
    const {data, error} = await supabase
    .from('auteur')
    .select('id, nom')
    .order('nom');
    if (error) {
      console.error('Error fetching auteur', error);
    }
    else{
      return data;
    }
  };
   //fetch editeur
   const fetchEditeur = async () =>{
    const {data, error} = await supabase
    .from('editeur')
    .select('id, nom')
    .order('nom');
    if (error) {
      console.error('Error fetching editeur', error);
    }
    else{
      return data;
    }
  };
   //fetch traducteur
   const fetchTraducteur = async () =>{
    const {data, error} = await supabase
    .from('traducteur')
    .select('id, nom')
    .order('nom');
    if (error) {
      console.error('Error fetching traducteur', error);
    }
    else{
      return data;
    }
  };

  const fetchBibliotheque = async () =>{
    const {data, error} = await supabase
    .from('bibliotheque')
    .select('id, nom')
    .order('nom');
    if (error) {
      console.error('Error fetching traducteur', error);
    }
    else{
      return data;
    }
  };

  // exist auteur
  const existAuteur = async (nom) => {
    const {data, error} = await supabase
    .from('auteur')
    .select('nom')
    .eq('nom', nom);
    if (error) {
      console.error('Error fetching auteur', error);
      return [];
    }
    else{
      return data;
    }
  }

  // exist editeur
  const existEditeur = async (nom) => {
    const {data, error} = await supabase
    .from('editeur')
    .select('nom')
    .eq('nom', nom);
    if (error) {
      console.error('Error fetching editeur', error);
      return [];
    }
    else{
      return data;
    }
  }

  // exist traducteur
  const existTraducteur = async (nom) => {
    const {data, error} = await supabase
    .from('traducteur')
    .select('nom')
    .eq('nom', nom);
    if (error) {
      console.error('Error fetching traducteur', error);
      return [];
    }
    else{
      return data;
    }
  }

  // exist bib
  const existBibliotheque = async (nom) => {
    const {data, error} = await supabase
    .from('bibliotheque')
    .select('nom')
    .eq('nom', nom);
    if (error) {
      console.error('Error fetching bibliotheque', error);
      return [];
    }
    else{
      return data;
    }
  }
  //genre to id
  const genreToId = async (label) => {
    const {data, error} = await supabase
    .from('genre')
    .select('id')
    .eq('label', label);
    if (error) {
      console.error('Error fetching genre', error);
    }
    else{
      return data;
    }
  };

  //id to genre
  const idToGenre = async (id) => {
    const {data, error} = await supabase
    .from('genre')
    .select('label')
    .eq('id', id);
    if (error) {
      console.error('Error fetching genre', error);
    }
    else{
      return data;
    }
  };

  //updating livre
  const updateLivre = async (id, titre, auteur, editeur, langue, prix, exemplaire, resume, annee_publication, nmbr_page, traducteur, etat, image, genre, louer, acheteur, genre_id,code,bibliotheque, emplacement) => {
    const { data, error } = await supabase
      .from('livre')
      .update({ titre, auteur, editeur, langue, prix, exemplaire, resume, annee_publication, nmbr_page, traducteur, etat, image, genre, louer, acheteur, genre_id,code, bibliotheque, emplacement })
      .eq('id', id);
    if (error) {
      console.error('Error updating livre', error);
    }
    else{
      console.log('Livre updated', data);
    }
  };
//updating auteur
const updateAuteur = async (nom) => {
  const { data, error } = await supabase
    .from('auteur')
    .update({nom})
    .eq('id', id);
  if (error) {
    console.error('Error updating auteur', error);
  }
  else{
    console.log('Auteur updated', data);
  }
};

  //deleting livre
  const deleteLivre = async (id) => {
    const { data, error } = await supabase
      .from('livre')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting livre', error);
    }
    };

     //deleting auteur
  const deleteAuteur = async (nom) => {
    const { data, error } = await supabase
      .from('auteur')
      .delete()
      .eq('nom', nom);
    if (error) {
      console.error('Error deleting auteur', error);
    }
    };
  //fetch specific livre
  const fetchSpecifiqueLivre = async (titre = null, auteur = null, editeur = null, langue = null, annee_publication = null, genre = null) => {
    const query = supabase.from('livre').select('*');
    
    if (titre) {
      query.ilike('titre', `%${titre}%`);
    }
    if (auteur) {
      query.ilike('auteur', `%${auteur}%`);
    }
    if (editeur) {
      query.ilike('editeur', `%${editeur}%`);
    }
    if (langue) {
      query.ilike('langue', `%${langue}%`);
    }
    if (annee_publication) {
      query.eq('annee_publication', annee_publication); // pas besoin d'ilike pour une année
    }
    if (genre) {
      query.ilike('genre', `%${genre}%`);
    }
  
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching specific livre', error);
    } else {
      return data;
    }
  }
  
  //insert caracteristique
  const insertCara = async (table, nom) => {
    if (!Array.isArray(nom)) {
          try {
            const { data, error } = await supabase
              .from(table)
              .insert([{nom}]);
        
            if (error) {
              console.error('Error adding new caracteristique', error);
            } else {
              console.log('New caracteristique added', data);
            }
          } catch (err) {
            console.error('Unexpected error:', err);
          }
      }
    else
    {
      try {
        const { data, error } = await supabase
          .from(table)
          .insert(
            nom.map((x) => ({ nom: x }))
          );
    
        if (error) {
          console.error('Error adding new caracteristique', error);
        } else {
          console.log('New caracteristique added', data);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
  
   
  };
  
  //get noms
  const getNoms = async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('id, nom');
    if (error) {
      console.error('Error fetching noms', error);
    }
    else{
      return data;
    }
  };

  //update caracteristique
  const updateCara = async (table, id, nom) => {
    const { data, error } = await supabase
      .from(table)
      .update({nom})
      .eq('id', id);
    if (error) {
      console.error('Error updating caracteristique', error);
    }
    else{
      console.log('Caracteristique updated', data);
    }
  };

  //supp cara
  const suppCara = async (table, id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting caracteristique', error);
    }
    else{
      console.log('Caracteristique deleted', data
      );  
    }
  }

   //insert pret
   const insertPret = async (id_livre,id_loueur,date_location,date_retour_prevue) => {
    const { data, error } = await supabase
      .from('pret')
      .insert([
        { id_livre, id_loueur, date_location, date_retour_prevue }]);
    if (error) {
      console.error('Error adding new pret', error);
    }
    else{
      console.log('New pret added', data);
    }
  };    

  
  
 //insert loueur
 const insertLoueur = async (nom, prenom, email,tel) => {
  const { data, error } = await supabase
    .from('loueur')
    .insert([
      { nom, prenom,email,tel }]);
  if (error) {
    console.error('Error adding new loueur', error);
  }
  else{
    console.log('New loueur added', data);
  }
};

  //existant loueur
  const existLoueur = async (nom, prenom,tel) => {
    const {data, error} = await supabase
    .from('loueur')
    .select('nom')
    .eq('nom', nom)
    .eq('prenom', prenom)
    .eq('tel', tel);
    if (error) {
      console.error('Error fetching loueur', error);
      return [];
    }
    else{
      return data;
    }
  }

  //delete loueur
  const deleteLoueur = async (id) => {
    const { data, error } = await supabase
      .from('loueur')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Error deleting loueur', error);
    }
    };
   
  //modif loueur
  const updateLoueur = async (id, nom, prenom, email,tel) => {
    const { data, error } = await supabase
      .from('loueur')
      .update({ nom, prenom, email,tel })
      .eq('id', id);
    if (error) {
      console.error('Error updating loueur', error);
    }
    else{
      console.log('Loueur updated', data);
    }
  };  

  //fetchAllpersonne
  const fetchPersonne = async () => {
    const { data, error } = await supabase
      .from('loueur')
      .select('*');
    if (error) {
      console.error('Error fetching personne', error);
    }
    else{
      return data;
    }
  }

  //verifier le loueur
  const bon_loueur = async(id) => {
    let { data, error, status } = await supabase
      .from("pret")
      .select("*", { count: "exact" }) 
      .eq("id_loueur", id)
      .is("date_retour", null);
    if (error && status !== 406) {
      console.error("error", error);
    }
    else{
      return(data.length);
    }
  }


  //verifier exemplaire
  const getExemplaire = async (id) => { 
    const { data, error } = await supabase
      .from('livre')
      .select('exemplaire')
      .eq('id', id);
    if (error) {
      console.error('Error fetching exemplaire', error);
    }
    else{
      return data;
    }
  }

  // Decrementer exemplaire
const decExemplaire = async (id) => {
  const { data, error } = await supabase
    .rpc('dec_exemplaire', { row_id: id });

  if (error) {
    console.error('Error updating exemplaire', error);
  } else {
    console.log('Exemplaire updated', data);
  }
};



  // Incrémenter exemplaire
const incExemplaire = async (id) => {
  const { data, error } = await supabase
    .rpc('inc_exemplaire', { row_id: id });

  if (error) {
    console.error('Error updating exemplaire', error);
  } else {
    console.log('Exemplaire updated', data);
  }
};


  //set livre louer true
  const setLouerBdd = async (id) => {
    const { data, error } = await supabase
      .from('livre')
      .update({louer: true})
      .eq('id', id);
    if (error) {
      console.error('Error updating livre', error);
    }
    else{
      console.log('Livre updated', data);
    }
  }

  //set livre louer false
  const setLouerBddF = async (id) => {
    const { data, error } = await supabase
      .from('livre')
      .update({louer: false})
      .eq('id', id);
    if (error) {
      console.error('Error updating livre', error);
    }
    else{
      console.log('Livre updated', data);
    }
  }

  //fetch bool livre prete
  const livrePrete = async (id) => {
    const { data, error } = await supabase
      .from('pret')
      .select('id')
      .eq('id_livre', id)
      .is('date_retour', null); 
      if (error) {
        console.error('Error fetching livre prete', error);
      }
      else{
        return data.length;
      }
  }
  
 
  
  const fetchBooksByLoueur = async () => {
    const { data, error } = await supabase
    .rpc('get_non_returned_books');

  if (error) {
    console.error('Error fetching non-returned books:', error);
  } else {
    return data;
  }
}
  // restituer livre
  const restituerLivre = async (id, date_retour) => {
    const { data, error } = await supabase
      .from('pret')
      .update({ date_retour })
      .eq('id', id);  
    if (error) {
      console.error('Error restituer livre', error);
    } else {
      console.log('Livre restitué', data);
    }
  };
  // Vérifier si un livre existe avec des conditions AND
const existLivre = async (titre = null, auteur = null, editeur = null, langue = null, annee_publication = null) => {
  let query = supabase.from('livre').select('*');

  if (titre) {
    query = query.eq('titre', titre);
  }
  if (auteur) {
    query = query.eq('auteur', auteur);
  }
  if (editeur) {
    query = query.eq('editeur', editeur);
  }
  if (langue) {
    query = query.eq('langue', langue);
  }
  if (annee_publication) {
    query = query.eq('annee_publication', annee_publication);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Erreur lors de la vérification du livre', error);
    return false; 
  }

  return data.length > 0;
};


  const value = {
    genre,
    fetchGenre,
    insertGenre,
    updateGenre,
    getGenre,
    fetchLivre,
    livre_genre,
    fetchLivre_genre,
    livre_singulier,
    fetchLivre_singulier,
    addLivre,
    genreToId,
    idToGenre,
    updateLivre,
    deleteLivre,
    fetchSpecifiqueLivre,
    fetchAuteur,
    addAuteur,
    AuteurToId,
    idToAuteur,
    updateAuteur,
    deleteAuteur,
    existAuteur,
    existEditeur,
    existTraducteur,
    fetchEditeur,
    fetchTraducteur,
    insertCara,
    getNoms,
    updateCara,
    suppCara,
    fetchLivre_disponible,
    fetchLoueur,
    insertPret,
    insertLoueur,
    bon_loueur,
    existLoueur,
    fetchPersonne,
    deleteLoueur,
    updateLoueur,
    getExemplaire,
    decExemplaire,
    incExemplaire,
    setLouerBdd,
    fetchBooksByLoueur,
    setLouerBddF,
    restituerLivre,
    livrePrete,
    existLivre,
    nbmr_livre,
    fetchBibliotheque,
    existBibliotheque,
    nmbreLivreGenre,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};
