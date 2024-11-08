import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Menu = () => {
    const [menu, setMenu] = useState(false);
    const router = useRouter();
    const handleRoute = (e) => {
        switch(e.target.textContent){
            case 'Accueil':
                setMenu(false)
                router.push('/');
                break;
            case 'Editer un Ouvrage':
                setMenu(false)
                router.push('/searchLivre');
                break;
            case 'Edition':
                setMenu(false)
                router.push('/editer');
                break;
            case 'Prêt / Restitution':
                setMenu(false)
                router.push('/pret');
                break;
            case 'A propos':
                setMenu(false)
                router.push('/about');
                break;
        }
    };
  return (
    <>
    <span title='Menu' className='menuAb'  onClick={(e)=>setMenu(true)}>
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-around', 
        width: '3.2rem', 
        height: '2.2rem',
        cursor: 'pointer',
        alignItems:'center',

        }}>
        <span style={{ 
            height: '3px', // Épaisseur de la barre
            width: '80%', // Prend toute la largeur du parent
            backgroundColor: '#7c2121', // Couleur de la barre
            borderRadius: '5px' 
        }}></span>
        <span style={{ 
            height: '3px',
            width: '80%',
            backgroundColor: '#7c2121',
            borderRadius: '5px'
        }}></span>
        <span style={{ 
            height: '3px',
            width: '80%',
            backgroundColor: '#7c2121',
            borderRadius: '5px'
        }}></span>
        </div>

    </span>
    {menu &&
    <>
     <div className='blurMenu'>

     </div>
     <div className='menuHeader'>
        <span className='menutetx'>Menu</span>
      <button onClick={(e)=>handleRoute(e)}>Accueil</button>
      <button onClick={(e)=>handleRoute(e)}>Editer un Ouvrage</button>
      <button onClick={(e)=>handleRoute(e)}>Edition</button>
      <button onClick={(e)=>handleRoute(e)}>Prêt / Restitution</button>
      <button onClick={(e)=>handleRoute(e)}>A propos</button>
      <button onClick={(e)=>setMenu(false)}>⩹ Fermer ⩹</button>
    </div>
    </>}
    </>
  );
};

export default Menu;
