import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import osrLogo from '/public/images/osr-logo-sm.png'

const NavBar: React.FC = () => {
  return (
    <nav className='bg-gray-800 text-white underline'>
      <div className='container mx-auto flex items-center justify-between py-2'>
        <div id='left'>
          <div className='w-fit rounded-full bg-white'>
            <Link href='/'>
              <Image
                src={osrLogo}
                alt='OSR logo'
                width={50}
                height={50}
                priority
                className='p-1'
              />
            </Link>
          </div>
        </div>
        <ul className='flex items-center'>
          <li>
            <Link className='bg-transparent' href='/knave/generate-character'>
              Knave
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
