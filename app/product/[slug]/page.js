"use client"
import { client } from '@/app/lib/sanity';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import ImageGallery from '../../components/ImageGallery'
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useStateContext } from '@/app/context/StateContext';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import ProductCard from '@/app/components/ProductCard';
import RelatedProducts from '@/app/components/RelatedProducts';
import Image from 'next/image';
export default function PageProduct() {
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
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
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [params.slug]);
    if (isLoading) {
        return (

            <div>
                <div className="relative flex justify-center items-center py-28">
                    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-custom-pinkFuerte"></div>
                    <Image src="/avatar.png" className="rounded-full" width={30} height={30} alt='avatar' />
                </div>

            </div>
        );
    }
    

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-2">
                    <ImageGallery images={productData.images} />

                    <div className="md:py-8">
                        <div className="mb-2 md:mb-3">
                            <span className="mb-0.5 inline-block text-gray-500">
                                {productData.categoryName}
                            </span>
                            <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                                {productData.name}
                            </h2>
                        </div>

                        {/* <div className="mb-6 flex items-center gap-3 md:mb-10">
                            <Button className="rounded-full gap-x-2">
                                <span className="text-sm">4.2</span>
                                <Star className="h-5 w-5" />
                            </Button>

                            <span className="text-sm text-gray-500 transition duration-100">
                                56 Ratings
                            </span>
                        </div> */}

                        <div className="mb-4">
                            <div className="flex items-end gap-2">
                                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                                    ${productData.price}
                                </span>
                            </div>

                            <span className="text-sm text-gray-500">
                                Incl. Vat plus shipping
                            </span>
                        </div>

                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="flex gap-5 items-center p-3">
                                <span className="hover:bg-slate-400 border-2 rounded-lg p-2" onClick={decQty}>
                                    <AiOutlineMinus className='text-black hover:text-white' />
                                </span>
                                <span className="num">{qty}</span>
                                <span className="hover:bg-custom-pink border-2 rounded-lg p-2" onClick={incQty}><AiOutlinePlus /></span>
                            </p>
                        </div>

                        <div className="mb-6 flex items-center gap-2 text-gray-500">
                            {/* <Truck className="w-6 h-6" /> */}
                            <span className="text-sm">2-4 Day Shipping</span>
                        </div>
                        <div className="flex gap-2.5">
                            <Button
                                onClick={() => onAdd(productData, qty)}>Añadir</Button>
                        </div>
                        <p className="mt-12 text-base text-gray-500 tracking-wide">
                            {productData.description}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <RelatedProducts category={productData.categoryName} />
            </div>
        </div>
    )
}