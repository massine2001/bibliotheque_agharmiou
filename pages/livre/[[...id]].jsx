import React, { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import { context } from '../../components/context';
import { useContext, useState } from 'react';

const PageGenre = () => {
    const router = useRouter();
    const { id } = router.query;
    const { livre_singulier, fetchLivre_singulier } = useContext(context);
    const [width, setWidth] = useState(0);
    const [synonyms, setSynonyms] = useState([]);

    function capitalizeWords(string) {
        string = String(string);
        return string
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        }

    useEffect(() => {
        if (id) {
            fetchLivre_singulier(id);
        }
    }, [id]);
    const syn = async (mot) => {
        try {
            const response = await fetch(`https://api.datamuse.com/words?rel_syn=${mot}&max=2`);
            const data = await response.json();
            const synonymsList = data.map(item => item.word);
            const synonymsString = synonymsList.join(', ');

            setSynonyms(synonymsString); // Mettre à jour l'état avec les synonymes
        } catch (error) {
            return;
        }
    };
    
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        if (typeof window !== "undefined") {
            // Initial width
            setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    if (!livre_singulier) {
        return <p>Loading...</p>;
    }

    if (livre_singulier.length === 0) {
        return <p>No book found.</p>;
    }
    if(livre_singulier[0].genre){
        syn(livre_singulier[0].genre);
    }

    const handleEnvoi = () => {
        router.push(`/edition/${id}`);
    }

    return (
        <MainLayout>
            {width < 800 && (
                <>
                    <div >
                        {livre_singulier.map((livre_) => (
                               
                                <div key={livre_.id} className='boite'>
                                    <h3>{livre_.titre}</h3>
                                    {livre_.auteur && <p className='mobile-auteur-singulier'> par {livre_.auteur}</p>}
                                    
                                    <div className='sub_livre_info_singulier'>
                                     
                                            <ul>
                                            {livre_.auteur && <li><span> Auteur : {livre_.auteur}  </span></li>}
                                            {livre_.editeur && <li><span> Editeur : {livre_.editeur} </span></li>}
                                            {livre_.genre && <li><span> Genre : {livre_.genre} </span></li>}
                                            {livre_.annee_publication && <li><span> Année de publication : {livre_.annee_publication} </span></li>}
                                            {livre_.langue && <li><span> Langue : {livre_.langue} </span></li>}
                                            {livre_.traducteur && <li><span> Traducteur : {livre_.traducteur} </span></li>}
                                            {livre_.nmbr_page && <li><span> Nombre de pages : {livre_.nmbr_page} </span></li>}
                                            {livre_.prix && <li><span> Prix du livre : {livre_.prix} € </span></li>}
                                            {livre_.etat && <li><span> Etat du livre : {livre_.etat} </span></li>}
                                            <li><span> Prêté à quelqu'un : {livre_.louer ? 'Oui' : 'Non'} </span></li>
                                            {livre_.exemplaire && <li><span> Nombre d'exemplaires : {livre_.exemplaire} </span></li>}
                                            {livre_.acheteur && <li><span> Ramené par : {livre_.acheteur} </span></li>}
                                            {livre_.bibliotheque && <li><span> Situé à : {livre_.bibliotheque} </span></li>}
                                            {livre_.emplacement && <li><span> Emplacement : {livre_.emplacement} </span></li>}
                                            {livre_.code && <li><span> Code de l'ouvrage : {livre_.code} </span></li>}
                                            {livre_.created_at && <li><span> Ajouté dans le site le : {Date(livre_.created_at).slice(0,16)} </span></li>}
                                            </ul>
                                            
                                    </div>
                                    <h3>Description du livre :</h3>
                                    {livre_.resume && <p>{livre_.resume}</p>}

                                </div>
                            
                        ))}
                    </div>
                </>
           
            )}
            {width >= 800 && (
                <>
                    <div>
                    {livre_singulier.map((livre_) => (
                        <div key={livre_.id} className='livre_singulierNew'>
                        <span title="Modifier l'ouvrage" className='pingle' onClick={handleEnvoi}>✒️</span>
                        <div className='livre_imageNew'>
                            <img src={livre_.image} alt={livre_.titre} />
                            <h3>{livre_.titre}</h3>
                            {livre_.resume && <p className='livre_resume'>{livre_.resume}</p>}

                        </div>
                        <div style={{backgroundColor:'gray', width:'100%', height:'1px'}}></div>
                        <div className='livre_infoNew'>
                            <fieldset style={{width:'80%', display:'flex',justifyContent:'space-between'}}>
                                <div>
                                    {livre_.auteur ? <li title={livre_.auteur} style={{listStyleType:'circle', textWrap:'nowrap',overflow:'hidden'}}><span>Auteur :</span><b> {livre_.auteur.length>30 ? (livre_.auteur).slice(0,30)+'...' : livre_.auteur}</b></li> : <li style={{gap:'1rem',listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Auteur :</span> Inconnu</li>}
                                    {livre_.editeur ? <li title={livre_.editeur} style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Editeur :</span> <b>{livre_.editeur.length >30 ? (livre_.editeur).slice(0,30)+'...' : livre_.editeur}</b></li> : <li style={{gap:'1rem',listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Editeur :</span> Inconnu</li>}

                                </div>
                                <div>
                                    {livre_.genre ? <li  style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Genre :</span><b> {livre_.genre}</b></li> : <li><span>Genre :</span> Inconnu</li>}
                                    {livre_.langue ? <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Langue :</span><b> {livre_.langue} </b></li> : <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Langue :</span> Inconnu</li>}
                                </div>
                                <div>
                                    {livre_.annee_publication ? <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Année de publication :</span> <b>{livre_.annee_publication}</b></li> : <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span>Année de publication :</span> Inconnu</li>}
                                    {livre_.code ? <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span> Code de l'ouvrage :<b> {livre_.code}</b> </span></li> : <li style={{listStyleType:'circle',textWrap:'nowrap',overflow:'hidden'}}><span> Code de l'ouvrage : Inconnu </span></li>}
                                </div>                      
                            </fieldset>
                            </div>
                        <div className='livre_infoNew'>
                            <ul>
                                {livre_.created_at ? <li ><span> Ajouté dans le site le : {Date(livre_.created_at).slice(0,16)} </span></li> : <li><span> Ajouté dans le site le : Inconnu </span></li>}
                                {livre_.bibliotheque ? <li><span> Situé à : <b>{livre_.bibliotheque}</b> </span></li> : <li><span> Situé à : Inconnu </span></li>}
                                {livre_.emplacement ?  <li><span> Emplacement : <b>{livre_.emplacement}</b> </span></li> : <li><span> Emplacement : Non défini </span></li>}
                                {livre_.acheteur ? <li><span>Ramené par :</span> <b>{livre_.acheteur}</b></li> : <li><span>Ramené par :</span> Inconnu</li>}
                            </ul>
                            <ul>
                                {livre_.prix ? <li><span>Prix du livre :</span><b> {livre_.prix}</b> €</li> : <li><span>Prix du livre :</span> Inconnu</li>}
                                {livre_.traducteur ? <li><span>Traducteur :</span> {livre_.traducteur}</li> : <li><span>Traducteur :</span> Inconnu</li>}
                                {livre_.nmbr_page ? <li><span>Nombre de pages :</span> <b> {livre_.nmbr_page}</b></li> : <li><span>Nombre de pages :</span> Inconnu</li>}
                                {livre_.exemplaire ? <li><span>Nombre d'exemplaires :</span> <b>{livre_.exemplaire}</b></li> : <li><span>Nombre d'exemplaires :</span> Inconnu</li>}
                            </ul>
                            <ul>                          
                                {livre_.etat ? <li><span>Etat du livre :</span> <b>{(livre_.etat)}</b></li> : <li><span>Etat du livre :</span><b> Neuf</b></li>}
                                <li><span>Prêté à quelqu'un :</span> <b>{livre_.louer ? 'Oui' : 'Non'}</b></li>
                                <li><span>Format papier :<b> Oui</b></span></li>
                                <li><span>Mots-clés : <b> {synonyms ? capitalizeWords(synonyms) : '/'}</b></span></li>
                            </ul>
                        </div>
                        
                        </div>
                    ))}
                    </div>

                </>
            )}
        </MainLayout>
    );
};

export default PageGenre;
