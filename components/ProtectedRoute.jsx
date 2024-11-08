import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Link from 'next/link';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return (
      <>
        <p
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#ff4081',
            textAlign: 'center',
            textShadow: '2px 2px 5px rgba(0,0,0,0.3)',
            marginTop:'6rem',
          }}
        >
          Vous devez être connecté pour accéder à cette page.
        </p>
        <Link href="/authentification"
            style={{
              marginTop:'2rem',

              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#6200ea',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '5px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            }}
          >
            Se connecter
          
        </Link>
      </>
    );
  }

  return <div>{children}</div>;
}
