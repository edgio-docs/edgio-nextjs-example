import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { prefetch } from '@layer0/prefetch/window'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { filterProducts, getOrigin } from '@/lib/helper'
import ProductPreview from '@/components/ProductPreview'

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
  const resp = await fetch(`${getOrigin(req)}/l0-api/categories/${params.name}`)
  if (!resp.ok) {
    return {
      notFound: true,
    }
  }
  let data = (await resp.json())['items']
  return {
    props: { data },
  }
}
