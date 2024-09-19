import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import useAuth from '@/hooks/useAuth';
import { Header, Footer } from '@/components';

interface IProps {
  children: ReactNode;
  title?: string;
  withoutFooter?: boolean;
}

const PrivateLayout = ({ children, title, withoutFooter = false }: IProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? (
    <>
      <Head>
        <title>Logzz | Giovani Appezzato</title>
        <meta property="og:title" content="Toolzz | Giovani Appezzato" key="title" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header title={title} />
        <main className="flex flex-col flex-grow">
          <div className="flex-grow pt-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
          {!withoutFooter && <Footer />}
        </main>
      </div>
    </>
  ) : null;
};

export default PrivateLayout;
