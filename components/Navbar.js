import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-between py-3 px-5">
      <Link href="/">
        <a>
          <img src="/logo/white.svg" className="h-[25px] w-[60.2px] bg-white/5" />
        </a>
      </Link>
      <div className="flex flex-row items-center space-x-4 py-1">
        <Link href="/about">
          <a className="text-[#FFFFFF75]">About</a>
        </Link>
        <Link href="/commerce">
          <a className="text-[#FFFFFF75]">Commerce</a>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
