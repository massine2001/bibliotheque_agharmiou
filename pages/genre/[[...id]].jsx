import React, { useEffect, useState, useContext } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { context } from '../../components/context';

const PageGenre = () => {
    const router = useRouter();
    const { id } = router.query;
    const { livre_genre, fetchLivre_genre } = useContext(context);
    const [width, setWidth] = useState(0);
    const [search, setSearch] = useState('');
    const [filteredLivre, setFilteredLivre] = useState([]);

    useEffect(() => {
        if (id) {
            fetchLivre_genre(id);
        }
    }, [id]);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        if (typeof window !== "undefined") {
            setWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        setFilteredLivre(livre_genre); // Initialiser le tableau filtré
    }, [livre_genre]);

    useEffect(() => {
        if (search.length > 0) {
            setFilteredLivre(livre_genre.filter((livre_) => {
                const titre = livre_.titre ? livre_.titre.toLowerCase() : '';
                const auteur = livre_.auteur ? livre_.auteur.toLowerCase() : '';
                const editeur = livre_.editeur ? livre_.editeur.toLowerCase() : '';
                const annee = livre_.annee_publication ? livre_.annee_publication.toString().toLowerCase() : '';
                const langue = livre_.langue ? livre_.langue.toLowerCase() : '';

                return titre.includes(search.toLowerCase()) ||
                       auteur.includes(search.toLowerCase()) ||
                       editeur.includes(search.toLowerCase()) ||
                       annee.includes(search.toLowerCase()) ||
                       langue.includes(search.toLowerCase());
            }));
        } else {
            setFilteredLivre(livre_genre);
        }
    }, [search, livre_genre]);

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
        } else if (tri === 'ancien') {
            setFilteredLivre([...filteredLivre].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
        } else if (tri === 'annee') {
            setFilteredLivre([...filteredLivre].sort((a, b) => a.annee_publication - b.annee_publication));
        }
    };

    if (!livre_genre) {
        return <p>Loading...</p>;
    }

    if (livre_genre.length === 0) {
        return (
            <MainLayout>
                <h2>Aucun livre trouvé :(</h2>
                <Link href='/ajoutLivre'><h3>En ajouter un !</h3></Link>
                <div className='form-button'>
                    <Link href='/'><button>Retour</button></Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <h4 style={{ marginLeft: 'auto', borderStyle: 'dotted',marginRight:'4px',borderRight:'none',borderLeft:'none'}}>Nombre de livre trouvé : {filteredLivre.length} </h4>
            <div className='searchConsul'>
                <input
                    name={"consultation"}
                    className='barre_consultation'
                    onChange={handleChange}
                    type="search"
                    placeholder='Chercher un livre par titre, auteur, éditeur, année de publication ou par langue !'
                    value={search}
                />
                <select className='selectConsul' name="tri" id="tri" onChange={handleTri}>
                    <option value="">Trier par</option>
                    <option value="titre">Trier par ordre alphabétique (Titre)</option>
                    <option value="auteur">Trier par ordre alphabétique (Auteur)</option>
                    <option value="recent">Trier par l'ajout le plus récent</option>
                    <option value="ancien">Trier par l'ajout le plus ancien</option>
                    <option value="annee">Trier par année de publication</option>
                </select>
            </div>
            <div className='livre-grid'>
                {filteredLivre.map((livre_) => (
                    <div key={livre_.id} className='livre' style={{ height: 'auto' }}>
                        <div className='livre_image'>
                            <img src={livre_.image} alt={livre_.titre} />
                        </div>
                        <div className='livre_info' style={{ gridTemplateColumns: '1fr' }}>
                            <h3>{livre_.titre}</h3>
                            {width < 800 && (
                                <>
                                    {livre_.auteur && <p className='mobile-auteur'>{livre_.auteur}</p>}
                                    {livre_.editeur && <p>Editeur : {livre_.editeur}</p>}
                                    {livre_.langue && <p>Langue : {livre_.langue}</p>}
                                    {livre_.annee_publication && <p>Année de publication : {livre_.annee_publication}</p>}
                                    <Link href={`/livre/${livre_.id}`}><p>Plus de détail</p></Link>
                                </>
                            )}
                            {width >= 800 && (
                                <>
                                    {livre_.auteur && <p className='desktop-auteur'>{livre_.auteur}</p>}
                                    <div className='desktop-livre-span'>
                                        {livre_.editeur && <span>{livre_.editeur}  | </span>}
                                        {livre_.langue && <span>{livre_.langue}  | </span>}
                                        {livre_.annee_publication && <span>{livre_.annee_publication}  | </span>}
                                        {livre_.nmbr_page && <span>{livre_.nmbr_page} pages</span>}
                                    </div>
                                    {livre_.resume && <p>{livre_.resume.length > 480 ? livre_.resume.substring(0, 480) + '......' : livre_.resume}</p>}
                                    <Link href={`/livre/${livre_.id}`}><p>Plus de détail</p></Link>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='form-button'>
                <Link href='/collection'><button>Retour</button></Link>
            </div>
        </MainLayout>
    );
};

export default PageGenre;
