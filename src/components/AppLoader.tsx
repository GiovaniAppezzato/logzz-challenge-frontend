import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useAuth from '@/hooks/useAuth';
import logzz from '@/assets/images/logzz.png';
import { Spinner } from '@/components';

export default function AppLoader({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const { i18n } = useTranslation();

  const { checkAuthentication } = useAuth();

  useEffect(() => {
    async function loadApplication() {
      try {
        await checkAuthentication();

        // Check if the current language is set.
        checkIfLanguageIsSet();
      } catch (error) {
        localStorage.removeItem('@logzz:accessToken');
      } finally {
        setLoaded(true);
      }
    } 

    loadApplication();
  }, []);

  function checkIfLanguageIsSet() {
    let language = localStorage.getItem('@logzz:language');

    if(!language) {
      localStorage.setItem('@logzz:language', 'pt');
      language = 'pt';
    }

    i18n.changeLanguage(language);
  }

  if(loaded) {
    return children;
  }

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <Image src={logzz} className='w-48' alt="Application Logo" />
      <Spinner className="h-7 w-7 text-gray-400 mt-4" />
    </div>
  );
}
