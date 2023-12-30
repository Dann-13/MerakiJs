import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanity';
import { Progress } from '@radix-ui/react-progress';
import ProductCard from '../components/ProductCard';

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

            // Llama a fetchData solo si searchQuery tiene un valor
            fetchData();
        }
    }, [searchQuery]); // Se ejecuta cuando searchQuery cambia

    const fetchData = async () => {
        try {
            // Escapa las comillas en la expresión regular de la búsqueda
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
    };

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
                            <img src="/avatar.png" className="rounded-full h-28 w-28" />
                        </div>
                        <p className='text-center'> No se encontraron productos para "{searchQuery}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
