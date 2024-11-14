import React, { useContext, useState, useEffect, useRef } from 'react';
import MainLayout from '../layouts/MainLayout';
import { context } from '../components/context';
import Link from 'next/link';

const AjoutLivre = () => {
    const { addLivre, genreToId,genre, fetchAuteur, fetchEditeur,insertCara, nmbreLivreGenre, fetchTraducteur, fetchBibliotheque, existAuteur, existEditeur, existTraducteur, existBibliotheque } = useContext(context);

    const [titre, setTitre] = useState('');
    const [auteur, setAuteur] = useState('');
    const [editeur, setEditeur] = useState('');
    const [langue, setLangue] = useState('');
    const [prix, setPrix] = useState(0);
    const [exemplaire, setExemplaire] = useState(0);
    const [resume, setResume] = useState('');
    const [annee_publication, setAnneePublication] = useState(0);
    const [nmbr_page, setNmbrPage] = useState(0);
    const [traducteur, setTraducteur] = useState('Aucun');
    const [etat, setEtat] = useState('Neuf');
    const [image, setImage] = useState('https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
    const [genree, setGenre] = useState('');
    const [louer, setLouer] = useState('false');
    const [acheteur, setAcheteur] = useState('Naima');
    const [genre_id, setGenreId] = useState('');
    const [code, setCode] = useState('');
    const [bibliotheque, setBibliotheque] = useState('Bibliothèque Tanqacht N Si Amr');
    const [emplacement, setEmplacement] = useState(''); 

    const [auteurs, setAuteurs] = useState([]);
    const [editeurs, setEditeurs] = useState([]);
    const [traducteurs, setTraducteurs] = useState([]);
    const [bibliotheques, setBibliotheques] = useState([]); 

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [who, setWho] = useState("");
    const [nom, setNom] = useState([]);
    const [blur, setBlur] = useState(false);
    const [foc, setFoc] = useState(false);
    const nomRef = useRef(null);


    
    function capitalizeWords(string) {
        string = String(string);
        return string
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        }

        const handleEmplacement = (e) => {
            let input = e.target.value;
            
            let firstChar = input.charAt(0).match(/[a-zA-Z]/) ? input.charAt(0).toUpperCase() : "";
          
            let nextChars = input.slice(1).replace(/[^0-9]/g, "").slice(0, 2); 
          
            let formattedValue = firstChar;
            if (nextChars.length > 0) {
              formattedValue += " - " + nextChars;
            }
          
            setEmplacement(formattedValue);
          };
          
          

        const resetForm = () => {
            setTitre('');
            setAuteur('');
            setEditeur('');
            setLangue('');
            setPrix(0);
            setExemplaire(0);
            setResume('');
            setAnneePublication(0);
            setNmbrPage(0);
            setTraducteur('Aucun');
            setEtat('Neuf');
            setImage('https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
            setGenre('');
            setLouer('false');
            setAcheteur('Naima');
            setGenreId('');
            setCode('');
            setBibliotheque('');
            setEmplacement(''); 
            setWho('');
            setBlur(false);
        };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (titre.length < 3) {
            setError('Le titre doit contenir au moins 3 caractères.');
            return;
        }
        const auteurExist = await existAuteur(auteur);
        if( auteurExist.length === 0){
            setError('L\'auteur n\'existe pas, veuillez en séléctionner un dans la liste ou en ajouter un nouveau.');
            return;
        }
        const editeurExist = await existEditeur(editeur);
        if( editeurExist.length === 0){
            setError('L\'editeur n\'existe pas, veuillez en séléctionner un dans la liste ou en ajouter un nouveau.');
            return;
        }
        if(traducteur){
            const traducteurExist = await existTraducteur(traducteur);
            if( traducteurExist.length === 0){
                setError('Le traducteur n\'existe pas, veuillez en séléctionner un dans la liste ou en ajouter un nouveau.');
                return;
            }
        }
        if (bibliotheque) {
            const bibliothequeExist = await existBibliotheque(bibliotheque);
            if (bibliothequeExist.length === 0) {
                setError('La bibliothèque n\'existe pas, veuillez en séléctionner une dans la liste ou en ajouter une nouvelle.');
                return;
            }
        }
        
        setImage(image || 'https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
        setPrix(prix || 0);
        setExemplaire(exemplaire || 0);
        setAnneePublication(annee_publication || 0);
        setNmbrPage(nmbr_page || 0);
        setTraducteur(traducteur || 'Aucun');
        setEtat(etat || 'Neuf');
        setEmplacement(emplacement || 'Non défini');
        setCode(code || 'Non défini');
        setAcheteur(acheteur || 'Naima');
        setLouer(louer || 'false');
        setLangue(langue || 'Français');
        setBibliotheque(bibliotheque || 'Bibliothèque Tanqacht N Si Amr');
        setResume(resume || '');
        if(annee_publication>new Date().getFullYear() || annee_publication<1600){
            setError('Année de publication invalide !');
            return;
        }

       setGenre(genree || 'Roman');  
        if (!genre_id || !code) {
        setError('Certaines données nécessaires ne sont pas prêtes. Veuillez réessayer.');
        return;
        }

        //console.log("1"+titre+" 2 "+ auteur+" 3 "+ editeur+" 4 "+ langue+" 5 "+ prix+" 6 "+ exemplaire+" 7 "+ resume+" 8 "+ annee_publication+" 9 "+ nmbr_page+" 10 "+ traducteur+" 11 "+ etat+" 12 "+ image+" 13 "+ genree+" 14 "+ louer+" 15 "+ acheteur+" 16 "+ genre_id+" 17 "+ code+" 18 "+ bibliotheque+" 19 "+ emplacement);
        
        try {
            const ajoutl = await addLivre(capitalizeWords(titre), capitalizeWords(auteur),capitalizeWords(editeur) , capitalizeWords(langue), prix, exemplaire, resume, annee_publication, nmbr_page, capitalizeWords(traducteur), etat, image, genree, louer, capitalizeWords(acheteur), genre_id, code, capitalizeWords(bibliotheque),emplacement );
            if(ajoutl === false){
                setError('Erreur lors de l\'ajout du livre.');
                setSuccess('');
                return;
            }else{
                setSuccess('Livre ajouté avec succès!');
                setError('');
                resetForm();
            }
        } catch (err) {
            setError("Erreur lors de l'ajout du livre.");
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    const handleGenre = async (genre) => {
        if(genre === '') return;
        const id = await genreToId(genre);
        setGenreId(id[0].id);
       const nombre = (await nmbreLivreGenre(parseInt(id[0].id)));
        if(nombre === 0 || nombre ==='0'){
            if(genre==='Politique'){
                setCode(genre.slice(0,4)+'1');
            }
            else{
                setCode(genre.slice(0,3)+'1');
            }
        }
        else{
            const number = nombre +1;
             if(genre==='Politique'){
                setCode(genre.slice(0,4)+number);
            }
            else{
                setCode(genre.slice(0,3)+number);
            }
        }
    };

    const fetchData = async () => {
        const aut = await fetchAuteur();
        setAuteurs(aut);
        const edi = await fetchEditeur();
        setEditeurs(edi);
        const tra = await fetchTraducteur();
        setTraducteurs(tra);
        const bib = await fetchBibliotheque();
        setBibliotheques(bib); 
    };

    const handleSubmitNom = async (e, type) => {
        e.preventDefault();
        if (!nom) {
            alert('Le champ nom est requis');
            return;
        }
    
        if (type.startsWith('--Ajouter un auteur--')) {
            await insertCara('auteur', capitalizeWords(nom));
            setNom('');
            setAuteur('');
            setWho('');
            setBlur(false);
            fetchData();
        } else if (type.startsWith('--Ajouter un editeur--')) {
            await insertCara('editeur', capitalizeWords(nom));
            setNom('');
            setEditeur('');
            setWho('');
            setBlur(false);
            fetchData();
        } else if (type.startsWith('--Ajouter un traducteur--')) {
            await insertCara('traducteur', capitalizeWords(nom));
            setNom('');
            setTraducteur('');
            setWho('');
            setBlur(false);
            fetchData();
        } else if (type.startsWith('--Ajouter une biblio.--')) {
            await insertCara('bibliotheque', capitalizeWords(nom));
            setNom('');
            setBibliotheque('');
            setWho('');
            setBlur(false);
            fetchData();
        } else {
            alert('Aucun type spécifié');
            setWho('');
            setBlur(false);
        }
    };
    

    const handleAnnuler = (e, type) => {
        e.preventDefault();
        setBlur(false);
    
        if (who.startsWith('--Ajouter un auteur--')) {
            setAuteur('');
        } else if (who.startsWith('--Ajouter un editeur--')) {
            setEditeur('');
        } else if (who.startsWith('--Ajouter un traducteur--')) {
            setTraducteur('');
        } else if (who.startsWith('--Ajouter une biblio.--')) {
            setBibliotheque('');
        }
    
        setWho('');
        setNom('');
    };
    


    useEffect(() => {
        if (foc) {
            if (nomRef.current) {
                nomRef.current.focus();
                setFoc(false);
            }
        }
    }, [foc]);
  
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
   
    useEffect(() => {
        fetchData();
      }
      , []);

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        if (savedData) {
            setTitre(savedData.titre || '');
            setLangue(savedData.langue || '');
            setPrix(savedData.prix || 0);
            setExemplaire(savedData.exemplaire || 0);
            setResume(savedData.resume || '');
            setAnneePublication(savedData.annee_publication || 0);
            setNmbrPage(savedData.nmbr_page || 0);
            setEtat(savedData.etat || '');
            setImage(savedData.image || 'https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
            setLouer(savedData.louer || 'false');
            setAcheteur(savedData.acheteur || 'Naima');
            setCode(savedData.code || '');

            setBibliotheque(savedData.bibliotheque || ''); 
            setEmplacement(savedData.emplacement || '');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify({
            titre, auteur, editeur, langue, prix, exemplaire,
            resume, annee_publication, nmbr_page, traducteur,
            etat, image, louer, acheteur, code , bibliotheque, emplacement
        }));
    }, [titre, langue, prix, exemplaire,
        resume, annee_publication, nmbr_page,
        etat, image, louer, acheteur, code , bibliotheque, emplacement]);
    
        const handleInputChange = (e, type) => {
            setWho(e.target.value);
            if (e.target.value.startsWith(type)) {
                setBlur(true);
                setFoc(true);
                setTimeout(() => {
                    if (nomRef.current) {
                        nomRef.current.focus();
                    }
                }, 100);
            } else {
                setFoc(false);
            }
        };
        
    return (
        <MainLayout>
            {who && (who.startsWith('--Ajouter un auteur--') || who.startsWith('--Ajouter un editeur--') || who.startsWith('--Ajouter un traducteur--') || who.startsWith('--Ajouter une biblio.--')) &&
             <form className='formCara' style={{zIndex:'9999',position:'fixed'}} onSubmit={(e) =>{ handleSubmitNom(e, who)}}>
                <fieldset className='fieldCara'>
                  <label htmlFor='nom' style={{textAlign:'center', color:'white'}}><h3>{who}</h3></label>
                  <input placeholder="Saisissez un nom" ref={nomRef} type='text' id='nom' name='nom' onChange={(e) =>{setNom((e.target.value).split(',').map((x) => x.trim()).filter((x) => x !== ''))}} />
                  <div className='infoBulle' title='Saisissez plusieurs noms à la fois en les séparant par des virgules. Ex : Oda, Er Gen.'>ⓘ</div>
                  <section className='formCarab'>
                    <button onClick={(e) => {handleAnnuler(e,who)}}>Annuler</button>
                    <button type='submit'>Ajouter</button>
                  </section>
                </fieldset>
              </form>}
            <form onSubmit={handleSubmit} className={`${blur ? 'blurEdit' : ''}`}>
                <fieldset className='form-livre preview-container'>
                    <legend>Ajouter un livre</legend>
                    <div>
                        <label>Titre du livre</label>
                        <input required placeholder='Saisir le titre du livre' type="search" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div>
                        <label>Auteur</label>
                        <input list='auteurs' placeholder='▼ Séléctionner un auteur ▼' required type="search"  value={auteur} onChange={(e) =>{ setAuteur(e.target.value); handleInputChange(e, '--Ajouter un auteur--');}} />
                        <datalist id="auteurs">
                            <option >--Ajouter un auteur--</option>
                            {auteurs.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label>Editeur</label>
                        <input list='editeurs' placeholder='▼ Séléctionner un éditeur ▼' required type="search" value={editeur} onChange={(e) => {setEditeur(e.target.value); handleInputChange(e, '--Ajouter un editeur--');}} />
                        <datalist id="editeurs">
                            <option >--Ajouter un editeur--</option>
                            {editeurs.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label>Genre</label>
                        
                        <select required value={genree} onChange={(e) => { setGenre(e.target.value); handleGenre(e.target.value); }}>
                            <option value="">Choisir un genre</option>
                            {genre.map((genre_) => (
                                <option key={genre_.id} value={genre_.label}>{genre_.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Année de publication</label>
                        <input min={0} required type="number" value={annee_publication === 0 ? '' : annee_publication} placeholder="Saisir l'année de publication du livre" onChange={(e) => setAnneePublication(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Image</label>
                        <div className='divImagePetite'>
                        <input type="search" style={{width:'100%'}} placeholder="Saisir l'adresse d'une image" value={image} onChange={(e) => setImage(e.target.value)} />
                        {image && <img className='monFormImage' src={image} alt="Preview"/>} 
                        </div>
                    </div>
                    <div>
                        <label>Acheteur</label>
                        <select type="text" value={acheteur} onChange={(e) => setAcheteur(e.target.value)} >
                            <option value="Naima">Naima</option>
                            <option value="Mohand">Mohand</option>
                            <option value="Tanina">Tanina</option>
                            <option value="Lynda">Lynda</option>
                            <option value="Massine">Massine</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div>
                        <label>Langue</label>
                        <select type="text" value={langue} onChange={(e) => setLangue(e.target.value)}>
                            <option value="">Choisir une langue</option>
                            <option value="français">Français</option>
                            <option value="anglais">Anglais</option>
                            <option value="arabe">Arabe</option>
                            <option value="tamazight">Tamazight</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div>                       
                        <label htmlFor="bibliotheque">Bibliothèque:</label>
                        <input list='bibliotheques' type="search" id="bibliotheque" placeholder='▼ Séléctionner une bibliothèque ▼' value={bibliotheque} onChange={(e) => {setBibliotheque(e.target.value); handleInputChange(e, '--Ajouter une biblio.--'); }}  />
                        <datalist id="bibliotheques">
                            <option >--Ajouter une biblio.--</option>
                            {bibliotheques.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="emplacement">Emplacement:</label>
                        <input maxLength={6} placeholder='Ex : A - 9' title='Ligne - Colonne' type="text" id="emplacement" value={emplacement} onChange={handleEmplacement} />
                    </div>
                    <div>
                        <label>Traducteur</label>
                        <input list='traducteurs' type="search" placeholder='▼ Séléctionner un traducteur ▼' value={traducteur} onChange={(e) => {setTraducteur(e.target.value);  handleInputChange(e, '--Ajouter un traducteur--'); }} />
                        <datalist id="traducteurs">
                            <option >--Ajouter un traducteur--</option>
                            {traducteurs.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label>Prix</label>
                        <input min="0" type="number" step="0.01"  
                        value={prix === 0 ? '' : prix}
                        placeholder="Saisir le prix du livre €" 
                        onChange={(e) => {    
                             let value = e.target.value;
                             value = value.replace("-", "");
                             if (!isNaN(value) && value !== "") {
                               setPrix(parseFloat(value));
                             } else {
                               setPrix(0);
                             }
                           }} />
                    </div>
                    <div>
                        <label>Nombre d'exemplaire</label>
                        <input min={0} type="number" value={exemplaire === 0 ? '' : exemplaire} placeholder="Saisir le nombre d'exemplaire" onChange={(e) => setExemplaire(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Nombre de pages</label>
                        <input min={0} type="number" value={nmbr_page===0 ? '' : nmbr_page } placeholder='Saisir le nombre de page' onChange={(e) => setNmbrPage(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Etat du livre</label>
                        <select value={etat} onChange={(e) => setEtat(e.target.value)}>
                            <option value="neuf">Neuf</option>
                            <option value="bon">Bon</option>
                            <option value="moyen">Moyen</option>
                            <option value="mauvais">Mauvais</option>
                        </select>
                    </div>        
                    <div>
                        <label>Le livre est prêté ?</label>
                        <select value={louer} onChange={(e) => setLouer(e.target.value)}>
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                        </select>
                    </div>
                    <div className='textArea900'>
                        <label>Résumé</label>
                        <textarea required placeholder='Décrivez le livre en quelques phrases !' value={resume} onChange={(e) => setResume(e.target.value)} />
                    </div>
                    <div className='monForm2'>
                                    <label style={{textAlign:'center',alignSelf:'center'}}>Code du livre</label>
                                    <input style={{width:'30%',textAlign:'center',alignSelf:'center'}} type="text" placeholder='-' value={code} readOnly onChange={()=>setCode(e.target.value)}/>                        
                    </div>
                    {(error || success || loading) &&
                    <div className='textArea900'>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    {loading && <div className="loading-spinner">Chargement...</div>}
                    </div>
                    }
                        <div className='form-button s4'>
                            <button onClick={resetForm}>Annuler</button>
                            <button type="submit">Ajouter</button>
                        </div>
                   

                </fieldset>
            </form>
           
        </MainLayout>
    );
};

export default AjoutLivre;
