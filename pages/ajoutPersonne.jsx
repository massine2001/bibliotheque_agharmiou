import React, { useContext, useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { context } from '../components/context';

const AjoutPersonne = () => {
  
    const { insertLoueur, existLoueur, fetchPersonne, deleteLoueur,updateLoueur } = useContext(context);


    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    const [nomM, setNomM] = useState('');
    const [prenomM, setPrenomM] = useState('');
    const [emailM, setEmailM] = useState('');
    const [telM, setTelM] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [persList, setPersList] = useState([]);

    const [selectedPersId, setSelectedPersId] = useState(null);
    const [selectedPerson, setSelectedPerson] = useState(null);


    const [val, setVal] = useState('ajout');

    function capitalizeWords(string) {
        return string
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        }

    const fetchData = async () => {
        const data = await fetchPersonne();
        setPersList(data);
    }

    useEffect(() => {
        fetchData();
    }, []);

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
    
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const xs = await existLoueur(nom, prenom,tel);
            if( xs.length !== 0){
                setError('Cette personne existe déjà');
                setLoading(false);
                return;
            }
            await insertLoueur(capitalizeWords(nom), capitalizeWords(prenom), email, tel);
            setSuccess(`${nom} ${prenom} a été ajoutée avec succès`);
            fetchData();
            handleReset();
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de l\'ajout de la personne');
            setLoading(false);
        }
    };

    const handleSubmitSupp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!selectedPersId) {
                setError('Veuillez sélectionner une personne valide à supprimer');
                setLoading(false);
                return;
            }
            await deleteLoueur(selectedPersId);
            alert('La personne a été supprimée avec succès');
            fetchData();
            handleReset();
            setVal('ajout');
            setLoading(false);
        } catch (err) {
            setError('Erreur lors de la suppression de la personne');
            setLoading(false);
        }
    };

    const handleSubmitMod = async (e, id) => {
        e.preventDefault();
        setLoading(true);
        try {
           
            if (!selectedPerson) {
                setError('Veuillez sélectionner une personne valide à modifier');
                setLoading(false);
                return;
            }
            if(nomM === '' || prenomM === '' || emailM === '' || telM === ''){
                setError('Veuillez remplir tous les champs');
                setLoading(false);
                return;
            }
            if(nomM === selectedPerson.nom && prenomM === selectedPerson.prenom && emailM === selectedPerson.email && telM === selectedPerson.tel){
                setError('Aucune modification n\'a été apportée');
                setLoading(false);
                return;
            }
            if(telM.length !== 10 || !telM.match(/^[0-9]+$/) ){
                setError('Le numéro de téléphone doit contenir 10 chiffres');
                setLoading(false);
                return;
            }
            if( telM.startsWith('0') === false){
                setError('Le numéro de téléphone doit commencer par 0');
                setLoading(false);
                return;
            }
            if(!selectedPerson || !id)
            {
                setError('Veuillez sélectionner une personne à modifier');
                setLoading(false);
                return;
            }
            await updateLoueur(id, capitalizeWords(nomM), capitalizeWords(prenomM), emailM, telM);
            fetchData();
            setSuccess(`${nomM} ${prenomM} a été modifiée avec succès`);
            handleResetM();
            setVal('ajout');
            setLoading(false);
        } catch (err) {
            
            setError('Erreur lors de la modification de la personne');
            setLoading(false);
        }
    };


    const handleReset = () => {
        setNom('');
        setPrenom('');
        setEmail('');
        setTel('');
    };
    const handleResetM = () => {
        setSelectedPerson(null);
        setNomM('');
        setPrenomM('');
        setEmailM('');
        setTelM('');

    };
    const handleNettoyage = () => {
        handleResetM();
        handleReset();
        setSelectedPersId(null);
        setSelectedPerson(null);
    }
        
    return (
        <MainLayout>
           <div>
           <menu className='form-button' style={{gap:'1rem'}}>
                <button onClick={()=>{setVal('ajout');handleNettoyage()}}>Ajouter</button>
                <button onClick={()=>{setVal('modif');handleNettoyage()}}>Modifier</button>
                <button onClick={()=>{setVal('supp');handleNettoyage()}}>Supprimer</button>
            </menu>
           </div>
            {val=='ajout' && <form onSubmit={handleSubmit}>
                <fieldset className='form-livre preview-container'> 
                    <legend><h1>Ajouter une personne</h1></legend>
                    <div>
                        <label>Nom</label>
                        <input placeholder='Saisir un nom' required type="text" value={nom} onChange={(e) =>{setNom(e.target.value)}} />
                    </div>
                    <div>
                        <label>Prénom</label>
                        <input placeholder='Saisir un prénom' type="text" value={prenom} onChange={(e) => {setPrenom(e.target.value)}} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input placeholder='Saisir un email' type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                    </div>
                    <div>
                        <label>Téléphone</label>
                        <input placeholder='Saisir un numéro de téléphone' min={0} type="number" value={tel} onChange={(e) => {setTel(e.target.value)}} />
                    </div>
                    <div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    {loading && <div className="loading-spinner">Chargement...</div>}
                    </div>
                    <div className='form-button'>
                        <button onClick={handleReset}>Réinitialiser</button>
                        <button type="submit">Ajouter</button>
                    </div>
                </fieldset>
            </form>}
            {val=='modif' && 
           
            <form onSubmit={(e)=>handleSubmitMod(e,selectedPerson.id)}>
              <fieldset className='form-livre preview-container'> 
                <legend><h1>Modifier une personne</h1></legend>
                <input className='selectPersonne' placeholder='Séléctionner la personne à modifier' type="search" list='persList' 
                    onChange={(e) => {
                        const selectedOption = persList.find(
                        (pers) => `${pers.nom} ${pers.prenom} -- ${pers.email} -- ${pers.tel}` === e.target.value
                        );
                        setSelectedPerson(selectedOption);
                        setNomM(selectedOption ? selectedOption.nom : '');
                        setPrenomM(selectedOption ? selectedOption.prenom : '');
                        setEmailM(selectedOption ? selectedOption.email : '');
                        setTelM(selectedOption ? selectedOption.tel : '');
                    }}
                    />
                    <datalist id="persList">
                        {persList && persList.map((pers) => (
                            <option key={pers.id} data-id={pers.id} value={`${pers.nom} ${pers.prenom} -- ${pers.email} -- ${pers.tel}`} />
                        ))} 
                    </datalist>
                    <div>
                        <label>Nom</label>
                        <input placeholder='Saisir un nom' required type="text" value={nomM} disabled={!selectedPerson}  onChange={(e) =>{ const re = /^[A-Za-z]+$/;if(re.test(e.target.value) || e.target.value===''){ setNomM(e.target.value) }}} />
                    </div>
                    <div>
                        <label>Prénom</label>
                        <input placeholder='Saisir un prénom' required type="text" value={prenomM}   disabled={!selectedPerson} onChange={(e) => { const re = /^[A-Za-z]+$/;if(re.test(e.target.value) || e.target.value===''){ setPrenomM(e.target.value) }}} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input placeholder='Saisir un email' required type="email" value={emailM}   disabled={!selectedPerson} onChange={(e) => {setEmailM(e.target.value)}} />
                    </div>
                    <div>
                        <label>Téléphone</label>
                        <input placeholder='Saisir un numéro de téléphone' min={0} required type="number" value={telM} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"    disabled={!selectedPerson} onChange={(e) => {setTelM(e.target.value)}} />
                    </div>
                    <div>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    {loading && <div className="loading-spinner">Chargement...</div>}
                    </div>
                    <div className='form-button'>
                        <button onClick={handleResetM} disabled={!selectedPerson}>Vider les champs</button>
                        <button type='submit' disabled={!selectedPerson}>Modifier</button>
                    </div>
                   
                </fieldset>
            </form>
           }
            {val=='supp' && <form onSubmit={handleSubmitSupp}>
                <fieldset className='form-livre preview-container'> 
                    <legend><h1>Supprimer une personne</h1></legend>
                    <input type="text" list='persList' placeholder='Séléctionnez une personne à supprimer' style={{marginLeft: '11rem',width: '20rem'}}
                     onChange={(e) => {
                        const selectedOption = persList.find(
                          (pers) => `${pers.nom} ${pers.prenom} -- ${pers.email} -- ${pers.tel}` === e.target.value
                        );
                        setSelectedPersId(selectedOption ? selectedOption.id : null);
                    }}
                    />
                    <datalist id="persList">
                        {persList && persList.map((pers) => (
                            <option key={pers.id} data-id={pers.id} value={`${pers.nom} ${pers.prenom} -- ${pers.email} -- ${pers.tel}`} />
                        ))} 
                    </datalist>
                    <div className='form-button'>
                        <button onClick={handleReset}>Réinitialiser</button>
                        <button type="submit">Supprimer</button>
                    </div>
                </fieldset>
            </form>}
        </MainLayout>
    );
};

export default AjoutPersonne;
