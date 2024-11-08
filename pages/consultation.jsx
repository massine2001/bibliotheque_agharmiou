import React, { useContext, useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import Link from 'next/link';
import { context } from '../components/context';
import Footer from '../components/Footer';

const Consultation = () => {
  const [search, setSearch] = useState('');
  const {  fetchLivre } = useContext(context);
  const [livre, setLivre] = useState([]);
  const [filteredLivre, setFilteredLivre] = useState([]);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const l = await fetchLivre();
      setLivre(l);
      setFilteredLivre(l);
    };
    fetchData();
  }
  , []);


  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      setFilteredLivre(livre.filter((livre_) => {
        const titre = livre_.titre ? livre_.titre.toLowerCase() : ""; 
        const auteur = livre_.auteur ? livre_.auteur.toLowerCase() : ""; 
        const editeur = livre_.editeur ? livre_.editeur.toLowerCase() : ""; 
        const annee = livre_.annee_publication ? livre_.annee_publication.toString().toLowerCase() : "";
        const langue = livre_.langue ? livre_.langue.toLowerCase() : ""; 
        const code = livre_.code ? livre_.code.toLowerCase() : "";
  
        return titre.includes(search.toLowerCase()) ||
               auteur.includes(search.toLowerCase()) ||
               editeur.includes(search.toLowerCase()) ||
               annee.includes(search.toLowerCase()) ||
               code.includes(search.toLowerCase()) ||
               langue.includes(search.toLowerCase());
      }));
    } else {
      setFilteredLivre(livre);
    }
  }, [search, livre]);
  

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTri = (e) => {
    const tri = e.target.value;
    if (tri === 'titre') {
      setFilteredLivre([...filteredLivre].sort((a, b) => a.titre.localeCompare(b.titre)));
    } else if (tri === 'auteur') {
      setFilteredLivre([...filteredLivre].sort((a, b) => a.auteur.localeCompare(b.auteur)));
    } else if (tri === 'recent') {
      setFilteredLivre([...filteredLivre].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    }   
    else if (tri === 'ancien') {
      setFilteredLivre([...filteredLivre].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
    } 
     else if (tri === 'annee') {
      setFilteredLivre([...filteredLivre].sort((a, b) => a.annee_publication - b.annee_publication));
    }
  }

  return (
    <MainLayout>
      <div className='livre-grid'>
        <div>
          <div className='searchConsul'>
            <h4 style={{marginLeft:'auto',borderStyle:'dotted',padding:'3px',borderRight:'none',borderLeft:'none'}}>Nombre total de livres : {livre.length} </h4>
            <input name={"consultation"} className='barre_consultation' onChange={handleChange} type="search" placeholder='Chercher un ouvrage par code, titre, auteur, éditeur, année de publication ou par langue !' value={search} />
          </div>
          <div >
            <select className='selectConsul' name="tri" id="tri" onChange={(e) =>{handleTri(e)}} >
              <option value="titre">Trier par ordre alphabétique (Titre)</option>
              <option value="auteur">Trier par ordre alphabétique (Auteur)</option>
              <option value="recent">Trier par l'ajout le plus récent</option>
              <option value="ancien">Trier par l'ajout le plus ancien</option>
              <option value="annee">Trier par année de publication</option>
              
            </select>
          </div>
        </div>
        <h4 className='mobileTotal'>Nombre total de livres : {livre.length}</h4>

        {filteredLivre.map((livre_) => (
          <Link key={livre_.id} style={{textDecoration:'none',color:'black'}} href={`/livre/${livre_.id}`}>

          <div className='livreConsul'>
            <div className='livre_image'>
              <img src={livre_.image} alt={livre_.titre} className='imageConsultation' />
            </div>
            <div className='livre_info'>
            <h3>{livre_.titre.length > 33 ? livre_.titre.substring(0, 33) + "..." : livre_.titre}</h3>
            {width < 900 && (
                <>
                  {livre_.auteur && <p className='mobile-auteur'>{livre_.auteur}</p>}
                  {livre_.editeur && <p>Editeur : {livre_.editeur}</p>}
                  {livre_.langue && <p>Langue : {livre_.langue}</p>}
                  {livre_.annee_publication && <p>Année de publication : {livre_.annee_publication}</p>}
                  {livre_.created_at && <p>Ajouté le : {new Date(livre_.created_at).toLocaleDateString()}</p>}
                </>
              )}
             
              {width >= 900 && (
                <>
                  {livre_.auteur && <p className='desktop-auteur'>{livre_.auteur}</p>}
                  {livre_.editeur && <p>Editeur : {livre_.editeur}</p>}
                  {livre_.langue && <p>Langue : {livre_.langue}</p>}
                  {livre_.annee_publication && <p>Année de publication : {livre_.annee_publication}</p>}
                  {livre_.created_at && <p>Ajouté le : {new Date(livre_.created_at).toLocaleDateString()}</p>}
                </>
              )}
            </div>
          </div>            
          </Link>

        ))}
      </div>
      <Footer />

    </MainLayout>
  );
};

export default Consultation;
