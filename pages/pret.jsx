import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useState, useContext, useEffect } from 'react';
import { context } from '../components/context';
import ProtectedRoute from '../components/ProtectedRoute';

const PretRestitutionPage = () => {
    const {fetchLivre_disponible, fetchLoueur,livrePrete, insertPret,restituerLivre,setLouerBddF, bon_loueur, getExemplaire, incExemplaire, setLouerBdd,decExemplaire,fetchBooksByLoueur} = useContext(context);

    const [clicpret, setClicPret] = useState(false);
    const [clicrestituer, setClicRestituer] = useState(false);
    
    const [loueur, setLoueur] = useState([]);
    const [livre, setLivre] = useState('');
    const [dateRetour, setDateRetour] = useState('');
    const [livreDisponible, setLivreDisponible] = useState([]);
    const [livreEmprunte, setLivreEmprunte] = useState([]);
    const [loueurDisponible, setLoueurDisponible] = useState([]);
    const [livre_id, setLivre_id] = useState([]);
    const [loueur_id, setLoueur_id] = useState([]);
    const [id_pret, setId_pret] = useState([]);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    
    const fetchData = async () => {
        const data = await fetchLivre_disponible();
        setLivreDisponible(data);
    }
    const fetchDataLoueur = async () => {
        const data = await fetchLoueur();
        setLoueurDisponible(data);
    }
    const fetchLivreEmprunte = async () => {
        const data = await fetchBooksByLoueur();
        setLivreEmprunte(data);
    }

    useEffect(() => {
        fetchData();
        fetchDataLoueur();
        fetchLivreEmprunte();
    }, []);


    const resetForm = () => {
        setLivre('');
        setLoueur('');
        setDateRetour(getCurrentDatePlus15());
        setLivre_id('');
        setLoueur_id('');
        setId_pret('');

    };

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
        const day = String(today.getDate()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
      
        return `${year}-${month}-${day}`;
      };

      const getCurrentDatePlus15 = () => {
            const today = new Date();
            today.setDate(today.getDate() + 15); // Ajoute 15 jours à la date actuelle
          
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
            const day = String(today.getDate()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
          
            return `${year}-${month}-${day}`;
          
      };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(dateRetour <= getCurrentDate()){
            setError('La date de retour doit être supérieure à la date actuelle');
            return;
        }
        const count = await bon_loueur(loueur_id);
        if(count == 2){
            setError('Attention : Ce loueur aura maintenant 3 livres en sa possession, il ne pourra plus en emprrunter !');
        }
        if(count == 3){
            setError('Attention : ce loueur a 3 livres en sa possession, il ne pourra plus en emprunter !');
            return;
        }
        const exemplaireRestant = await getExemplaire(livre_id);
        if(exemplaireRestant <1){
            setError('Il n\'y a plus d\'exemplaire disponible pour ce livre');
            return;
        }
        await decExemplaire(livre_id);
        await setLouerBdd(livre_id);
        const res = await insertPret(livre_id, loueur_id,getCurrentDate(),dateRetour);
 
        setSuccess('Livre prêté avec succès');
        resetForm();
        await fetchData();
        await fetchDataLoueur();
        await fetchLivreEmprunte();
    }


    const handleSubmitRestituer = async (e) => {
        e.preventDefault(); 
        await incExemplaire(livre_id);
        const res = await restituerLivre(id_pret,getCurrentDate());
        const exemplaireRestant = await livrePrete(livre_id);
        if(exemplaireRestant == 0){
            await setLouerBddF(livre_id);
        }


        setSuccess('Livre restitué avec succès');
        resetForm();
        
        await fetchData();
        await fetchDataLoueur();
        await fetchLivreEmprunte();
    }

    const handlePersonne = async (val) => {
        if(val === '--Ajouter une personne--'){
            window.location.href = '/ajoutPersonne';
        }
      }

      const handleAccueil = () => {
        clicrestituer && setClicRestituer(false);
        clicpret && setClicPret(false);
        resetForm();
    }
    
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 4000);
    
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 4000);
    
            return () => clearTimeout(timer);
        }
    }, [error]);
     

    const handleDate = (date) => {
        const today = new Date();
        today.setDate(today.getDate() + parseInt(date)); // Ajoute 15 jours à la date actuelle
      
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
        const day = String(today.getDate()).padStart(2, '0'); // Ajoute un zéro devant si nécessaire
      
        setDateRetour(`${year}-${month}-${day}`);
    }

    
  return (
    <MainLayout>
            <ProtectedRoute>

      <div className='pret'>
       {!clicpret && !clicrestituer &&
        (
        <>
            <div className='pretp' onClick={()=>setClicPret(true)}>
                <span>Prêter un livre</span>
            </div>
            <div className='pretr' onClick={()=>setClicRestituer(true)}>
                <span>Restituer un livre</span>
            </div>
        </>
    )}
        {clicpret && (
                <form onSubmit={handleSubmit}>
                    <fieldset className='fieldPret'>
                        <legend>Prêt d'un livre</legend>
                        <label>Livre :</label>
                        <input list='livreDisponible' required type="search" placeholder='Séléctionnez un livre à prêter' value={livre} onChange={(e) =>{
                            const input = e.target; 
                            const options = Array.from(input.list.options);
                            const selectedOption = options.find(option => option.value === input.value); 
                            if (selectedOption) {
                             setLivre_id(selectedOption.dataset.id);    
                            }
                            setLivre(input.value)}} 
                        />
                        <datalist id="livreDisponible">
                            {livreDisponible && livreDisponible.map((a) => (
                                <option key={a.id} data-id={a.id} value={a.auteur ? `${a.titre} par ${a.auteur}` : a.titre} />
                            ))}                            
                        </datalist>
                        <label>Emprunteur :</label>
                        <input list='loueurDisponible' required type="search" placeholder="Séléctionnez l'emprunteur" value={loueur} onChange={(e) =>{
                            const input = e.target; 
                            const options = Array.from(input.list.options);
                            const selectedOption = options.find(option => option.value === input.value); 
                            if (selectedOption) {
                             setLoueur_id(selectedOption.dataset.id);   
                             handleDate(selectedOption.dataset.retour);
                            }
                            setLoueur(input.value);
                            handlePersonne(e.target.value);
                            }
                        }
                        />
                        <datalist id="loueurDisponible">
                            <option value='--Ajouter une personne--'/>
                            {loueurDisponible && loueurDisponible.map((a) => (
                                <option key={a.id} data-id={a.id} data-retour={a.duree_pret} value={ `${a.nom}  ${a.prenom}`}  />
                            ))}                            
                        </datalist>
                        <label>Date retour :</label>
                        <input required type="date" value={dateRetour} onChange={(e) =>{ setDateRetour(e.target.value)}}/>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        {loading && <div className="loading-spinner">Chargement...</div>}
                        <div className='form-button'>
                            <button onClick={handleAccueil}>Annuler</button>
                            <span>|</span>
                            <button onClick={resetForm}>Réinitialiser</button>
                            <span>|</span>
                            <button type="submit">Prêter</button>
                        </div>
                    </fieldset>
                </form>
        )}
        {clicrestituer && (
            <div className='restituer'>
                 <form onSubmit={handleSubmitRestituer}>
                    <fieldset className='fieldPret'>
                        <legend>Restituer un ouvrage</legend>
            
                        <label>Ouvrage(s) emprunté(s) :</label>
                        <input list='livreEmprunte' required type="search" placeholder='Séléctionnez un ouvrage à restituer' value={livre} onChange={(e) =>{
                            const input = e.target; 
                            const options = Array.from(input.list.options);
                            const selectedOption = options.find(option => option.value === input.value); 
                            if (selectedOption) {
                             setLivre_id(parseInt(selectedOption.dataset.id));  
                             setId_pret(parseInt(selectedOption.dataset.idp));  
                            }
                            setLivre(input.value)}} 
                        />

                        <datalist id="livreEmprunte">
                            {livreEmprunte && livreEmprunte.map((a) => (
                                <option key={a.id} data-idp={a.id} data-id={a.id_livre} value={a.auteur ? `${a.titre} par ${a.auteur}` : a.titre}  />
                            ))}                            
                        </datalist>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                        {loading && <div className="loading-spinner">Chargement...</div>}
                        <div className='form-button'>
                            <button onClick={handleAccueil}>Annuler</button>
                            <span>|</span>
                            <button onClick={resetForm}>Réinitialiser</button>
                            <span>|</span>
                            <button type="submit">Restituer</button>
                        </div>
                    </fieldset>
                </form>
          
            </div>
        )}
      </div>
        </ProtectedRoute>
    </MainLayout>
  );
};

export default PretRestitutionPage;
