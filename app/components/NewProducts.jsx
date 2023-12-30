"use client"
import React, { useEffect, useState } from 'react'
import { client } from '../lib/sanity';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress'
import ProductCard from './ProductCard';

function NewProducts() {
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
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
                console.log(error)
            }
        }
        fetchData();
    }, []);
    if (isLoading) {
        return (
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <h1>Cargando Nuevos Productos</h1>
                <Progress className="w-[50%]" value={33} />
            </div>
        );
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Nuevos Productos
                    </h2>

                    <Link className="text-primary flex items-center gap-x-1" href="/all">
                        ver mas{" "}
                        <span>
                            <ArrowRight />
                        </span>
                    </Link>
                </div>

                <div className="w-3/4 mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mx-auto items-center md:w-full">
                    {productData.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NewProducts
