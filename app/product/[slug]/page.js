"use client"
import { client } from '@/app/lib/sanity';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
export default function PageProduct() {
    const [isLoading, setIsLoading] = useState(true);
    const [productData, setProductData] = useState([]);
    const params = useParams();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `*[_type == "product" && slug.current == "${params.slug}"][0]{
                    _id,
                      images,
                      price,
                      name,
                      description,
                      "slug": slug.current,
                      "categoryName": category -> name
                  }`;
                const data = await client.fetch(query);
                setProductData(data);
                setIsLoading(false);
                console.log(data)
            } catch (error) {

            }
        }
        fetchData();
    }, []);
    if (isLoading) {
        return (
            <div>
                <h1>Cargando Carrousel...</h1>
            </div>
        );
    }
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    {/* <ImageGallery images={data.images} /> */}

                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500">
                                {productData.categoryName}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                {productData.name}
                            </h2>
                        </div>

                        <div className="mb-6 flex items-center gap-3 md:mb-10">
                            {/* <Button className="rounded-full gap-x-2">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5" />
                            </Button> */}

                            <span className="text-sm text-gray-500 transition duration-100">
                                56 Ratings
                            </span>
                        </div>

                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                    ${productData.price}
                                </span>
                                <span className="mb-0.5 text-red-500 line-through">
                                    ${productData.price + 30}
                                </span>
                            </div>

                            <span className="text-sm text-gray-500">
                                Incl. Vat plus shipping
                            </span>
                        </div>

                        <div className="mb-6 flex items-center gap-2 text-gray-500">
                            {/* <Truck className="w-6 h-6" /> */}
                            <span className="text-sm">2-4 Day Shipping</span>
                        </div>
                        <p className="mt-12 text-base text-gray-500 tracking-wide">
                            {productData.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}