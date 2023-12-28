"use client"
import { CiSearch } from "react-icons/ci";
import React, { useEffect, useState } from 'react';

export default function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        // Construye la URL de búsqueda con el valor actual del input
        const searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;

        // Redirige a la nueva página
        window.location.href = searchUrl;
    };
    return (
        <div>
            <div className="relative">
                <input
                    className="w-full py-2 px-4 border border-custom-pink2 rounded-md shadow-sm focus:outline-none focus:ring-2"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-custom-pinkFuerte bg-custom-pink border border-custom-pinkFuerte rounded-r-md focus:outline-none focus:ring-2 hover:bg-custom-pinkFuerte hover:text-custom-pink"
                    onClick={handleSearchClick}
                >
                    <CiSearch className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}