import React, { useContext, useState, useEffect, useRef } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { context } from '../../components/context';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import Footer from '../../components/Footer';

const ModifLivre = () => {
    const { genre, updateLivre,nmbreLivreGenre, genreToId, fetchLivre_singulier,insertCara,fetchBibliotheque, livre_singulier,fetchAuteur, fetchEditeur , fetchTraducteur, existAuteur, existEditeur, existTraducteur,existBibliotheque} = useContext(context);


    const router = useRouter();
    const { id } = router.query;



    const [livreid, setLivreId] = useState(0);
    const [titre, setTitre] = useState('');
    const [auteur, setAuteur] = useState('');
    const [editeur, setEditeur] = useState('');
    const [langue, setLangue] = useState('');
    const [prix, setPrix] = useState(0);
    const [exemplaire, setExemplaire] = useState(0);
    const [resume, setResume] = useState('');
    const [annee_publication, setAnneePublication] = useState(0);
    const [nmbr_page, setNmbrPage] = useState(0);
    const [traducteur, setTraducteur] = useState('');
    const [etat, setEtat] = useState('');
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
        setTraducteur('');
        setEtat('');
        setImage('https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
        setGenre('');
        setLouer('false');
        setAcheteur('Naima');
        setGenreId('');
        setCode('');
        setBibliotheque(''); 
        setEmplacement('');
    };


    useEffect(() => {
        if (router.isReady && id) {
            fetchLivre_singulier(id);
            setLivreId(id);
        }
    }, [router.isReady, id]);

    useEffect(() => {
        if (livre_singulier.length > 0) {
            const livre = livre_singulier[0];
            setLivreId(livre?.id || 0);
            setTitre(livre?.titre || '');
            setAuteur(livre?.auteur || '');
            setEditeur(livre?.editeur || '');
            setLangue(livre?.langue || '');
            setPrix(livre?.prix || 0);
            setExemplaire(livre?.exemplaire || 0);
            setResume(livre?.resume || '');
            setAnneePublication(livre?.annee_publication || 0);
            setNmbrPage(livre?.nmbr_page || 0);
            setTraducteur(livre?.traducteur || '');
            setEtat(livre?.etat || '');
            setImage(livre?.image || 'https://us.123rf.com/450wm/dp3010/dp30101401/dp3010140100016/24917468-red-leather-book-cover.jpg');
            setGenre(livre?.genre || '');
            setLouer(livre?.louer || 'false');
            setAcheteur(livre?.acheteur || 'Naima');
            setGenreId(livre?.genre_id || '');
            setCode(livre?.code || '');
            setBibliotheque(livre?.bibliotheque || 'Bibliothèque Tanqacht N Si Amr'); 
            setEmplacement(livre?.emplacement || ''); 
        } 
    }, [livre_singulier]);

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
         switch(type){
           case '--Ajouter un auteur--':
             await insertCara('auteur', capitalizeWords(nom));
             setNom('');
             setAuteur('');
             setWho('');
             setBlur(false);
             fetchData();
             break;
           case '--Ajouter un editeur--':
             await insertCara('editeur', capitalizeWords(nom));
             setNom('');
             setEditeur('');
             setWho('');
             setBlur(false);
             fetchData();
             break;
           case '--Ajouter un traducteur--':
             await insertCara('traducteur', capitalizeWords(nom));
             setNom('');
             setTraducteur('');
             setWho('');
             setBlur(false);
             fetchData();
             break;
           case '--Ajouter une biblio.--':
                await insertCara('bibliotheque', capitalizeWords(nom));
                setNom('');
                setBibliotheque('');
                setWho('');
                setBlur(false);
                fetchData();
                break;
           default:
             setWho('');
             setBlur(false);
         }
    };  

    const handleAnnuler = (e,type) =>{
        e.preventDefault();
        setBlur(false);
        switch(who){
            case '--Ajouter un auteur--':
                setAuteur('');
                break;
            case '--Ajouter un editeur--':
                setEditeur('');
                break;
            case '--Ajouter un traducteur--':
                setTraducteur('');
                break;
            case '--Ajouter une biblio.--':
                setBibliotheque('');
                break;
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
        fetchData();
      }
      , []);

    const handleSubmit = async (e) => {
        setLoading(true);

        e.preventDefault();
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

        if(annee_publication>new Date().getFullYear() || annee_publication<1600){
            setError('Année de publication invalide !');
            return;
        }
        try {
            await updateLivre(livreid, capitalizeWords(titre), capitalizeWords(auteur), capitalizeWords(editeur), langue, prix, exemplaire, resume, annee_publication, nmbr_page, capitalizeWords(traducteur), etat, image, genree, louer, capitalizeWords(acheteur), genre_id,code, capitalizeWords(bibliotheque),capitalizeWords(emplacement) );
            setSuccess('Livre modifié avec succès!');
            setError('');
            resetForm();
            router.push('/editer');
        } catch (err) {
            setError('Erreur lors de la modification du livre.');
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

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
    

    const handleGenre = async (genre) => {
        if(genre === '') return;
        const id = await genreToId(genre);
        setGenreId(id[0].id);
        const nombre = (await nmbreLivreGenre(parseInt(id[0].id)));
        if(nombre === 0 || nombre ==='0'){
            setCode(genre.slice(0,3)+'1');
        }
        else{
            const number = nombre +1;
            setCode(genre.slice(0,3)+number);
        }
    }
    const handleEmplacement = (e) => {
        let input = e.target.value;
        
        // Limite le premier caractère à une lettre
        let firstChar = input.charAt(0).match(/[a-zA-Z]/) ? input.charAt(0).toUpperCase() : "";
      
        // Limite les deux caractères suivants à des chiffres
        let nextChars = input.slice(1).replace(/[^0-9]/g, "").slice(0, 2); // Seules deux chiffres sont autorisées
      
        // Formate dans le format "A - 99" si les chiffres existent
        let formattedValue = firstChar;
        if (nextChars.length > 0) {
          formattedValue += " - " + nextChars;
        }
      
        setEmplacement(formattedValue);
      };

    return (
        <MainLayout>
            <ProtectedRoute>

            {who && (who=='--Ajouter un auteur--' || who=='--Ajouter un editeur--' || who=='--Ajouter un traducteur--' || who=='--Ajouter une biblio.--') &&
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
                    <legend><h1>Modifier un livre</h1></legend>
                    <div>
                        <label>Titre</label>
                        <input required placeholder='Saisir le titre du livre' type="search" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div>
                        <label>Auteur</label>
                        <input required list='auteurs' placeholder='▼ Séléctionner un auteur ▼' type="search" value={auteur} onChange={(e) => {setAuteur(e.target.value);setWho(e.target.value);e.target.value=='--Ajouter un auteur--' ? setBlur(true) : ''; setFoc(true)}} />
                        <datalist id="auteurs">
                            <option >--Ajouter un auteur--</option>
                            {auteurs.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label>Editeur</label>
                        <input required list='editeurs' placeholder='▼ Séléctionner un éditeur ▼' type="search" value={editeur} onChange={(e) => {setEditeur(e.target.value); setWho(e.target.value);e.target.value=='--Ajouter un editeur--' ? setBlur(true) : '';setFoc(true)}} />
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
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
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
                        <select required type="text" value={langue} onChange={(e) => setLangue(e.target.value)}>
                            <option value="" disabled>Choisir une langue</option>
                            <option value="français">Français</option>
                            <option value="anglais">Anglais</option>
                            <option value="arabe">Arabe</option>
                            <option value="tamazight">Tamazight</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div>                       
                        <label htmlFor="bibliotheque">Bibliothèque:</label>
                        <input list='bibliotheques' type="search" id="bibliotheque" placeholder='▼ Séléctionner une bibliothèque ▼' value={bibliotheque} onChange={(e) => {setBibliotheque(e.target.value);setWho(e.target.value);e.target.value=='--Ajouter une biblio.--' ? setBlur(true) : '';setFoc(true) }}  />
                        <datalist id="bibliotheques">
                            <option >--Ajouter une biblio.--</option>
                            {bibliotheques.map((a) => (
                                <option key={a.id} value={a.nom}/>
                            ))}                            
                        </datalist>
                    </div>
                    <div>
                        <label htmlFor="emplacement">Emplacement:</label>
                        <input maxLength={6} placeholder='Ex : A - 9' type="text" id="emplacement" title='Ligne - Colonne' value={emplacement} onChange={handleEmplacement} />
                    </div>
                    <div>
                        <label>Traducteur</label>
                        <input list='traducteurs' type="search" value={traducteur} onChange={(e) => {setTraducteur(e.target.value);setWho(e.target.value);e.target.value=='--Ajouter un traducteur--' ? setBlur(true) : '';setFoc(true)}} />
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
                            }}
                        />
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
                        <textarea required  placeholder='Décrivez le livre en quelques phrases !' value={resume} onChange={(e) => setResume(e.target.value)} />
                    </div>
                    <div className='monForm2'>
                        <label style={{textAlign:'center',alignSelf:'center'}}>Code du livre</label>
                        <input style={{width:'30%',textAlign:'center',alignSelf:'center'}} type="text" placeholder='-' value={code} readOnly onChange={()=>setCode(e.target.value)}/>                        
                    </div>
                    <div className='textArea900'>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    {loading && <div className="loading-spinner">Chargement...</div>}
                    </div>
                    <div className='form-button s4'>
                        <Link href='/'><button>Annuler</button></Link>
                        <button type="submit">Modifier</button>
                    </div>
                </fieldset>
            </form>
            </ProtectedRoute>

        </MainLayout>
    );
};

export default ModifLivre;
