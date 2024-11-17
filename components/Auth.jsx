import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import PublicRoute from './PublicRoute';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data) {
        setUser(data.user);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error, user } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password }) 
        : await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
      } else {
        isLogin ? console.log('Connexion réussie !') : alert('Inscription réussie, vérifie ton email !');
        setEmail('');
        setPassword('');
        setUser(user);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <PublicRoute>
    <div className="auth-container">
      <div className="auth-form">
        <h1>{isLogin ? 'Connexion' : 'Inscription'}</h1>
        <form onSubmit={handleAuth}>
          <input 
            type="email" 
            name='email'
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            type="password" 
            name='password'
            placeholder="Mot de passe" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
          </button>
          {error && <p>{error}</p>}
        </form>

        <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Créer un compte" : "J'ai déjà un compte"}
        </button>
      </div>
    </div>
    </PublicRoute>
      );
}
