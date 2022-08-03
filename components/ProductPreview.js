import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { relativizeURL } from '@/lib/helper'
import { HeartIcon } from '@heroicons/react/outline'
import { createNextDataURL } from '@layer0/next/client'

const ProductPreview = ({ name, path, images, prices }) => {
  const nonSlashPath = path.replace(/\//g, '')
  return (
    <Link passHref href={`/product/${nonSlashPath}`}>
      {/* CreateNextDataURL generates the link to prefetch the data,
        e.g.: /_next/data/buildID/product/nextjs-enamel-mug?name=nextjs-enamel-mug */}
      <Prefetch
        url={createNextDataURL({
          href: `/product/${nonSlashPath}`,
          routeParams: {
            name: nonSlashPath,
          },
        })}
      >
        <a className="relative mt-2 w-full border border-white p-1 sm:w-1/2 md:w-1/3">
          <div className="absolute top-0 left-0 z-10 flex flex-col items-start">
            <h3 className="bg-white py-2 px-4 text-xl font-medium text-black">{name}</h3>
            <h4 className="text-md bg-white py-2 px-4 text-black">{`${prices.price.value}${prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
          <img className="h-[300px] object-cover" loading="lazy" width={1200} height={1200} src={relativizeURL(images[0].url)} />
        </a>
      </Prefetch>
    </Link>
  )
}

export default ProductPreview
