import { useTranslation } from "react-i18next"

export default function Page404() {
  const { t } = useTranslation();

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-gray-800 mb-2">404</h1>
      <p className="text text-gray-600">{t("errors.404.title")}</p>
    </div>
  )
}
