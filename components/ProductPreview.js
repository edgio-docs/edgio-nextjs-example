import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { relativizeURL } from '@/lib/helper'
import { HeartIcon } from '@heroicons/react/outline'
import { createNextDataURL } from '@layer0/next/client'

const ProductPreview = ({ name, slug, images, prices }) => {
  return (
    <Link passHref href={`/product/${slug}`}>
      {/* 
        CreateNextDataURL generates the link to prefetch the data,
        e.g.: /_next/data/buildID/product/nextjs-enamel-mug?name=nextjs-enamel-mug 
      */}
      <Prefetch
        url={createNextDataURL({
          href: `/product/${slug}`,
          routeParams: {
            name: slug,
          },
        })}
      >
        <a className="relative mt-2 border border-white p-1">
          <div className="absolute top-0 left-0 z-10 flex flex-col items-start">
            <h3 className="border border-gray-200 bg-white py-1 px-2 text-xs font-medium text-black md:py-2 md:px-4 md:text-xl">{name}</h3>
            <h4 className="border border-gray-200 bg-white py-1 px-2 text-xs text-black md:py-2 md:px-4 md:text-lg">{`${prices.price.value}${prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
          <img className="h-full bg-white object-contain" loading="lazy" width={1200} height={1200} src={relativizeURL(images[0].url)} />
        </a>
      </Prefetch>
    </Link>
  )
}

export default ProductPreview
