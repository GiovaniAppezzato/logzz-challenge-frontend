import { useTranslation } from 'react-i18next';

export default function Footer({ className }: { className?: string }) {
  const { t } = useTranslation();

  return (
    <div className={`py-6 px-4 text-center space-y-4 md:px-6 ${className}`}>
      <p className="text-center text-xs">{t('components.footer.developedBy')} <a href="https://www.linkedin.com/in/giovani-appezzato/" target="_blank" className="text-primary font-medium hover:underline">Giovani Appezzato</a>.</p>
    </div>
  )
}
