import Link from 'next/link'
import { HeartIcon, ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/outline'

const Navbar = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-between py-3 px-5">
      <div className="order-2 flex flex-row items-center space-x-4 py-1 md:order-1">
        <Link href="/commerce">
          <a className="text-gray-500">Shop All</a>
        </Link>
        <a target="_blank" href="https://github.com/layer0-docs/layer0-nextjs-example" className="text-gray-500">GitHub</a>
      </div>
      <Link className="order-1 md:order-2" href="/">
        <a>
          <img src="https://docs.layer0.co/logo.png" className="h-[25px] w-auto" loading="lazy" />
        </a>
      </Link>
      <div className="order-3 hidden flex-row items-center space-x-4 py-1 md:flex">
        <ShoppingBagIcon className="h-[30px] w-[30px] cursor-pointer text-gray-500" />
        <HeartIcon className="h-[30px] w-[30px] cursor-pointer text-gray-500" />
        <UserCircleIcon className="h-[30px] w-[30px] cursor-pointer text-blue-500" />
      </div>
    </div>
  )
}

export default Navbar
