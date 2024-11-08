import '../styles/globals.css'; // Garder les styles locaux spécifiques à l'application
import { AppProvider } from '../components/context';
import { AuthProvider } from '../components/AuthContext';
import Head from 'next/head';
import Menu from '../components/Menu';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>B.C Agharmiou</title>
        <meta name="google-site-verification" content="x0_406M3hQuADqOvmeyu8Len8V0X2A8rTkJpnaburbg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Découvrez B.C Agharmiou, la solution ultime pour gérer votre bibliothèque avec style et efficacité." />
        <meta property="og:title" content="B.C Agharmiou" />
        <meta property="og:description" content="Votre source pour la gestion moderne des livres." />
        <meta property="og:image" content="/luffy.png" />
        <meta property="og:url" content="https://bca-lovat.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" type="image/png" sizes="32x32" href="/library.png" />
      </Head>
      <AuthProvider>
        <AppProvider>
          <Component {...pageProps} />
          <Menu />
        </AppProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
