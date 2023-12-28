"use client"
import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { Progress } from '@radix-ui/react-progress';
import Link from 'next/link';
import Image from 'next/image';

export default function SearchPage() {
    // Estado para almacenar la consulta de búsqueda
    const [searchQuery, setSearchQuery] = useState('');
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('q');

        // Actualiza el estado con la consulta de búsqueda
        setSearchQuery(queryParam || ''); // Si queryParam es nulo, establece una cadena vacía
    }, []); // Se ejecuta solo una vez al montar el componente

    useEffect(() => {
        // Realiza acciones adicionales después de actualizar el estado
        if (searchQuery) {
            console.log(`La búsqueda actualizada es: ${searchQuery}`);
            // Puedes invocar funciones que dependan de searchQuery
            // Ejemplo: actualizarResultados(searchQuery);
        }
    }, [searchQuery]); // Se ejecuta cuando searchQuery cambia

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `*[_type == "product" && name match "${searchQuery}"] {
                _id,
                price,
                name,
                "slug": slug.current,
                "categoryName": category->name,
                "imageUrl": images[0].asset->url
              }
            `;
                const data = await client.fetch(query);
                setProductData(data);
                setIsLoading(false);
                console.log(query);
            } catch (error) {
                console.log(error);
            }
        };

        // Agrega searchQuery como dependencia para que este efecto se vuelva a ejecutar cuando searchQuery cambie
        fetchData();
    }, [searchQuery]);

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
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {productData.length > 0 ? (
                    productData.map((product) => (
                        <div key={product._id} className="group relative">
                            <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                <Image
                                    src={product.imageUrl}
                                    alt="Product image"
                                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                    width={300}
                                    height={300}
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={`/product/${product.slug}`}>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.categoryName}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No se encontraron productos.{searchQuery}</div>
                )}

            </div>
        </div>

    )
}