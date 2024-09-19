import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import useAuth from '@/hooks/useAuth';
import logzz from '@/assets/images/logzz.png';
import { ApplicationLogo, Footer } from '@/components';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return !isAuthenticated ? (
    <>
      <Head>
        <title>Logzz | Giovani Appezzato</title>
        <meta property="og:title" content="Toolzz" key="title" />
      </Head>
      <div className="w-screen min-h-screen flex justify-center items-center">
        <div className="w-full h-max pt-3 sm:pt-16 sm:pb-6">
          <div className="flex justify-center mb-8">
            <ApplicationLogo src={logzz} className='w-48' />
          </div>
          <div className="flex flex-col items-center">
            {children}
            <Footer className='mt-6 !p-0' />
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default PublicLayout;
