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
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    type="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-r-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={handleSearchClick}
                >
                    <CiSearch className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}