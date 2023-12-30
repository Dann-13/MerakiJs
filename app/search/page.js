"use client"
import { client } from '../lib/sanity';
import { Progress } from '@radix-ui/react-progress';
import ProductCard from '../components/ProductCard';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';


export default function SearchPage() {
    // Estado para almacenar la consulta de búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            const escapedSearchQuery = searchQuery.replace(/["\\]/g, '\\$&');
            const query = `*[_type == "product" && name match "${escapedSearchQuery}"] {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;
            const data = await client.fetch(query);
            setProductData(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    }, [searchQuery]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('q');
        setSearchQuery(queryParam || '');
    }, []);

    useEffect(() => {
        if (searchQuery) {
            console.log(`La búsqueda actualizada es: ${searchQuery}`);
            fetchData();
        }
    }, [searchQuery, fetchData]);
    if (isLoading) {
        return (
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <h1>Cargando Productos</h1>
                <Progress className="w-[50%]" value={33} />
            </div>
        );
    }

    return (
        <div className='p-5'>
            <div className={`${productData.length === 0 ? '!grid' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '}`}>
                {productData.length > 0 ? (
                    productData.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))
                ) : (
                    <div className='flex flex-col justify-center w-full'>
                        <div className="relative flex justify-center items-center">
                            <Image src="/avatar.png " width={100}
                                height={100} alt="No se encontraron productos" className="rounded-full" />
                        </div>
                        <p className='text-center'> No se encontraron productos para &quot;{searchQuery}&quot;</p>
                    </div>
                )}
            </div>
        </div>
    );
}
