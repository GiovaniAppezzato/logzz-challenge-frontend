import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Transition } from '@headlessui/react';
import { FaChevronDown } from "react-icons/fa";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { Avatar, Card } from '@/components';
import useAuth from '@/hooks/useAuth';

export default function DropdownHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  function handleSignOut() {
    setIsOpen(false);
    signOut();
  }

  return (
    <div className="relative">
      <span className="inline-flex rounded-md">
        <button 
          className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md dark:hover:text-zinc-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='max-w-36 truncate hidden md:block'>{user?.name}</span>
          <FaChevronDown size={12} />
        </button>
      </span>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute origin-top-right right-0 top-10 z-50">
          <div className="min-w-[200px] shadow-lg">
            <Card>
              <Card.Body className="px-0 py-2 ring-1 ring-black ring-opacity-5 rounded-lg">
                <header className="px-4 py-2">
                  <h2 className='font-medium mb-1'>{t("components.dropdownHeader.title")}</h2>
                  <div className="text-xs max-w-36 truncate">
                    {user?.email} 
                  </div>
                </header>
                <Link href={`/profile`} className="relative overflow-hidden w-full flex items-center px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-white/5">
                  <MdPerson size={18} className="mr-2" />
                  {t("components.dropdownHeader.profile")}
                </Link>
                <button className="relative border-t overflow-hidden w-full flex items-center px-4 py-2 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-white/5" onClick={handleSignOut}>
                  <MdOutlinePowerSettingsNew size={18} className="mr-2" />
                  {t("components.dropdownHeader.logout")}
                </button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Transition>
    </div>
  );
}