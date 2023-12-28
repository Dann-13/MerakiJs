"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/StateContext";
import React, { useEffect, useState } from 'react';
import SearchInput from "./SearchInput";

const links = [
  { name: "Maquillaje", href: "/maquillaje" },
  { name: "Detalles", href: "/detalles" },
];

export default function Navbar() {
  
  const pathname = usePathname();
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <header className="p-2">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <div className="flex justify-center items-center md:pt-0 md:px-5">
            <img
              src="/logo_transparente.png"
              alt=""
              className="inset-0 w-[75px] md:w-[75px] object-cover"
            />
          </div>
        </Link>
        <SearchInput />
        <div className={`gap-3 md:!flex ${showCart ? 'md:flex' : 'md:hidden '}`}>
          <div className='flex items-center mb-2 sm:mb-0'>
            <button
              type='button'
              className='cart-icon'
              onClick={() => {
                setShowCart(true);
              }}
            >
              <AiOutlineShopping className="text-2xl" />
              <span className="absolute font-bold text-sm text-white bg-primary w-5 rounded-full text-center top-6">{totalQuantities}</span>
            </button>
          </div>
          {showCart && <Cart />}
        </div>
      </div>
      <div className="flex justify-center py-2">
        <nav className="flex gap-12 2xl:ml-16">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <Link
                  className="text-sm md:text-lg font-semibold text-primary"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ) : (
                <Link
                  href={link.href}
                  className="text-sm md:text-lg font-semibold text-gray-600 transition duration-100 hover:text-primary"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

      </div>
    </header>
  );
}