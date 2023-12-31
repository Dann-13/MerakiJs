import { FaFacebook, FaInstagram } from 'react-icons/fa'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className=" lg:grid lg:grid-cols-5">
            <div className="flex justify-center items-center pt-10 md:pt-0 md:px-5">
                <Image
                    src="/logo_transparente.png"
                    alt="logo"
                    className="inset-0 object-cover"
                    width={300}
                    height={300}
                />
            </div>

            <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <div>
                        <p>
                            <span className="text-xs uppercase tracking-wide text-gray-500">

                                ¡Llamanos!
                            </span>

                            <a
                                href="#"
                                className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl"
                            >
                                +57 3234938634
                            </a>
                        </p>

                        <ul className="mt-8 space-y-1 text-sm text-gray-700">
                            <li>Monday to Friday: 10am - 5pm</li>
                            <li>Weekend: 10am - 3pm</li>
                        </ul>

                        <ul className="mt-8 flex gap-6">
                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 text-2xl"
                                >
                                    <FaFacebook />
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/"
                                    rel="noreferrer"
                                    target="_blank"
                                    className="text-gray-700 transition hover:opacity-75 text-2xl"
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <p className="font-medium text-gray-900">Servicios</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Maquillaje
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Detalles
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="font-medium text-gray-900">Company</p>

                            <ul className="mt-6 space-y-4 text-sm">
                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Sobre Nosotros
                                    </a>
                                </li>

                                <li>
                                    <a href="#" className="text-gray-700 transition hover:opacity-75">
                                        Rol
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-100 pt-12">
                    <div className="flex justify-center items-center">
                        <p className="mt-8 text-xs text-gray-500 sm:mt-0">
                            &copy; 2023. Meraki Detalles. All rights reserved. - <a href="https://flashdev13.netlify.app/" target='_blank'>Creacion de paginas web FlashDev</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}