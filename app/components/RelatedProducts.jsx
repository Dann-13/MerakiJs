import { useEffect, useState } from 'react';
import { client } from '@/app/lib/sanity';
import ProductCard from '@/app/components/ProductCard';
import { Progress } from '@/components/ui/progress';

export default function RelatedProducts({ category }) {
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `*[_type == "product" && category->name == "${category}"] {
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
        };

        fetchData();
    }, [category]);  // Agregamos "category" al array de dependencias

    if (isLoading) {
        return (
            <div className='w-full flex flex-col items-center justify-center gap-4'>
                <h1>Cargando Nuevos Productos</h1>
                <Progress className="w-[50%]" value={33} />
            </div>
        );
    }

    return (
        <div className="maylike-products-wrapper">
            <h2>Elige el que + te guste</h2>
            <div className="marquee">
                <div className="maylike-products-container track">
                    {productData.map((product) => (
                        <ProductCard key={product._id} data={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
