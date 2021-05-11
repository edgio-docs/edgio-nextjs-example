import Link from 'next/link'
import { Prefetch } from '@layer0/react'
import { getCategory } from '../../lib/cms'
import Rating from '../../components/Rating'

export default function ProductListingPage({ products }) {
  return (
    <div className="container center">
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => {
          const prefetchProps = {}

          if (process.browser) {
            // prefetch URL needs to include the `name` param otherwise it will be a browser miss
            prefetchProps.url = `/_next/data/${__NEXT_DATA__.buildId}${product.href}.json?name=${
              product.href.split('/').reverse()[0]
            }`
          }

          return (
            <div key={product.id}>
              <Link href={product.href} passHref>
                <Prefetch {...prefetchProps}>
                  <a>
                    <div className="relative">
                      <div
                        className="pb-2/3 bg-contain bg-center bg-no-repeat h-48"
                        style={{ backgroundImage: `url(${product.picture})` }}
                      ></div>
                      <div className="w-full text-left lowercase font-bold">{product.name}</div>
                      <div className="w-full text-left">
                        <Rating value={product.rating} />
                      </div>
                      <div className="w-full text-left">${product.price}</div>
                    </div>
                  </a>
                </Prefetch>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const { products } = await getCategory(params.name)

  return {
    props: { products },
  }
}
