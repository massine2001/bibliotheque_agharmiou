import React, { useContext, useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import { context } from '../components/context';
import Link from 'next/link';
import { supabase } from '../components/supabase';

const SearchLivre = () => {
    const { genre, genreToId, fetchSpecifiqueLivre, deleteLivre } = useContext(context);

    const [livre, setLivre] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [titre, setTitre] = useState('');
    const [auteur, setAuteur] = useState('');
    const [editeur, setEditeur] = useState('');
    const [langue, setLangue] = useState('');
    const [annee_publication, setAnneePublication] = useState('');
    const [genree, setGenre] = useState('');

    const [width, setWidth] = useState(0);
    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    const resetForm = () => {
        setTitre('');
        setAuteur('');
        setEditeur('');
        setLangue('');
        setAnneePublication('');
        setGenre('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const l = await fetchSpecifiqueLivre(titre, auteur, editeur, langue, annee_publication, genree);
            setLivre(l);
          
        } catch (err) {
            return;
        } 
    };

    useEffect(() => {
        const getUser = async () => {
          const { data, error } = await supabase.auth.getUser();
          if (data) {
            setUser(data.user);
          }
          setLoading(false);
        };
    
        getUser();
    
        // Écoute les changements de session
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user || null);
          setLoading(false);
        });
    
        return () => {
          // Désabonne l'écouteur d'événements
          authListener?.subscription?.unsubscribe();
        };
      }, []);
    
    const handleSupp = async (id) =>{
        if(id){
            if(user){
                const userConfirm = window.confirm('Voulez-vous vraiment supprimer ce livre ?');
                if(userConfirm){
                    await deleteLivre(id);
                    setLivre(livre.filter((livre_) => livre_.id !== id));
                }
                else{
                    return;
                }
            }
            else{
                alert('Vous devez être connecté pour supprimer un livre');
            }
           
        }
    }
    return (
        <MainLayout>
            <form onSubmit={handleSubmit}>
                <fieldset  className='form-livre preview-container'>
                    <legend><h1>Chercher un livre</h1></legend>
                    <div>
                        <label>Titre</label>
                        <input  type="text" value={titre} onChange={(e) => setTitre(e.target.value)} />
                    </div>
                    <div>
                        <label>Auteur</label>
                        <input  type="text" value={auteur} onChange={(e) => setAuteur(e.target.value)} />
                    </div>
                    <div>
                        <label>Editeur</label>
                        <input  type="text" value={editeur} onChange={(e) => setEditeur(e.target.value)} />
                    </div>
                    <div>
                        <label>Langue</label>
                        <input  type="text" value={langue} onChange={(e) => setLangue(e.target.value)} />
                    </div>                   
                    <div>
                        <label>Année de publication</label>
                        <input min={0}  type="number" value={annee_publication} onChange={(e) => setAnneePublication(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Genre</label>
                        
                        <select  value={genree} onChange={(e) => setGenre(e.target.value)}>
                            <option value="">Choisir un genre</option>
                            {genre.map((genre_) => (
                                <option key={genre_.id} value={genre_.label}>{genre_.label}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className='form-button'>
                        <button onClick={resetForm}>Annuler</button>
                        <button type="submit">Chercher🔍</button>
                    </div>
                </fieldset>
                {livre.length>0 && (
                    <>
                        <div style={{ borderTop: "1px solid gray ",width:'80vw',margin:'1rem' }}></div>
                        {width >= 900 && 
                            (
                                <div className='searchSuper'>
                                <div className='labelSearch'>
                                    <span className='lblsrch'><b>Titre</b></span>
                                    <span className='lblsrch'><b>Auteur</b></span>
                                    <span className='lblsrch'><b>Editeur</b></span>
                                    <span className='lblsrch'><b>Publication</b></span>
                                </div>
                                {livre.map((livre_) => (
                                    <div key={livre_.id} >
                                        <fieldset>
                                            <div className='searchContainer'>
                                                <span className='searchItem' style={{color: 'black'}} title={livre_.titre}><b>{livre_.titre}</b></span>
                                                <span className='searchItem' style={{color: 'gray'}} title={livre_.auteur}>{livre_.auteur}</span>
                                                <span className='searchItem' style={{color: 'gray'}} title={livre_.editeur}>{livre_.editeur}</span>
                                                <span className='searchItem' style={{color: 'gray'}}>{livre_.annee_publication}</span>
                                                <div className=' divSearchBtn'>
                                                    <Link href={`/edition/${livre_.id}`}><button className='searchBtnMod'>Modifier</button></Link>
                                                    <button onClick={() => handleSupp(livre_.id)} className='searchBtnSup'>Supprimer</button>
                                                </div>
                                            </div>
                                        </fieldset>


                                    </div>
                                ))}
                            </div>
                            )
                        }

                        {width < 900 &&
                            (
                            <div className='superSet'>
                                {livre.map((livre_) => (
                                        <fieldset key={livre_.id} className='fieldsetMobileSearch'>
                                                <span style={{textAlign:'center'}}  title={livre_.titre}><b>{livre_.titre}</b></span>
                                                <span  style={{color: 'gray'}} title={livre_.auteur}> Auteur :{livre_.auteur}</span>
                                                <span  style={{color: 'gray'}} title={livre_.editeur}> Editeur :{livre_.editeur}</span>
                                                <span  style={{color: 'gray'}}> Langue :{livre_.langue}</span>
                                                <span  style={{color: 'gray'}}> Année de publication :{livre_.annee_publication}</span>
                                                <div className=' divSearchBtn'>
                                                    <Link href={`/edition/${livre_.id}`}><button className='searchBtnMod'>Modifier</button></Link>
                                                    <button onClick={() => handleSupp(livre_.id)} className='searchBtnSup'>Supprimer</button>
                                                </div>
                                        </fieldset>
                                ))}
                            </div>
                            )
                        }
                    </>
                    )}
            </form>
        </MainLayout>
    );
};

export default SearchLivre;
