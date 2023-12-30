"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineShopping } from 'react-icons/ai';
import Image from 'next/image';
import Cart from './Cart';
import { useStateContext } from '../context/StateContext';
import SearchInput from './SearchInput';

const links = [
  { name: 'Maquillaje', href: '/maquillaje' },
  { name: 'Detalles', href: '/detalles' },
];

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const pathname = usePathname();

  return (
    <header className="p-2">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
            <Image
              src="/logo_transparente.png"
              alt="Logo"
              width={100}
              height={100}   
              className='flex justify-center items-center md:pt-0 md:px-5 cursor-pointer'
            />
          
        </Link>
        <SearchInput />
        <div className={`gap-3 md:!flex ${showCart ? 'md:flex' : 'md:hidden '}`}>
          <div className='flex items-center mb-2 sm:mb-0'>
            <button
              type='button'
              className='cart-icon relative'
              onClick={() => {
                setShowCart(true);
              }}
            >
              <AiOutlineShopping className="text-2xl" />
              {totalQuantities > 0 && (
                <span className="absolute font-bold text-sm text-white bg-primary w-5 rounded-full text-center top-6">
                  {totalQuantities}
                </span>
              )}
            </button>
          </div>
          {showCart && <Cart />}
        </div>
      </div>
      <div className="flex justify-center py-2">
        <nav className="flex gap-12 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link href={link.href}>
                <button
                  className={`${
                    pathname === link.href
                      ? 'text-sm md:text-lg font-semibold text-primary'
                      : 'text-sm md:text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary'
                  }`}
                >
                  {link.name}
                </button>
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
