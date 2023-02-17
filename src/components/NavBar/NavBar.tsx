'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import osrLogo from '/public/images/osr-logo-sm.png'

interface INavBarProps {
  pages: Array<{ name: string; href: string; }>
}

const NavBar: React.FC<INavBarProps> = ({ pages }) => {
  return (
    <Disclosure as='nav' className='bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  <OsrLogo />
                </div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {pages.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={` text-white rounded-md px-3 py-2 text-sm font-medium`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pt-2 pb-3'>
              {pages.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={` text-white block rounded-mx px-3 py-2 text-base font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

const OsrLogo = () => (
  <Link href='/' className='w-fit rounded-full bg-white' data-testid='home-link'>
    <Image
      src={osrLogo}
      height={40}
      width={40}
      alt='OSR logo'
      className='p-1'
    />
  </Link>
)

export default NavBar
