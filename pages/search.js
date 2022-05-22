import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { useEffect, useState } from 'react'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { HeartIcon } from '@heroicons/react/outline'
import { createNextDataURL } from '@layer0/next/client'

const ProductPreview = ({ name, path, images, prices }) => {
  const finalImage = `https://opt.moovweb.net/?quality=1&img=${images[0].url}`
  const nonSlashPath = path.replace(/\//g, '')
  const [productImage, setProductImage] = useState('/images/grey.png')
  // In case JS is available, use the image loaded from the API response after the placeholders have been called
  useEffect(() => {
    let imagesList = window.imagesViewed
    // If the visited object doesn't exist, create it
    if (!imagesList) {
      window.imagesViewed = {}
      imagesList = window.imagesViewed
    }
    if (Object.keys(imagesList).length > 0 && imagesList[finalImage]) {
      setProductImage(finalImage)
    } else {
      setTimeout(() => {
        setProductImage(finalImage)
        window.imagesViewed[finalImage] = true
      }, 300)
    }
  }, [])
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
        <a className="relative mt-2 w-full border border-white bg-gray-100 p-1 sm:w-1/2 md:w-1/3">
          <div className="absolute top-0 left-0 flex flex-col items-start">
            <h3 className="rounded bg-white py-2 px-4 text-xl font-medium text-black">{name}</h3>
            <h4 className="text-md rounded bg-white py-2 px-4 text-black">{`$ ${prices.price.value} ${prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
          {/* In case JS is available, load the image by lazy hydration */}
          <img 
            src={productImage} 
            onError={({ currentTarget }) => {
              // Code Ref: https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
              currentTarget.onerror = null // prevents looping
              currentTarget.src = '/images/grey.png'
            }} 
            className="w-100% h-auto" 
          />
          {/* In case JS is not available load the image as is */}
          <noscript>
            <img
                src="/images/grey.png"
                onError={({ currentTarget }) => {
                  // Code Ref: https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = '/images/grey.png'
                }}
                srcSet={finalImage}
                className="w-100% h-auto"
              />
          </noscript>
        </a>
      </Prefetch>
    </Link>
  )
}

const Search = ({ searchAllData }) => {
  return (
    <div className="flex-col items-center justify-start">
      <div className="mb-5 flex w-full w-full flex-row items-start px-5">
        <div className="hidden w-[15%] pt-5 md:block">
          <LeftSidebar />
        </div>
        <div className="flex w-full flex-col items-start pt-5 md:w-[70%]">
          <h2>Showing {searchAllData.length} Results</h2>
          <div className="mt-5 flex flex-row flex-wrap items-start">
            {searchAllData.map((i) => (
              <ProductPreview key={i.path} {...i} />
            ))}
          </div>
        </div>
        <div className="hidden w-[15%] pt-5 md:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}

export default Search

export async function getStaticProps() {
  const fetchCall = await fetch('https://layer0-docs-layer0-ecommmerce-api-example-default.layer0-limelight.link/products/all')
  if (!fetchCall.ok) {
    return {
      notFound: true,
    }
  }
  const searchAllData = await fetchCall.json()
  return {
    props: { searchAllData },
  }
}
