"use client"
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { client, urlFor } from '../lib/sanity';
import { ArrowLeft, ArrowRight } from 'lucide-react';
export default function Carousel() {
    const [isLoading, setIsLoading] = useState(true);
    const [carouselData, setCarouselData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = '*[_type == "carousel"].images';
                const data = await client.fetch(query);

                // Manipula los datos según tus necesidades
                setCarouselData(data[0]);
                setIsLoading(false);
                // Aquí puedes realizar operaciones adicionales si es necesario
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);
    // La dependencia [] significa que se ejecutará solo una vez al montar el componente

    const urlImage = carouselData.map((element, index) => {
        return urlFor(element).url(); // Utiliza 'element' en lugar de 'carouselData[index]'
    });
    const slider = useRef(null);

    const goToPrev = () => {
        if (slider.current) {
            slider.current.slickPrev();
        }
    };

    const goToNext = () => {
        if (slider.current) {
            slider.current.slickNext();
        }
    };


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    if (isLoading) { // ⬅️ si está cargando, mostramos un texto que lo indique
        return (
            <div>
                <h1>Cargando Carrousel...</h1>
            </div>
        );
    }
    return (

        <div className='w-full h-auto'>
            < div id="default-carousel" className="relative">
                <Slider ref={slider} {...settings}>
                    {urlImage.map((imageUrl, index) => (
                        <div className="overflow-hidden relative h-56 sm:h-64 xl:h-[400px]" key={index}>
                            <img src={imageUrl}
                                alt={`Imagen ${index + 1}`}
                                className="block absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    ))}
                </Slider>

                <button type="button" onClick={goToPrev}
                    className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                >

                    <ArrowLeft />
                </button>
                <button type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    onClick={goToNext}>

                    <ArrowRight />
                </button>
            </div>


        </div>
    );
}
