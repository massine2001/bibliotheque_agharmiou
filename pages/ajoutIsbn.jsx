import MainLayout from '../layouts/MainLayout';
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { context } from '../components/context';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AjoutIsbn() {
    const { addLivre, genreToId, nmbreLivreGenre, genre, insertCara, existAuteur, existEditeur, existLivre } = useContext(context);

    const [genree, setGenre] = useState('');
    const [emplacement, setEmplacement] = useState('');
    const [genre_id, setGenreId] = useState('');
    const [isbn, setIsbn] = useState('');   
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [info, setInfo] = useState('');
    const [données, setDonnées] = useState(null);  // Change to null initially
    const [code, setCode] = useState('');  // Change to null initially

    // Fonction pour capitaliser les mots
    function capitalizeWords(string) {
        string = String(string);
        return string
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');       
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            const data = await response.json();
            if (data.totalItems === 0) {
                setError('Aucun livre trouvé avec cet ISBN.');
                return;
            }
            const book = data.items[0].volumeInfo;
            setDonnées(book);  // Stock the book data in the state
            try{
                const auteurExist = await existAuteur(book.authors[0]);
                if(auteurExist.length === 0) {
                    await insertCara('auteur', capitalizeWords(book.authors[0]));
                }
                const editeurExist = await existEditeur(book.publisher);
                if(editeurExist.length === 0) {
                    await insertCara('editeur', capitalizeWords(book.publisher));
                }
                const livreExist = await existLivre(capitalizeWords(book.title));
                if(livreExist === true) {
                    setError('Ce livre existe déjà dans la base de données.');

                    return;
                }
                const ajoutl = 
                await addLivre(
                    capitalizeWords(book.title), 
                    capitalizeWords(book.authors[0]),
                    capitalizeWords(book.publisher), 
                    capitalizeWords(book.language), 
                    0, 
                    0, 
                    book.description, 
                    book.publishedDate.slice(0,4), 
                    book.pageCount,
                    'Aucun', 
                    'neuf', 
                    book.imageLinks?.thumbnail || '', 
                    genree, 
                    'false', 
                    'Naima', 
                    genre_id,
                    code,
                    'Bibliothèque Tanqacht N Si Amr',
                    emplacement,
                );
                if(ajoutl === false) {
                    setError('Erreur lors de l\'ajout du livre.');
                    return;
                }
                else{
                    setSuccess('Le livre a été ajouté avec succès.');
                    setIsbn('');
                    setGenre('');
                    setGenreId('');
                }

            } catch (e) {
                setError('Erreur lors de l\'ajout du livre.', e);
                return;
            }
        } catch (err) {
            setError('Erreur lors de la récupération des données.');
            return;

        }
    };

    const handleGenre = async (genre) => {
        const id = await genreToId(genre);
        setGenreId(id[0].id);
        const nombre = (await nmbreLivreGenre(parseInt(id[0].id)));
        if(nombre === 0 || nombre ==='0'){
            if(genre==='Politique'){
                setCode(genre.slice(0,4)+'1');
                setInfo('Code du livre : '+genre.slice(0,4)+'1');
            }
            else{
                setCode(genre.slice(0,3)+'1');
                setInfo('Code du livre : '+genre.slice(0,3)+'1');
            }
        }
        else{
            const number = nombre +1;
             if(genre==='Politique'){
                setCode(genre.slice(0,4)+number);
                setInfo('Code du livre : '+genre.slice(0,4)+number);
            }
            else{
                setCode(genre.slice(0,3)+number);
                setInfo('Code du livre : '+genre.slice(0,3)+number);
            }
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess('');
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    useEffect(() => {
        if (données) {
            const timer = setTimeout(() => {
                setDonnées(null);
            }, 60000);
            return () => clearTimeout(timer);
        }
    }, [données]);

    return (
        <MainLayout>
            <div>
                <form onSubmit={handleSubmit}>
                    <fieldset className='form-fieldset'>
                        <legend className='form-legend'>Ajouter un livre par ISBN</legend>
                        <div className="form-group">
                            <label className="form-label">ISBN : </label>
                            <input required className="form-input" type="text" placeholder='Ex : 2723433358' name="isbn" value={isbn} onChange={(e) => { setIsbn(e.target.value); }} />
                        </div>
                        <div className='form-group-2'>
                            <label className='form-label'>Genre :</label>
                            <label className='form-label' htmlFor="emplacement">Emplacement :</label>
                            <select className='form-select' required value={genree} onChange={(e) => { setGenre(e.target.value); handleGenre(e.target.value); }}>
                                <option value="">Choisir un genre</option>
                                {genre.map((genre_) => (
                                    <option key={genre_.id} value={genre_.label}>{genre_.label}</option>
                                ))}
                            </select>
                            <input className="form-input" maxLength={6} placeholder='Ex : A - 9' type="text" id="emplacement" title='Ligne - Colonne' value={emplacement} onChange={handleEmplacement} />
                        </div>
                        {info && <div className="info-message">{info}</div>}
                        <div className="form-group">
                            <button className="form-buon" type="submit">Ajouter</button>
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        {success && <div className="success-message">{success}</div>}
                    </fieldset>
                    {données && (
                            <div style={{ 
                                border: '1px solid #ccc', 
                                padding: '15px', 
                                marginTop: '20px', 
                                borderRadius: '8px', 
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                width: '40%',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ color: '#333' }}>{données.title}</h3>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Auteur :</strong> {données.authors?.[0]}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Éditeur :</strong> {données.publisher}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Langue :</strong> {données.language}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Publié en :</strong> {données.publishedDate}
                                </p>
                                <p style={{ margin: '5px 0' }}>
                                    <strong>Nombre de pages :</strong> {données.pageCount}
                                </p>
                                {données.imageLinks?.thumbnail && (
                                    <img 
                                        src={données.imageLinks.thumbnail} 
                                        alt={`Couverture de ${données.title}`} 
                                        style={{ width: '150px', height: 'auto', marginTop: '10px' }} 
                                    />
                                )}
                                <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                                    <strong>Description:</strong> {données.description}
                                </p>
                            </div>
                        )}
                </form>
            </div>
        </MainLayout>
    );
}
