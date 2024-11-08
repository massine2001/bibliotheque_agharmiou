import React from 'react';
import MainLayout from '../layouts/MainLayout';
import { useState, useContext } from 'react';
import Link from 'next/link';
import { context } from '../components/context';
import ProtectedRoute from '../components/ProtectedRoute';


const Editer = () => {
   const [who, setWho] = useState('');
   const [blur, setBlur] = useState(false);
   const [edition, setEdition] = useState(false);
   const [valueEdited, setValueEdited] = useState('');
   const [valueToEdit, setValueToEdit] = useState('');
   const [valueEditedImage, setValueEditedImage] = useState('');
   const [nom, setNom] = useState([]);
   const [image, setImage] = useState('');
   const [noms, setNoms] = useState([]);
   const { insertCara, getNoms, insertGenre,updateCara,suppCara, getGenre, updateGenre,fetchGenre  } = useContext(context);
   
   function capitalizeWords(string) {
    string = String(string);
    return string
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    }
    const handleEdition = async (type) => {
      switch(type){
        case 'Ajouter un genre':
          setWho('Ajouter un genre');
          setBlur(true);
          break;
        case 'Ajouter un auteur':
          setWho('Ajouter un auteur');
          setBlur(true);
          break;
        case 'Ajouter un éditeur':
          setWho('Ajouter un éditeur');
          setBlur(true);
          break;
        case 'Ajouter un traducteur':
          setWho('Ajouter un traducteur');
          setBlur(true);
          break;
        case 'Editer un genre':
          const g = await getGenre();
          setNoms(g);
          setWho('Editer un genre');
          setBlur(true);
          break;
        case 'Editer un auteur':
          const n = await getNoms('auteur');
          setNoms(n);
          setWho('Editer un auteur');
          setBlur(true);
          break;
        case 'Editer un éditeur':
          const e = await getNoms('editeur');
          setNoms(e);
          setWho('Editer un éditeur');
          setBlur(true);
          break;
        case 'Editer un traducteur':
          const t = await getNoms('traducteur');
          setNoms(t);
          setWho('Editer un traducteur');
          setBlur(true);
          break;

         default:
          setWho('');
          setBlur(false);
      }
    }

    const handleSubmit = async (e, type) => {
     e.preventDefault();
     if (!nom) {
      alert('Le champ nom est requis');
      return;
    }
      switch(type){
        case 'Ajouter un auteur':
          await insertCara('auteur', capitalizeWords(nom));
          setNom('');
          setWho('');
          setBlur(false);
          break;
        case 'Ajouter un genre':
          await insertGenre(capitalizeWords(nom), image);
          setNom('');
          setWho('');
          setBlur(false);
          await fetchGenre();
          break;
        case 'Ajouter un éditeur':
          await insertCara('editeur', capitalizeWords(nom));
          setNom('');
          setWho('');
          setBlur(false);
          break;
        case 'Ajouter un traducteur':
          await insertCara('traducteur', capitalizeWords(nom));
          setNom('');
          setWho('');
          setBlur(false);
          break;
        
        default:
          setWho('');
          setBlur(false);
      }
    }

    const handleSubmitEdit = async (e, type) => {
      e.preventDefault();
      if (!valueEdited || !valueToEdit || valueToEdit.nom==='undefinded' ) {
        alert('Le champ nom est requis');
        return;
      }
      switch(type){
        case 'Editer un auteur':
          await updateCara('auteur',valueToEdit.id, capitalizeWords(valueEdited));
          setNom('');
          setWho('');
          setBlur(false);
          setEdition(false);
          setValueEdited('');
          setValueToEdit('');
          break;
        case 'Editer un éditeur':
          await updateCara('editeur',valueToEdit.id, capitalizeWords(valueEdited));
          setNom('');
          setWho('');
          setBlur(false);
          setEdition(false);
          setValueEdited('');
          setValueToEdit('');
          break;
        case 'Editer un traducteur':
          await updateCara('traducteur',valueToEdit.id, capitalizeWords(valueEdited));
          setNom('');
          setWho('');
          setBlur(false);
          setEdition(false);
          setValueEdited('');
          setValueToEdit('');
          break;
        case 'Editer un genre':
          await updateGenre(valueToEdit.id, capitalizeWords(valueEdited), valueEditedImage);
          setNom('');
          setWho('');
          setBlur(false);
          setEdition(false);
          setValueEdited('');
          setValueToEdit('');
          setValueEditedImage('');
          await fetchGenre();
          break;
        
        default:
          setWho('');
          setBlur(false);
      }
    }
    const fieldsetStyle = edition ? { height: '10.5rem' } : {};
    const fieldsetStyle2 = edition ? { height: '13.5rem' } : {};

    const handleSupprimer = async (type) => {
      if(valueToEdit.id){
        const userConfirm = window.confirm('Voulez-vous procéder à la suppression ?');
        if(userConfirm){
          switch(type){
            case 'Editer un auteur':
              await suppCara('auteur',valueToEdit.id);
              setNom('');
              setWho('');
              setBlur(false);
              setEdition(false);
              setValueEdited('');
              setValueToEdit('');
              break;
              
            case 'Editer un éditeur':
              await suppCara('editeur',valueToEdit.id);
              setNom('');
              setWho('');
              setBlur(false);
              setEdition(false);
              setValueEdited('');
              setValueToEdit('');
              break;
            case 'Editer un traducteur':
              await suppCara('traducteur',valueToEdit.id);
              setNom('');
              setWho('');
              setBlur(false);
              setEdition(false);
              setValueEdited('');
              setValueToEdit('');
              break;
            case 'Editer un genre':
              await suppCara('genre',valueToEdit.id);
              setNom('');
              setWho('');
              setBlur(false);
              setEdition(false);
              setValueEdited('');
              setValueToEdit('');
              setValueEditedImage('');
              break
            default:
              return;
          }
        }
        else{
            return;
        }
    }
}

const myHandle = () => {
  if((valueToEdit.nom === 'undefinded')){
    alert('Veuillez choisir un nom');
    return;
  }
  setEdition(true);
}
const myHandle2 = () => {
  if((valueToEdit.label === 'undefinded')){
    alert('Veuillez choisir un nom');
    return;
  }
  setEdition(true);
}
      
  

  return (
    <MainLayout>
   <div className={`container-grid ${blur ? 'blurEdit' : ''}`}>
    
          <div >
            <Link href={`/ajoutLivre`}> 
            <span>Ajouter un livre</span>
            </Link>
          </div>  
          <div >
            <Link href={`/ajoutPersonne`}> 
            <span>Ajouter / éditer une personne</span>
            </Link>
          </div>          
          <div >
            <span onClick={()=>{handleEdition('Ajouter un genre')}}>Ajouter un genre</span>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Ajouter un auteur')}}>Ajouter un auteur</span>
          </div>          
          <div >
            <span onClick={()=>{handleEdition('Ajouter un éditeur')}}>Ajouter un éditeur</span>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Ajouter un traducteur')}}>Ajouter un traducteur</span>
          </div>          
          <div >
            <Link href={`/searchLivre`}> 
            <span>Editer un livre</span>
            </Link>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Editer un genre')}}>Editer un genre</span>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Editer un auteur')}}>Editer un auteur</span>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Editer un éditeur')}}>Editer un éditeur</span>
          </div>
          <div >
            <span onClick={()=>{handleEdition('Editer un traducteur')}}>Editer un traducteur</span>
          </div>

          
      </div>
      {who && (who ==='Ajouter un auteur' || who ==='Ajouter un éditeur' || who ==='Ajouter un traducteur') && (
              <form className='formCara' onSubmit={(e) =>{ handleSubmit(e, who)}}>
                <fieldset className='fieldCara'>
                  <label htmlFor='nom' style={{textAlign:'center', color:'white'}}><h3>{who}</h3></label>
                  <input placeholder="Saisissez un nom" type='text' id='nom' name='nom' onChange={(e) =>{setNom((e.target.value).split(',').map((x) => x.trim()).filter((x) => x !== ''))}} />
                  <section className='formCarab'>
                    <button onClick={(e) => {e.preventDefault();setBlur(false);setWho('');setNom('')}}>Annuler</button>
                    <button type='submit'>Ajouter</button>
                  </section>
                </fieldset>
              </form>
            )
        }
        {who && who ==='Ajouter un genre' && (
              <form className='formCara' onSubmit={(e) =>{ handleSubmit(e, who)}}>
                <fieldset className='fieldCara2'>
                  <label htmlFor='nom' style={{textAlign:'center', color:'white'}}><h3>{who}</h3></label>
                  <input placeholder="Saisissez un nom" type='text' id='nom' name='nom' onChange={(e) =>{setNom((e.target.value))}} />
                  <input placeholder="Saisissez l'url d'une image" type='text' id='image' name='image' onChange={(e) =>{setImage((e.target.value))}} />
                  <section className='formCarab'>
                    <button onClick={(e) => {e.preventDefault();setBlur(false);setWho('');setNom('')}}>Annuler</button>
                    <button type='submit'>Ajouter</button>
                  </section>
                </fieldset>
              </form>
            )
        }
        {who && (who ==='Editer un auteur' || who ==='Editer un éditeur' || who ==='Editer un traducteur') && (
          
              <form className='formCara' onSubmit={(e) =>{ handleSubmitEdit(e, who)}}>
                <fieldset className='fieldCara' style={fieldsetStyle}>
                    <label style={{textAlign:'center', color:'white'}}><h3>{who}</h3></label>  
                  
                  {!edition && 
                  <select
                  onChange={(e) => {
                    const selectedOption = noms.find((a) => a.nom === e.target.value);
                    setValueToEdit(selectedOption);
                    setValueEdited(selectedOption.nom);
                  }}
                   className='selectEdit'>
                            <option value="Choisir un nom">Choisir un nom</option>
                            {noms.map((a) => (
                                <option key={a.id} value={a.nom}>
                                  {a.nom}
                                </option>
                            ))}                            
                  </select>}
                  
                  {
                    edition && (
                      <>
                      <span>Ancien nom : {valueToEdit.nom}</span>
                      <input placeholder="Saisissez un nom" type='text' value={valueEdited} onChange={(e) =>{setValueEdited((e.target.value))}} />
                      </>
                    )
                  }
                  <section className='formCarab'>
                    <button onClick={(e) => {e.preventDefault();setBlur(false);setWho('');setNom('');setValueToEdit('');setValueEdited('');setEdition(false)}}>Annuler</button>
                    {!edition && <button onClick={myHandle}>Editer</button>}
                    {edition && <button type='submit'>Modifier</button>}
                    {edition && <button onClick={()=>{handleSupprimer(who)}}>Supprimer</button>}
                  </section>
                </fieldset>
              </form>
            )
        }
        {who && (who ==='Editer un genre') && (
          
          <form className='formCara' onSubmit={(e) =>{ handleSubmitEdit(e, who)}}>
            <fieldset className='fieldCara' style={fieldsetStyle2}>
                <label style={{textAlign:'center', color:'white'}}><h3>{who}</h3></label>  
              
              {!edition && 
              <select
              onChange={(e) => {
                const selectedOption = noms.find((a) => a.label === e.target.value);
                setValueToEdit(selectedOption);
                setValueEdited(selectedOption.label);
                setValueEditedImage(selectedOption.image);
              }}
               className='selectEdit'>
                        <option value="Choisir un nom">Choisir un nom</option>
                        {noms.map((a) => (
                            <option key={a.id} value={a.label}>
                              {a.label}
                            </option>
                        ))}                            
              </select>}
              
              {
                edition && (
                  <>
                  <span>Ancien nom : {valueToEdit.label}</span>
                  <input placeholder="Saisissez un nom" type='text' value={valueEdited} onChange={(e) =>{setValueEdited((e.target.value))}} />
                  <input placeholder="Url de l/n'image" type='text' value={valueEditedImage} onChange={(e) =>{setValueEditedImage((e.target.value))}} />

                  </>
                )
              }
              <section className='formCarab'>
                <button onClick={(e) => {e.preventDefault();setBlur(false);setWho('');setNom('');setValueToEdit('');setValueEdited('');setValueEditedImage('');setEdition(false)}}>Annuler</button>
                {!edition && <button onClick={myHandle2}>Editer</button>}
                {edition && <button type='submit'>Modifier</button>}
                {edition && <button onClick={()=>{handleSupprimer(who)}}>Supprimer</button>}
              </section>
            </fieldset>
          </form>
        )
    }
    </MainLayout>
  );
};

export default Editer;
