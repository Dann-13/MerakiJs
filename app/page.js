import Carousel from './components/Carousel'
import Image from 'next/image'
import NewProducts from './components/NewProducts'

export default function Home() {
  return (
    <div className='bg-white pb-6 sm:pb-8 lg:pb-12'>
      <Carousel />
      <NewProducts />
    </div>

  )
}
