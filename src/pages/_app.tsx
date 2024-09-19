import "@/styles/app.css";
import 'react-toastify/dist/ReactToastify.css';
import 'moment/locale/pt';
import type { AppProps } from "next/app";
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "@/contexts/auth";
import AppLoader from "@/components/AppLoader";
import i18n from "@/locales/i18n";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <AppLoader>
          <Component {...pageProps} />
          <ToastContainer />
        </AppLoader>
      </AuthProvider>
    </I18nextProvider>
  );
}

export default MyApp;