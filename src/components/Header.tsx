import { Fragment, useState } from "react"
import Link from "next/link"
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ApplicationLogo, DropdownHeader } from "@/components";
import brSvg from "@/assets/images/flags/br.svg"
import usSvg from "@/assets/images/flags/us.svg"

export default function Header({ title }: { title?: string }) {
  const [language] = useState(localStorage.getItem('@logzz:language'));

  function handleChangeLanguage() {
    const newLanguage = language === 'en' ? 'pt' : 'en';
    localStorage.setItem('@logzz:language', newLanguage);
    window.location.reload();
  }

  return (
    <Fragment>
      <nav className="bg-navbar border-b border-gray-100 dark:border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="shrink-0 flex items-center">
              <Link href="/">
                <ApplicationLogo className="block h-7 w-auto fill-current text-gray-800" />
              </Link>
            </div>

            <div className="flex items-center gap-1 ms-6">
              <button className="p-2 flex items-center rounded-full foxu hover:bg-gray-100 focus:outline-none dark:hover:bg-white/5" onClick={handleChangeLanguage}>
                <img className="w-6 h-6 rounded-md" src={language === 'en' ? usSvg.src : brSvg.src} alt="flag" />
              </button>
              <DropdownHeader />
            </div>
          </div>
        </div>
      </nav>
      {title && (
        <header className="bg-navbar shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h2 className="font-medium text-lg leading-tight">{title}</h2>
          </div>
        </header>
      )}
    </Fragment>
  )
}
