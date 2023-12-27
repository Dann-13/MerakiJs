import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { useStateContext } from '../context/StateContext';
import { Button } from '@/components/ui/button';
import { urlFor } from '../lib/sanity';
export default function () {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity,
        onRemove } = useStateContext();

    cartItems.map((item) => (
        console.log(urlFor(item.images[0]).url())
    ));
    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className='cart-container'>
                <button type='button'
                    className='flex items-center text-[18px] font-medium cursor-pointer gap-2 ml-10px py-5 '
                    onClick={() => setShowCart(false)}>

                    <AiOutlineLeft />
                    <span className='heading'>Tu Carrito</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>
                {cartItems.length < 1 && (
                    <div className='flex flex-col justify-center items-center gap-5'>
                        <AiOutlineShopping size={150} />
                        <h3>Su carrito de compras esta vacio</h3>
                        <Link href='/'>
                            <Button
                                onClick={() => setShowCart(false)}
                            >
                                Continuar Compras
                            </Button>

                        </Link>
                    </div>
                )}

                <div className='flex flex-wrap justify-center md:justify-between'>

                    {cartItems.length >= 1 && cartItems.map((item, index) => (

                        <div className='flex pb-3 md:w-full md:px-7' key={index}>

                            <img className="w-[150px] h-[150px] rounded-xl"
                                src={urlFor(item.images[0]).url()} />
                            <div className='flex flex-col w-full'>
                                <div className='flex justify-between p-2'>
                                    <span className='text-[16px]'>{item.name}</span>
                                    <h5>${item.price}</h5>
                                </div>
                                <div className='flex items-center justify-between px-5'>
                                    <div className=''>
                                        <p className="flex gap-3">
                                            <span className="border flex items-center" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}><AiOutlineMinus /></span>
                                            <span className="rounded-full flex items-center">{item.quantity}</span>
                                            <span className="border flex items-center" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-red-500 text-2xl"
                                        onClick={() => onRemove(item)}
                                    >
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className="absolute bottom-12 w-full p-5 md:p-30 lg:p-30 xl:p-30">
                        <div className="flex justify-between">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="pt-4">
                            <Button className="w-full">
                                <Link href="https://wa.me/573167184276" className="btn">
                                    Cotizar
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}