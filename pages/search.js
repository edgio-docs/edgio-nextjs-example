import Link from 'next/link'
import NextImage from 'next/image'
import { Prefetch } from '@layer0/react'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { HeartIcon } from '@heroicons/react/outline'
import { createNextDataURL } from '@layer0/next/client'
import { shimmer, toBase64 } from '@/components/shimmer'

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
        <a className="relative mt-2 w-full border border-white bg-gray-100 p-1 sm:w-1/2 md:w-1/3">
          <div className="absolute top-0 left-0 z-10 flex flex-col items-start">
            <h3 className="rounded bg-white py-2 px-4 text-xl font-medium text-black">{name}</h3>
            <h4 className="text-md rounded bg-white py-2 px-4 text-black">{`$ ${prices.price.value} ${prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
          <NextImage
            width={1200}
            height={1200}
            quality={100}
            placeholder="blur"
            src={images[0].url}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1400, 720))}`}
          />
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

export async function getServerSideProps() {
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
