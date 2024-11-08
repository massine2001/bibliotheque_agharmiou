import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { useRouter } from 'next/router';

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div>
      {children}
    </div>
  );
}
