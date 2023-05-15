import { FC, useState} from 'react';
import {Logo} from '../assets/images';
import Link from '../components/ui/Link';
import LanguageSelector from './ui/LanguageSelector';
import { Menu, X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

interface INavigation {
  name: string;
  label: string;
  href: string;
}

const navigation:INavigation[] = [
  { name: 'AboutMe',label:'About Me', href: '#aboutme' },
  { name: 'Experience', label:'Experience',href: '#experience' },
  { name: 'Projects',label:'Projects', href: '#projects' },
  { name: 'Skills',label:'Skills' ,href: '#skills' },
  { name: 'Books',label:'Books', href: '#books' }
]

const Navbar: FC = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const { t } = useTranslation()

  return(
    <div className="fixed top-0  h-[80px] w-full z-10">
      <nav className="flex flex-row items-center w-full h-full px-8 sm:px-16 lg:px-24">
        <div className="flex justify-center items-center py-4 w-full lg:w-1/5">
          <a 
            href="/#"
            className="w-full h-full">
            <img src={Logo} alt="logo" className="h-16 sm:h-16 w-auto" 
            /> 
          </a>
        </div>
        <ul className="hidden lg:flex flex-row justify-center items-center w-3/5">
          {navigation.map((item,index)=>(
            <a key={"Link_"+index} 
              href={item.href}
            >
              <li key={"Link_"+item.name} className="mx-4 text-md font-bold font-heading text-primary hover:text-secondary ease-in-out duration-300">{t(item.label)}</li>
            </a>
          ))}
        </ul>
        <div className="hidden lg:flex flex-row justify-center items-center w-1/5 gap-2">
          <div className="flex flex-row gap-2 justify-center items-center bg-transparent py-1 px-2 ">
            <LanguageSelector/>
          </div>
          <Link size="sm" className="px-[24px]" href="#contact">{t('Contact Me')}</Link>
        </div>
        <div className="flex lg:hidden w-auto gap-2">
          <div className="flex flex-row justify-center items-center bg-transparent py-1 px-1 sm:px-4">
            <LanguageSelector/>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center text-primary"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir Menu Principal</span>
            <Menu className="h-10 w-10" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">La Nonna Rose</span>
              <img
              className="h-16 w-auto"
                src={Logo}
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar Menu</span>
              <X className="h-10 w-10 text-primary" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-lg font-semibold leading-7 hover:bg-gray-50"
                  >
                    {t(item.label)}
                  </a>
                ))}
              </div>
            </div>
            <Link size="sm" className="px-[14px] my-10" href="#contact">{t('Contact Me')}</Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}

export default Navbar;
