import React from 'react';
import { useAuth } from '../components/AuthContext';
import { supabase } from './supabase';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const handleCo = async () => {
    window.location.href = '/authentification';
  };
  const { user, loading } = useAuth();
  return (
    <header>
      <nav>
        <span className='bca' style={{position:'absolute',left:'38%'}}>Bibliothèque Centrale Agharmiou</span>
        {user &&  <button className='deconnexion' style={{position:'absolute',right:'0.5rem'}} onClick={handleLogout}>
            Se déconnecter
          </button>}
        {!user && !loading &&<button className='connexion' style={{position:'absolute',right:'0.5rem'}} onClick={handleCo}>Se connecter</button>}
      </nav>
    </header>
  );
};

export default Header;
