import { Fragment, useState,useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import {PeruFlag,UsaFlag,ItalyFlag} from '../../assets/images';
import { useTranslation } from 'react-i18next';

interface lang {
  icon:any;
  label:string;
  code:string
}

export const languages:lang[] = [
  { icon:UsaFlag, label: 'EN', code: 'en' },
  { icon:PeruFlag, label: 'ES', code: 'es' },
  { icon:ItalyFlag, label: 'IT', code: 'it' }
]

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}

export default function LanguageSelector() {
  const { i18n} = useTranslation()
  const [selected, setSelected] = useState<lang|undefined>(languages[0])


  useEffect(()=>{
    setSelected(languages.find((lang)=>lang.code === i18n.language))
  },[i18n.language])

  useEffect(() => {
      i18n.changeLanguage(selected?.code || '')
  }, [selected])

  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-8 sm:pr-8 text-left text-primary shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <img src={selected?.icon} alt="" className="h-5 w-5 flex-shrink-0" />
                <span className="pr-10 sm:pr-4 ml-1 block">{selected?.label}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {languages.map((language) => (
                  <Listbox.Option
                    key={language.code}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-secondary text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={language}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <img src={language.icon} alt="" className="h-4 w-5 flex-shrink-0" />
                          <span
                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                          >
                            {language.label}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-secondary',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
