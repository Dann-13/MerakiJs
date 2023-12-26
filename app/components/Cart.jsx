import React, { useRef } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import { useStateContext } from '../context/StateContext';
import { Button } from '@/components/ui/button';
export default function () {
    const cartRef = useRef();
    const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuanitity,
        onRemove } = useStateContext();

    return (
        <div className="cart-wrapper" ref={cartRef}>
            <div className='cart-container'>
                <button type='button'
                    className='flex items-center text-[18px] font-medium cursor-pointer gap-2 ml-10px '
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

                <div className='product-container'>

                    {cartItems.length >= 1 && cartItems.map((item) => (

                        <div className='product' key={item.id}>

{/*                             <img src={urlFor(item?.image[0])} className="cart-product-image" />
 */}                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h5>${item.price}</h5>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className="quantity-desc">
                                            <span className="minus" onClick={() => toggleCartItemQuanitity(item._id, 'dec')}><AiOutlineMinus /></span>
                                            <span className="num">{item.quantity}</span>
                                            <span className="plus" onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                                        </p>

                                    </div>
                                    <button
                                        type="button"
                                        className="remove-item"
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
                    <div className="cart-bottom">
                        <div className="total">
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className="btn-container">
                            <Link href="https://wa.me/573167184276" className="btn">
                                Cotizar
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}