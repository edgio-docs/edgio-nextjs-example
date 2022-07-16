import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Prefetch } from '@layer0/react'
import { prefetch } from '@layer0/prefetch/window'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { HeartIcon } from '@heroicons/react/outline'
import { createNextDataURL } from '@layer0/next/client'
import { filterProducts, relativizeURL } from '@/lib/helper'

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
            <h4 className="text-md bg-white py-2 px-4 text-black">{`$ ${prices.price.value} ${prices.price.currencyCode}`}</h4>
          </div>
          <HeartIcon className="absolute top-0 right-0 h-[30px] w-[30px] bg-white p-2" />
          <img loading="lazy" width={1200} height={1200} src={relativizeURL(images[0].url)} />
        </a>
      </Prefetch>
    </Link>
  )
}

const Search = ({ data }) => {
  const router = useRouter()

  // Prefetch the API call on PDP as soon as the page mounts
  useEffect(() => {
    prefetch('/l0-api/products/all')
  }, [])

  return (
    <div className="flex-col items-center justify-start">
      <div className="mb-5 flex w-full flex-row items-start px-5">
        <div className="hidden w-[15%] pt-5 md:block">
          <LeftSidebar />
        </div>
        <div className="flex w-full flex-col items-start pt-5 md:w-[70%]">
          <h2 className="text-[#FFFFFF75]">Showing {data.length} Results</h2>
          <div className="mt-5 flex flex-row flex-wrap items-start">
            {filterProducts(data, router.query.filter).map((i) => (
              <ProductPreview key={i.price.value} {...i} />
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

export async function getServerSideProps({ req, params }) {
  let origin
  let hostURL = req.headers['host']
  if (hostURL) {
    hostURL = hostURL.replace('http://', '')
    hostURL = hostURL.replace('https://', '')
    if (hostURL.includes('localhost:')) {
      origin = `http://${hostURL}`
    } else {
      origin = `https://${hostURL}`
    }
  }
  const resp = await fetch(`${origin}/l0-api/products/all`)
  if (!resp.ok) {
    return {
      notFound: true,
    }
  }
  let data = await resp.json()
  if (params.name === 'jackets') {
    data = data.filter((i) => i.name.toLowerCase().includes('jacket'))
  } else if (params.name === 't-shirts') {
    data = data.filter((i) => i.name.toLowerCase().includes('t-shirt'))
  } else if (params.name === 'joggers') {
    data = data.filter((i) => i.name.toLowerCase().includes('jogger'))
  }
  return {
    props: { data },
  }
}
