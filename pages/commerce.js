import { useRouter } from 'next/router'
import Sidebar from '@/components/Sidebar'
import ProductPreview from '@/components/ProductPreview'
import { filterProducts, getOrigin } from '@/lib/helper'

const Search = ({ data }) => {
  const router = useRouter()

  return (
    <div className="flex-col items-center justify-start">
      <div className="flex w-full flex-row items-start px-5">
        <div className="flex min-w-[200px] flex-col pt-5">
          <Sidebar />
        </div>
        <div className="flex flex-col items-start pt-5">
          <h2 className="text-[#FFFFFF75]">Showing {data.length} Results</h2>
          <div className="sm:grid-cols-2 mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filterProducts(data, router.query.filter).map((i) => (
              <ProductPreview key={i.path} {...i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search

export async function getServerSideProps({ req, query }) {
  const resp = await fetch(`${getOrigin(req)}/l0-api/${query.name ? `categories/${query.name}` : 'products/all'}`)
  if (!resp.ok) {
    return {
      notFound: true,
    }
  }
  let data = await resp.json()
  if (query.name) {
    data = data['items']
  }
  return {
    props: { data },
  }
}
